# JUC并发编程

## 1 线程知识

### 1.1 start() 线程开启底层

> 源码分析

```java
public synchronized void start() {
   
    if (threadStatus != 0)
        throw new IllegalThreadStateException();

    group.add(this);

    boolean started = false;
    try {
        start0();	// 调用了start0方法 这个方法在下面展示
        started = true;
    } finally {
        try {
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
            
        }
    }
}

// native关键字表示这是一个本地方法
// 底层是jvm中分配了一个线程
private native void start0();
```

### 1.2 基础概念

#### 1.2.1 JUC是什么

JUC是`java.util.concurrent`包的简称，在Java5.0添加，目的就是为了更好的支持高并发任务。让开发者进行多线程编程时减少竞争条件和死锁的问题

#### 1.2.2 java默认有几个线程

两个 main线程 gc线程

java会调用本地方法`private native void start0()`来开启线程，java无法直接操作硬件

#### 1.2.3 并发与并行的区别

- 并发：多线程操作同一个资源，交替执行（CPU一核, 模拟出来多条线程，就像一般的嵌入式操作系统）
- 并行：多个线程同时进行（CPU多核,多个线程同时进行 ; 使用线程池操作）

#### 1.2.4 线程的6个状态

```java
public enum State {
       // 新生
        NEW,
        // 运行
        RUNNABLE,
        // 阻塞
        BLOCKED,
        // 等待
        WAITING,
        //超时等待
        TIMED_WAITING,
        //终止
        TERMINATED;
    }

```

#### 1.2.5 wait和sleep方法的区别

1. wait是Object类的方法，sleep是Thread类的方法
2. wait会释放锁，sleep不会释放锁
3. wait必须在同步代码块中使用，sleep可以在任何地方使用

#### 1.2.6 守护线程

> 用户线程

系统工作线程

> 守护线程

1. 一种特殊的线程，为其他线程服务比如**GC垃圾回收线程**
2. 守护线程作为一个服务线程，当用户线程全部结束了，java虚拟机会自动退出
3. `isDaemon()`方法可以判断该线程是否为守护线程
4. `setDaemon(true)`方法可以将某个线程设置为守护线程

## 2 CompletableFuture

### 2.1 Future接口

> Future接口功能

定义了异步任务执行的一些方法

- 获取异步任务执行的结果
- 取消任务的执行
- 判断任务是否被取消
- 判断任务是否执行完毕

### 2.3 FutureTask类

#### 2.3.1 FutureTask类的继承实现关系

![image-20230526102154164](./JUC并发编程.assets/image-20230526102154164.png) 

#### 2.3.2 FutureTask使用例子

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class CallableDemo {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        FutureTask<Integer> futureTask = new FutureTask<>(new MyThread());
        new Thread(futureTask, "a").start();
        System.out.println(futureTask.get());
    }
}

class MyThread implements Callable<Integer> {

    @Override
    public Integer call() throws Exception {
        System.out.println("call()方法被调用了");
        return 10;
    }
}
```

#### 2.3.3 get方法

> get方法会引起阻塞，可以设置超时时间

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

public class FutureAPIDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {

        FutureTask<String> futureTask = new FutureTask<String>( () -> {
            System.out.println(Thread.currentThread().getName() + "\t ----start");
            // 暂停
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return Thread.currentThread().getName() + "\t ----end";
        });

        new Thread(futureTask, "t1").start();
        System.out.println(futureTask.get());   // get方法会引起阻塞
        System.out.println(Thread.currentThread().getName() + "\t ----执行其他任务");
    }
}
```

#### 2.3.4 isDone轮询方法

轮询的方式会耗费无谓的CPU资源，而且也不见得能及时地得到计算机资源

如果想要异步获取结果，通常都会以轮询地方式去获取结果尽量不要阻塞

### 2.4 CompletableFuture优化Future

> **Future接口的缺点**

Future接口对于结果的获取不是很友好，只能通过阻塞或轮询的方式得到任务的结果

>**CompletableFuture的优化方法**

Future中get()方法会阻塞，isDone()方法容易耗费CPU资源

对于真正的异步处理我们希望可以通过传入回调函数，在Future结束时自动调用该函数，这样，我们就不用等待结果。

CompletableFuture提供了一种观察者模式类似的机制，可以让任务执行完成后通知监听的一方

> **CompletableFuture使用场景**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fb5ce9a8da7473ba23903a17c8beeae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 

### 2.5 CompletableFuture源码分析

#### 2.5.1 CompletableFuture介绍

> **CompletableFuture继承实现关系**

![image-20230526173657051](./JUC并发编程.assets/image-20230526173657051.png) 

- **常用方法**

  #### supplyAsync方法（有返回值）

  ```swift
  //使用默认内置线程池ForkJoinPool.commonPool()，根据supplier构建执行任务
  public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier)
  //自定义线程，根据supplier构建执行任务
  public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor)
  ```

  #### runAsync方法

  ```java
  //使用默认内置线程池ForkJoinPool.commonPool()，根据runnable构建执行任务
  public static CompletableFuture<Void> runAsync(Runnable runnable) 
  //自定义线程，根据runnable构建执行任务
  public static CompletableFuture<Void> runAsync(Runnable runnable,  Executor executor)
  ```

  上面两个方法如果不指定线程池，则默认使用**ForkJoinPool.commonPool**
  
  > **1.获取结果和触发计算**
  
  #### get方法
  
  阻塞获取结果
  
  ```java
  public T get()
  ```
  
  #### getNow方法
  
  立马获取结果，可以设置默认值，即没有得到真正结果返回的替代值
  
  ```java
  public T getNow(T valueIfAbsent)
  ```
  
  #### complete方法
  
  如果阶段没有运行完，则打断运行过程把value值作为阶段的结果
  
  ```java
  public boolean complete(T value)
  ```
  
  > **2.对计算结果进行处理(有返回值)**
  
  #### thenApply方法（串行化）
  
  计算结果作为输入参数传给下一个阶段
  
  ```java
  public <U> CompletableFuture<U> thenApply(
          Function<? super T,? extends U> fn)
  ```
  
  #### handle方法（串行化）
  
  与`thenApply()`区别，有异常也可以继续执行，根据异常参数进一步处理
  
  ```java
  public <U> CompletableFuture<U> handle(
          BiFunction<? super T, Throwable, ? extends U> fn)
  ```
  
  > **3.对计算结果进行消费(无返回值)**
  
  #### thenAccept方法
  
  消费前一个阶段的计算结果
  
  ```java
  public CompletableFuture<Void> thenAccept(Consumer<? super T> action)
  ```
  
  > **4.执行下一阶段(无参数无返回值)**
  
  #### thenRun方法
  
  ```java
  public CompletableFuture<Void> thenRun(Runnable action)
  ```
  
  > **5.异步方法**
  
  #### thenRunAsync方法
  
  如果不传入自定义线程池，所有阶段都用默认线程池；如果传入自定义线程池，则第一阶段用自定义线程池，之后的then异步阶段传入默认线程池ForkJoinPool（PS：有可能因为系统优化切换原则，使用main线程处理）
  
  ```java
  // 查看源码可以看到 传入了一个异步线程池
  public CompletableFuture<Void> thenRunAsync(Runnable action) {
          return uniRunStage(asyncPool, action);
  }
  // asyncPool的源码
  private static final Executor asyncPool = useCommonPool ?
          ForkJoinPool.commonPool() : new ThreadPerTaskExecutor();
  ```
  
  

#### 2.5.2 CompletionStage分析

> **CompletionStage接口源码**

```java
//依赖单个阶段
public <U> CompletionStage<U> thenApply(Function<? super T,? extends U> fn);     // 默认执行方式
public <U> CompletionStage<U> thenApplyAsync(Function<? super T,? extends U> fn);// 默认的异步执行方式
public <U> CompletionStage<U> thenApplyAsync(Function<? super T,? extends U> fn,Executor executor); //自定义的执行方式

//依赖两个阶段都完成
public <U,V> CompletionStage<V> thenCombine(CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn);
public <U,V> CompletionStage<V> thenCombineAsync(CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn);
public <U,V> CompletionStage<V> thenCombineAsync(CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn, Executor executor);

//依赖两个阶段中的任何一个完成
public <U> CompletionStage<U> applyToEither(CompletionStage<? extends T> other,Function<? super T, U> fn);
public <U> CompletionStage<U> applyToEitherAsync(CompletionStage<? extends T> other,Function<? super T, U> fn);
public <U> CompletionStage<U> applyToEitherAsync(CompletionStage<? extends T> other,Function<? super T, U> fn,Executor executor);
```

> **CompletionStage接口源码demo**

```java
package ymkedu.auc;

import org.junit.jupiter.api.Test;

import java.util.concurrent.*;

public class CompletableFutureDemo {

    // 前一个阶段执行完才能执行下一个阶段
    @Test
    public void thenApply() throws ExecutionException, InterruptedException {
        CompletableFuture<String> stage = CompletableFuture.supplyAsync(() -> "hello")
                .thenApply(s -> s + " world");

        String result = stage.get();
        System.out.println(result);
    }

    // 两个阶段都完成才能输出结果
    @Test
    public void thenCombine() {
        String result = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "hello";
        }).thenCombine(CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "world";
        }), (s1, s2) -> s1 + " " + s2).join();
        System.out.println(result);
    }

    // 两个阶段谁先完成就输出结果
    @Test
    public void applyToEither() {
        String result = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "Tom";
        }).applyToEither(CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "John";
        }), s -> "hello " + s).join();
        System.out.println(result);
    }
}
```

> **thenCombine作业**

```java
@Test
    public void thenCombine() {
        String result = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "hello";
        }).thenCombine(CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "world";
        }), (s1, s2) -> s1 + " " + s2).thenCombine((CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "then combine";
        })), (a, b) -> a + b).join();
        System.out.println(result);
    }
```



#### 2.5.3 CompletableFuture使用例子

```java
import java.util.concurrent.*;

public class CompletableFutureUse {

    public static void main(String[] args) {

        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        try {
            CompletableFuture.supplyAsync(() -> {
                System.out.println(Thread.currentThread().getName() + "----start");
                int res = ThreadLocalRandom.current().nextInt();
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return res;
            }, threadPool).whenComplete((v, e) -> {
                if (e == null) {
                    System.out.println("----计算完成 结果为 -> " + v);
                }
            }).exceptionally((e) -> {
                System.out.println("----异常 -> " + e.getMessage());
                return null;
            });
        } finally {
            // 自定义的线程池 记得要关闭
            threadPool.shutdown();
        }

        System.out.println("----main线程");

    }
}
```

### 2.6 函数式编程

#### 2.6.1 函数式接口

> **Runnable接口(无参数无返回值)**

```java
@FunctionalInterface
public interface Runnable {

    public abstract void run();
}
```

>**Function<T, R>**

```java
@FunctionalInterface
public interface Function<T, R> {

    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}

```

>**Consumer\<T\>**

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}

```

>**Supplier**

```java
@FunctionalInterface
public interface Supplier<T> {

    T get();
}
```

#### 2.6.2 链式编程

> **一个简单的例子**

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

public class CompletableFutureMall {

    public static void main(String[] args) {
        Student student = new Student();
        
        // 传统赋值
        student.setId(1);
        student.setName("ZhangSan");
        student.setMajor("Math");

        // 链式
        student.setId(2).setName("LiSi").setMajor("English");
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
class Student {
    private Integer id;
    private String name;
    private String major;
}

```

> **链式编程原理**

返回类型与当前变量类型相同，或者直接返回this

#### 2.6.3 join与get对比

`join()`与`get()`的区别，`join()`不会报异常

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureMall {

    public static void main(String[] args) {

        CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> {
            return "hello";
        });
		// System.out.println(completableFuture.get());
        System.out.println(completableFuture.join());
    }
}
```

### 2.7 例子：电商网站比价

#### 2.7.1 需求

> 1. 同一款产品，同时搜索出各个电商平台的售价
> 2. 同一款产品，同时搜索出在同一个平台的所有卖家的售价
> 3. 输出结果返回一个`List<String>` 

#### 2.7.2 demo

```java
import lombok.*;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

public class CompletableFutureMall {

    static List<NetMall> netMalls = Arrays.asList(
            new NetMall("jd"),
            new NetMall("taobao"),
            new NetMall("dangdang"),
            new NetMall("pdd")
    );

    public static List<String> getPrice(List<NetMall> netMalls, String productName) {
        return netMalls
                .stream()
                .map(netMall ->
                        String.format(productName + "in %s price is %.2f",
                                netMall.getNetMallName(),
                                netMall.calcPrice(productName)))
                .collect(Collectors.toList());
    }

    public static List<String> getPriceByCompletableFuture(List<NetMall> netMalls, String productName) {
        return netMalls
                .stream()
                .map(netMall -> CompletableFuture.supplyAsync(() ->
                    String.format(productName + "in %s price is %.2f",
                            netMall.getNetMallName(),
                            netMall.calcPrice(productName))))
                .collect(Collectors.toList())
                .stream()
                .map(s -> s.join())
                .collect(Collectors.toList());
    }

    public static void main(String[] args) {

        long startTime = System.currentTimeMillis();

        System.out.println(getPrice(netMalls, "mysql"));

        long endTime = System.currentTimeMillis();
        System.out.println("运行消耗 " + (endTime - startTime) + " 毫秒");

        startTime = System.currentTimeMillis();

        System.out.println(getPriceByCompletableFuture(netMalls, "mysql"));

        endTime = System.currentTimeMillis();

        System.out.println("运行消耗 " + (endTime - startTime) + " 毫秒");

    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class NetMall {

    private String netMallName;

    public double calcPrice(String productName) {

        // 假设计算需要1s
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return ThreadLocalRandom.current().nextDouble() * 2 + productName.charAt(0);
    }
}
```

## 3 多线程锁

### 3.1 乐观锁悲观锁

> **悲观锁**

介绍：认为自己在使用数据的时候一定有别的线程来修改数据，因此在获得数据的时候会先加锁，确保数据不会被别的线程修改

使用场景：适合写操作多的场景

例子：synchronized关键字和Lock的实现类都是悲观锁

> **乐观锁**

介绍：认为自己在使用数据的时候**不会**有别的线程来修改数据，不会添加锁

如果这个数据在操作过程中没有更新，则当前线程修改的数据成功写入

如果这个数据被其他线程更新，则根据不同的实现方式执行不同的操作，比如放弃更改，重试抢锁等

使用场景：适合读操作多的场景，

例子：版本号机制Version，CAS算法

### 3.2 传统synchronized

synchronized是Java中的关键字，是一种同步锁。它修饰的对象有以下几种：

     　　1. 修饰一个代码块，被修饰的代码块称为同步语句块，其作用的范围是**大括号{}括起来的代码**，作用的对象是**调用这个代码块的对象**；
     　　2. 修饰一个方法，被修饰的方法称为同步方法，其作用的范围是**整个方法**，作用的对象是**调用这个方法的对象**；
     　　3. 修饰一个静态的方法，其作用的范围是**整个静态方法**，作用的对象是**这个类的所有对象**；
     　　4. 修饰一个类，其作用的范围是**synchronized后面括号括起来的部分**，作用主的对象是**这个类的所有对象**。

### 3.3 Synchronized分析

> **面试题：为什么任何一个对象都可以变成一个锁**

1. 首先，Java中的每个对象都派生自Object类，而每个Java Object在JVM内部都有一个native的C++对象 oop/oopDesc进行对应。

2. 线程在获取锁的时候，实际上就是获得一个监视器对象(monitor) ,monitor可以认为是一个同步对象，所有的Java对象是天生携带monitor。在hotspot源码的 markOop.hpp文件中，可以看到下面这段代码。

   ```cpp
   ObjectMonitor* monitor() const {
   	assert(has_monitor(), "check");
   	return (ObjectMonitor*) (value() ^ monitor_value);
   }
   ```

   多个线程访问同步代码块时，相当于去争抢对象监视器修改对象中的锁标识,上面的代码中ObjectMonitor这个对象和线程争抢锁的逻辑有密切的关系 

### 3.4 Synchronized 和 Lock 的区别

1. Synchronized 内置java关键字，Lock 是一个java类
2. Synchronized 无法判断获取锁的状态
3. Synchronized 会自动释放锁，Lock 必须手动释放锁
4. Synchronized 非公平锁 其他线程会死等
5. Synchronized 适合锁少量的代码同步问题，Lock 适合锁大量的同步代码

### 3.5 公平锁和非公平锁

- **公平锁**

  多个线程按照申请锁的顺序获取锁

- **非公平锁**

  不按照申请锁的顺序获取锁

- **面试题**

  1. 为什么会有公平锁/非公平锁，为什么默认非公平

     恢复挂起的线程到真正锁的获取还是有时间差的，非公平锁能更充分的利用CPU时间片，减少CPU的空闲状态时间

  2. 什么时候用公平锁？什么时候用非公平锁？

     使用多线程很重点的考量点是切换线程的开销，当采用非公平锁时，当一个线程请求获取锁的同步状态，然后释放同步状态，所以刚释放的锁的线程在此刻再次获取同步状态的概率就非常大，减少了线程开销

> **买票小程序Demo**

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class SaleTicketDemo {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();

        new Thread(() -> {
            for (int i = 0; i < 40; i++) ticket.sale();
        }, "a").start();
        new Thread(() -> {
            for (int i = 0; i < 40; i++) ticket.sale();
        }, "b").start();
        new Thread(() -> {
            for (int i = 0; i < 40; i++) ticket.sale();
        }, "c").start();
    }
}

class Ticket {
    private int ticketNum = 30;
    private Lock lock = new ReentrantLock(true);    // 无参数默认非公平锁

    public void sale() {
        lock.lock();
        try {
            if (this.ticketNum > 0) {
                System.out.println(Thread.currentThread().getName() + "购得第" + (ticketNum--) + "张票，剩余" + ticketNum + "张");
            }
            // 增加错误发生的概率
            Thread.sleep(10);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}
```

### 3.6 可重入锁（递归锁）

- **介绍**

  是指同一个线程在外层方法获取锁的时候，再进入该线程的内层方法（同一个锁）会自动获取锁，不会因为外层已经获取的锁没有释放而阻塞。（Synchronized关键字和ReentrantLock都是可重入锁）

- **可重入锁种类**

  1. 隐式锁（Synchronized关键字使用的锁）

     ```java
     public class ReEntryLockDemo {
     
         public static void main(String[] args) {
             final Object o = new Object();
     
             new Thread(() -> {
                 synchronized (o) {
                     System.out.println("1层");
                     synchronized (o) {
                         System.out.println("2层");
                         synchronized (o) {
                             System.out.println("3层");
                         }
                     }
                 }
             }, "thread1").start();
         }
     }
     // 结果
     //1层
     //2层
     //3层
     ```

     

  2. 显式锁（Lock类）

### 3.7 死锁

- **造成死锁的原因**

  1.系统资源不足，比如锁再被占用时

- **检测死锁**

  > 在终端中
  >
  > 1. 线用`jps -l`查找我们需要排查的线程
  > 2. 根据线程号使用`jstack 线程号`来查找死锁

  > 使用jconsole
  >
  > 1. 通过`win+r`打开运行，输入`jconsole`打开java控制台
  > 2. ![image-20230605144910144](./JUC并发编程.assets/image-20230605144910144.png)


## 4 中断机制

### 4.1 线程中断机制

#### 4.1.1 什么是中断机制

首先，一个线程不应该由其他线程来中断或停止，所以`Thread. stop, Thread.suspend, Thread.resume`这些方法都被废弃了

其次，java提供了一个停止线程的协商机制---中断，中断需要程序员自己实现

若要中断一个线程，首先调用`interupt`方法，此时线程中断标志位被置为1，应该在该线程内部实现一个判断`interupted`方法是否已被中断，然后自行了断。

#### 4.1.2 面试题

>**如何停止中断运行中的线程**

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class InterruptDemo {

    static volatile boolean isStop = false;

    public static void main(String[] args) {

        ExecutorService pool = Executors.newFixedThreadPool(5);

        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            while (true) {
                if (isStop) {
                    System.out.println(Thread.currentThread().getName() + "结束");
                    break;
                }
                System.out.println("hello volatile");
            }
        }, pool);

        CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            // 延迟3秒后 停止上面的线程
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "申请停止线程");
            isStop = true;
        }, pool);
    }
}
```

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

public class InterruptDemo {

    // 使用atomic布尔值同样可以
    static AtomicBoolean aBoolean = new AtomicBoolean(false);

    public static void main(String[] args) {

        ExecutorService pool = Executors.newFixedThreadPool(5);

        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            while (true) {
                if (aBoolean.get()) {
                    System.out.println(Thread.currentThread().getName() + "结束");
                    break;
                }
                System.out.println("hello atomic");
            }
            return;
        }, pool);

        CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            // 延迟3秒后 停止上面的线程
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "申请停止线程");
            aBoolean.set(true);
            return;
        }, pool);
    }
}
```

```java
import java.util.concurrent.TimeUnit;

public class InterruptDemo {

    public static void main(String[] args) {

        // 判断中断标志位是否置1
        Thread thread = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            while (true) {
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println(Thread.currentThread().getName() + "结束");
                    break;
                }
                System.out.println("hello atomic");
            }
            return;
        }, "thread1");
        thread.start();

        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "----start");
            // 延迟3秒后 停止上面的线程
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "申请停止线程");
            thread.interrupt();
            return;
        }, "thread2").start();
    }
}
```

## 5 LockSupport

### 5.1 介绍

LockSupport用于创建锁和其他同步类的基本线程阻塞原语，就是对线程等待唤醒机制的优化

`park()`阻塞线程

`unpark()`解除阻塞

### 5.2 等待唤醒线程的三种方法

1. 使用Object中的wait()方法让线程等待，使用Object中的notify()方法唤醒线程

   ```java
   public class LockSupportDemo {
       public static void main(String[] args) {
           Object objectLock = new Object();
   
           new Thread(() -> {
               synchronized (objectLock) {
                   System.out.println(Thread.currentThread().getName() + "\t ----come in");
                   try {
                       objectLock.wait();
                   } catch (InterruptedException e) {
                       e.printStackTrace();
                   }
                   System.out.println(Thread.currentThread().getName() + "\t ----被唤醒");
               }
           }, "t1").start();
   
           new Thread(() -> {
               synchronized (objectLock) {
                   System.out.println(Thread.currentThread().getName() + "\t ----come in");
                   objectLock.notify();
                   System.out.println(Thread.currentThread().getName() + "\t ----发出通知");
               }
           }, "t2").start();
       }
   }
   ```

2. 使用JUC包中的Condition的await()方法让线程等待，使用signal()方法唤醒线程

   ```java
   public class LockSupportDemo {
       public static void main(String[] args) {
   
           Lock lock = new ReentrantLock();
           Condition condition = lock.newCondition();
   
           new Thread(() -> {
               lock.lock();
               System.out.println(Thread.currentThread().getName() + "\t ----come in");
               try {
                   condition.await();
                   System.out.println(Thread.currentThread().getName() + "\t ----被唤醒");
               } catch (InterruptedException e) {
                   e.printStackTrace();
               } finally {
                   lock.unlock();
               }
           }, "t1").start();
   
           new Thread(() -> {
               lock.lock();
               System.out.println(Thread.currentThread().getName() + "\t ----come in");
               try {
                   condition.signal();
                   System.out.println(Thread.currentThread().getName() + "\t ----发出通知");
               } catch (Exception e) {
                   e.printStackTrace();
               } finally {
                   lock.unlock();
               }
           }, "t2").start();
       }
   }
   ```

3. LockSupport类park()和unpark()

   ```java
   public class LockSupportDemo {
       public static void main(String[] args) {
   
           Thread t1 = new Thread(() -> {
               System.out.println(Thread.currentThread().getName() + "\t ----come in");
               LockSupport.park();
               System.out.println(Thread.currentThread().getName() + "\t ----被唤醒");
           }, "t1");
           t1.start();
   
           new Thread(() -> {
               System.out.println(Thread.currentThread().getName() + "\t ----come in");
               LockSupport.unpark(t1);
               System.out.println(Thread.currentThread().getName() + "\t ----发出通知");
           }, "t2").start();
       }
   }
   ```

   **支持先唤醒后等待 **park方法消耗许可证 unpark方法增加凭证 同一时间最多只有一个凭证累加无效

