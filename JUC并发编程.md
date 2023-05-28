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

![image-20230526102154164](JUC并发编程.assets/image-20230526102154164.png) 

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

### 2.5 CompletableFuture源码分析

> **CompletableFuture继承实现关系**

![image-20230526173657051](./JUC并发编程.assets/image-20230526173657051.png) 

> **CompletionStage接口源码**

