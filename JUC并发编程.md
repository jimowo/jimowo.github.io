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
2. 守护线程作为一个服务线程，当用户线程全部结束了，java虚拟机会自动结束守护线程