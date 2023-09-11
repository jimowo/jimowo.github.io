import{_ as e,o as n,c as i,d as l}from"./app-ff5a96d8.js";const t={},s=l(`<h1 id="cpp补完计划" tabindex="-1"><a class="header-anchor" href="#cpp补完计划" aria-hidden="true">#</a> Cpp补完计划</h1><h2 id="_1-智能指针" tabindex="-1"><a class="header-anchor" href="#_1-智能指针" aria-hidden="true">#</a> 1 智能指针</h2><p>C++11 提供3种智能指针 unique_ptr, shared_ptr, weak_ptr</p><h3 id="_1-1-几个简单例子" tabindex="-1"><a class="header-anchor" href="#_1-1-几个简单例子" aria-hidden="true">#</a> 1.1 几个简单例子</h3><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &lt;memory&gt;
#include &lt;iostream&gt;
using namespace std;
int main() {
    unique_ ptr&lt;int&gt; up1 (new int (11)) ; //无法复制的unique_ ptr
    unique_ ptr&lt;int&gt; up2 = up1; //不能通过编译
    cout &lt;&lt; *up1 &lt;&lt; endl; // 11
    unique_ ptr&lt;int&gt; up3 = move (up1); //现在p3是数据唯- -的unique_ ptr 智能指针
    cout &lt;&lt; *up3 &lt;&lt; endl ; // 11
    cout &lt;&lt; *up1 &lt;&lt; endl ; //运行时错误
    up3.reset(); //显式释放内存
    up1.reset(); //不会导致运行时错误
    cout &lt;&lt; *up3 &lt;&lt; endl; //运行时错误
    shared_ ptr&lt;int&gt; sp1 (new int(22));
    shared_ ptr&lt;int&gt; sp2 = sp1;
    cout &lt;&lt; *sp1 &lt;&lt; endl; // 22
    cout &lt;&lt; *sp2 &lt;&lt; endl; // 22
    sp1.reset() ;
    cout &lt;&lt; *sp2 &lt;&lt; endl;// 22
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直观地看来，unique_ptr 形如其名地，与所指对象的内存绑定紧密，不能与其他unique_ptr类型的指针对象共享所指对象的内存。而从实现上讲，unique_ptr 则是-一个删除了拷贝构造函数、保留了移动构造函数的指针封装类型。程序员仅可以使用右值对unique_ptr 对象进行构造，而且一旦构造成功，右值对象中的指针即被“窃取”，因此该右值对象即刻失去了对指针的“所有权”。</p><p>而shared_ptr 同样形如其名，允许多个该智能指针共享地“拥有”同一堆分配对象的内存。与unique_ptr不同的是，由于在实现上采用了引用计数，所以一旦一个shared_ptr指针放弃了“所有权”(失效),其他的shared_ptr对对象内存的引用并不会受到影响。只有在引用计数归零的时候，share_ptr才会真正释放所占有的堆内存的空间。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;memory&gt;
#include &lt;iostream&gt;
using namespace std;
void Check (weak_ ptr&lt;int&gt; &amp; wp){
	shared_ ptr&lt;int&gt; sp = wp.1ock() ; //转换为shared_ ptr&lt;int&gt;
    if (sp != nullptr)
        cout &lt;&lt; &quot;still ”&lt;&lt; *sp &lt;&lt; endl ;
    else
        cout &lt;&lt; &quot;pointer is invalid.&quot; &lt;&lt; endl;
}
int main() {
    shared_ptr&lt;int&gt; sp1 (new int (22));
    shared_ptr&lt;int&gt; sp2 = sp1;
    weak_ptr&lt;int&gt; wp = sp1; //指向shared_ ptr&lt;int&gt; 所指对象
    cout &lt;&lt; *sp1 &lt;&lt; endl; // 22
    cout &lt;&lt; *sp2 &lt;&lt; endl; // 22
    Check(wp); // still 22
    spl.reset();
    cout &lt;&lt; *sp2 &lt;&lt; endl; // 22
    Check(wp); // still 22
    sp2.reset();
    Check(wp); // pointer is invalid
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>智能指针还包括了weak_ ptr这个类模板。weak_ ptr的使用更为复杂一点，它可以指向shared_ptr指针指向的对象内存，却并不拥有该内存。而使用weak_ptr成员lock，则可返回其指向内存的-一个shared_ptr 对象，且在所指对象内存已经无效时，返回指针空值。这在验证share_ptr智能指针的有效性上会很有作用。</p>`,9),d=[s];function r(a,u){return n(),i("div",null,d)}const v=e(t,[["render",r],["__file","Cpp补完计划.html.vue"]]);export{v as default};
