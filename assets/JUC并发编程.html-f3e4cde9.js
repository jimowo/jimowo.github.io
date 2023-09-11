const e=JSON.parse('{"key":"v-64fed591","path":"/java/JUC%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B.html","title":"JUC并发编程","lang":"zh-CN","frontmatter":{"title":"JUC并发编程","author":"jimowo","icon":"java","date":"2023-02-09T00:00:00.000Z","order":3,"category":["Java","多线程"],"tag":["Java","并发编程","JUC"],"description":"JUC并发编程 1 线程知识 1.1 start() 线程开启底层 源码分析 public synchronized void start() { if (threadStatus != 0) throw new IllegalThreadStateException(); group.add(this); boolean started = false; try { start0();\\t// 调用了start0方法 这个方法在下面展示 started = true; } finally { try { if (!started) { group.threadStartFailed(this); } } catch (Throwable ignore) { } } } // native关键字表示这是一个本地方法 // 底层是jvm中分配了一个线程 private native void start0();","head":[["meta",{"property":"og:url","content":"https://jimowo.github.io/java/JUC%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"博客|随笔|项目"}],["meta",{"property":"og:title","content":"JUC并发编程"}],["meta",{"property":"og:description","content":"JUC并发编程 1 线程知识 1.1 start() 线程开启底层 源码分析 public synchronized void start() { if (threadStatus != 0) throw new IllegalThreadStateException(); group.add(this); boolean started = false; try { start0();\\t// 调用了start0方法 这个方法在下面展示 started = true; } finally { try { if (!started) { group.threadStartFailed(this); } } catch (Throwable ignore) { } } } // native关键字表示这是一个本地方法 // 底层是jvm中分配了一个线程 private native void start0();"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://jimowo.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-12T07:54:25.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"JUC并发编程"}],["meta",{"property":"article:author","content":"jimowo"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"并发编程"}],["meta",{"property":"article:tag","content":"JUC"}],["meta",{"property":"article:published_time","content":"2023-02-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-12T07:54:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUC并发编程\\",\\"image\\":[\\"https://jimowo.github.io/\\"],\\"datePublished\\":\\"2023-02-09T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-12T07:54:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"jimowo\\"}]}"]]},"headers":[{"level":2,"title":"1 线程知识","slug":"_1-线程知识","link":"#_1-线程知识","children":[{"level":3,"title":"1.1 start() 线程开启底层","slug":"_1-1-start-线程开启底层","link":"#_1-1-start-线程开启底层","children":[]},{"level":3,"title":"1.2 基础概念","slug":"_1-2-基础概念","link":"#_1-2-基础概念","children":[]}]},{"level":2,"title":"2 CompletableFuture","slug":"_2-completablefuture","link":"#_2-completablefuture","children":[{"level":3,"title":"2.1 Future接口","slug":"_2-1-future接口","link":"#_2-1-future接口","children":[]},{"level":3,"title":"2.3 FutureTask类","slug":"_2-3-futuretask类","link":"#_2-3-futuretask类","children":[]},{"level":3,"title":"2.4 CompletableFuture优化Future","slug":"_2-4-completablefuture优化future","link":"#_2-4-completablefuture优化future","children":[]},{"level":3,"title":"2.5 CompletableFuture源码分析","slug":"_2-5-completablefuture源码分析","link":"#_2-5-completablefuture源码分析","children":[]},{"level":3,"title":"2.6 函数式编程","slug":"_2-6-函数式编程","link":"#_2-6-函数式编程","children":[]},{"level":3,"title":"2.7 例子：电商网站比价","slug":"_2-7-例子-电商网站比价","link":"#_2-7-例子-电商网站比价","children":[]}]},{"level":2,"title":"3 多线程锁","slug":"_3-多线程锁","link":"#_3-多线程锁","children":[{"level":3,"title":"3.1 乐观锁悲观锁","slug":"_3-1-乐观锁悲观锁","link":"#_3-1-乐观锁悲观锁","children":[]},{"level":3,"title":"3.2 传统synchronized","slug":"_3-2-传统synchronized","link":"#_3-2-传统synchronized","children":[]},{"level":3,"title":"3.3 Synchronized分析","slug":"_3-3-synchronized分析","link":"#_3-3-synchronized分析","children":[]},{"level":3,"title":"3.4 Synchronized 和 Lock 的区别","slug":"_3-4-synchronized-和-lock-的区别","link":"#_3-4-synchronized-和-lock-的区别","children":[]},{"level":3,"title":"3.5 公平锁和非公平锁","slug":"_3-5-公平锁和非公平锁","link":"#_3-5-公平锁和非公平锁","children":[]},{"level":3,"title":"3.6 可重入锁（递归锁）","slug":"_3-6-可重入锁-递归锁","link":"#_3-6-可重入锁-递归锁","children":[]},{"level":3,"title":"3.7 死锁","slug":"_3-7-死锁","link":"#_3-7-死锁","children":[]}]},{"level":2,"title":"4 中断机制","slug":"_4-中断机制","link":"#_4-中断机制","children":[{"level":3,"title":"4.1 线程中断机制","slug":"_4-1-线程中断机制","link":"#_4-1-线程中断机制","children":[]}]},{"level":2,"title":"5 LockSupport","slug":"_5-locksupport","link":"#_5-locksupport","children":[{"level":3,"title":"5.1 介绍","slug":"_5-1-介绍","link":"#_5-1-介绍","children":[]},{"level":3,"title":"5.2 等待唤醒线程的三种方法","slug":"_5-2-等待唤醒线程的三种方法","link":"#_5-2-等待唤醒线程的三种方法","children":[]}]},{"level":2,"title":"6 JAVA内存模型JMM","slug":"_6-java内存模型jmm","link":"#_6-java内存模型jmm","children":[{"level":3,"title":"6.1 带着问题学习","slug":"_6-1-带着问题学习","link":"#_6-1-带着问题学习","children":[]},{"level":3,"title":"6.2 计算机硬件存储体系","slug":"_6-2-计算机硬件存储体系","link":"#_6-2-计算机硬件存储体系","children":[]},{"level":3,"title":"6.3 Java内存模型Java Memory Model","slug":"_6-3-java内存模型java-memory-model","link":"#_6-3-java内存模型java-memory-model","children":[]},{"level":3,"title":"6.4 JMM规范下 三大特性","slug":"_6-4-jmm规范下-三大特性","link":"#_6-4-jmm规范下-三大特性","children":[]},{"level":3,"title":"6.5 JMM规范下 多线程对变量的独写过程","slug":"_6-5-jmm规范下-多线程对变量的独写过程","link":"#_6-5-jmm规范下-多线程对变量的独写过程","children":[]},{"level":3,"title":"6.6 JMM规范下 多线程先行发生原则之happens-before","slug":"_6-6-jmm规范下-多线程先行发生原则之happens-before","link":"#_6-6-jmm规范下-多线程先行发生原则之happens-before","children":[]}]},{"level":2,"title":"7 Volatile与JMM","slug":"_7-volatile与jmm","link":"#_7-volatile与jmm","children":[{"level":3,"title":"7.1 内存屏障","slug":"_7-1-内存屏障","link":"#_7-1-内存屏障","children":[]},{"level":3,"title":"7.2 Volatile保证可见性","slug":"_7-2-volatile保证可见性","link":"#_7-2-volatile保证可见性","children":[]},{"level":3,"title":"7.3 Volatile保证有序性","slug":"_7-3-volatile保证有序性","link":"#_7-3-volatile保证有序性","children":[]},{"level":3,"title":"7.4 Volatile不能保证原子性","slug":"_7-4-volatile不能保证原子性","link":"#_7-4-volatile不能保证原子性","children":[]}]},{"level":2,"title":"8 CAS机制","slug":"_8-cas机制","link":"#_8-cas机制","children":[{"level":3,"title":"8.1 CAS是什么 解决了什么问题","slug":"_8-1-cas是什么-解决了什么问题","link":"#_8-1-cas是什么-解决了什么问题","children":[]},{"level":3,"title":"8.2 Unsafe类","slug":"_8-2-unsafe类","link":"#_8-2-unsafe类","children":[]},{"level":3,"title":"8.3 AtomicReference类（对象的原子操作类）","slug":"_8-3-atomicreference类-对象的原子操作类","link":"#_8-3-atomicreference类-对象的原子操作类","children":[]},{"level":3,"title":"8.4 CAS手写自旋锁","slug":"_8-4-cas手写自旋锁","link":"#_8-4-cas手写自旋锁","children":[]},{"level":3,"title":"8.5 CAS的缺点","slug":"_8-5-cas的缺点","link":"#_8-5-cas的缺点","children":[]},{"level":3,"title":"8.6 缺点改进","slug":"_8-6-缺点改进","link":"#_8-6-缺点改进","children":[]}]},{"level":2,"title":"10 ThreadLocal","slug":"_10-threadlocal","link":"#_10-threadlocal","children":[{"level":3,"title":"10.1 问题","slug":"_10-1-问题","link":"#_10-1-问题","children":[]},{"level":3,"title":"10.2 ThreadLocal是什么","slug":"_10-2-threadlocal是什么","link":"#_10-2-threadlocal是什么","children":[]},{"level":3,"title":"10.3 API与调用","slug":"_10-3-api与调用","link":"#_10-3-api与调用","children":[]},{"level":3,"title":"10.4 ThreadLocal的实现原理","slug":"_10-4-threadlocal的实现原理","link":"#_10-4-threadlocal的实现原理","children":[]}]},{"level":2,"title":"13 AQS队列同步器-AbstractQueuedSynchronizer","slug":"_13-aqs队列同步器-abstractqueuedsynchronizer","link":"#_13-aqs队列同步器-abstractqueuedsynchronizer","children":[{"level":3,"title":"13.1 问题","slug":"_13-1-问题","link":"#_13-1-问题","children":[]},{"level":3,"title":"13.2 AQS简介","slug":"_13-2-aqs简介","link":"#_13-2-aqs简介","children":[]},{"level":3,"title":"13.3 AQS原理","slug":"_13-3-aqs原理","link":"#_13-3-aqs原理","children":[]},{"level":3,"title":"13.4 如何使用AQS","slug":"_13-4-如何使用aqs","link":"#_13-4-如何使用aqs","children":[]},{"level":3,"title":"13.5 AQS分析","slug":"_13-5-aqs分析","link":"#_13-5-aqs分析","children":[]},{"level":3,"title":"13.6 ConditionObject（wait队列）","slug":"_13-6-conditionobject-wait队列","link":"#_13-6-conditionobject-wait队列","children":[]}]}],"git":{"createdTime":1688780897000,"updatedTime":1689148465000,"contributors":[{"name":"jimowo","email":"1252480844@qq.com","commits":11}]},"readingTime":{"minutes":37.85,"words":11356},"filePathRelative":"java/JUC并发编程.md","localizedDate":"2023年2月9日","excerpt":"<h1> JUC并发编程</h1>\\n<h2> 1 线程知识</h2>\\n<h3> 1.1 start() 线程开启底层</h3>\\n<blockquote>\\n<p>源码分析</p>\\n</blockquote>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">synchronized</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">start</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n   \\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>threadStatus <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">IllegalThreadStateException</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    group<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">boolean</span> started <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">start0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\t<span class=\\"token comment\\">// 调用了start0方法 这个方法在下面展示</span>\\n        started <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">finally</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>started<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                group<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">threadStartFailed</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Throwable</span> ignore<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            \\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">// native关键字表示这是一个本地方法</span>\\n<span class=\\"token comment\\">// 底层是jvm中分配了一个线程</span>\\n<span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">native</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">start0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
