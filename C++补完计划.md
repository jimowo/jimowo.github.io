# C++11 补完计划

## 1 智能指针

C++11 提供3种智能指针 unique_ptr, shared_ptr, weak_ptr

### 1.1 几个简单例子

```c++
#include <memory>
#include <iostream>
using namespace std;
int main() {
    unique_ ptr<int> up1 (new int (11)) ; //无法复制的unique_ ptr
    unique_ ptr<int> up2 = up1; //不能通过编译
    cout << *up1 << endl; // 11
    unique_ ptr<int> up3 = move (up1); //现在p3是数据唯- -的unique_ ptr 智能指针
    cout << *up3 << endl ; // 11
    cout << *up1 << endl ; //运行时错误
    up3.reset(); //显式释放内存
    up1.reset(); //不会导致运行时错误
    cout << *up3 << endl; //运行时错误
    shared_ ptr<int> sp1 (new int(22));
    shared_ ptr<int> sp2 = sp1;
    cout << *sp1 << endl; // 22
    cout << *sp2 << endl; // 22
    sp1.reset() ;
    cout << *sp2 << endl;// 22
}
```

直观地看来，unique_ptr 形如其名地，与所指对象的内存绑定紧密，不能与其他unique_ptr类型的指针对象共享所指对象的内存。而从实现上讲，unique_ptr 则是-一个删除了拷贝构造函数、保留了移动构造函数的指针封装类型。程序员仅可以使用右值对unique_ptr 对象进行构造，而且一旦构造成功，右值对象中的指针即被“窃取”，因此该右值对象即刻失去了对指针的“所有权”。

而shared_ptr 同样形如其名，允许多个该智能指针共享地“拥有”同一堆分配对象的内存。与unique_ptr不同的是，由于在实现上采用了引用计数，所以一旦一个shared_ptr指针放弃了“所有权”(失效),其他的shared_ptr对对象内存的引用并不会受到影响。只有在引用计数归零的时候，share_ptr才会真正释放所占有的堆内存的空间。

```C++
#include <memory>
#include <iostream>
using namespace std;
void Check (weak_ ptr<int> & wp){
	shared_ ptr<int> sp = wp.1ock() ; //转换为shared_ ptr<int>
    if (sp != nullptr)
        cout << "still ”<< *sp << endl ;
    else
        cout << "pointer is invalid." << endl;
}
int main() {
    shared_ptr<int> sp1 (new int (22));
    shared_ptr<int> sp2 = sp1;
    weak_ptr<int> wp = sp1; //指向shared_ ptr<int> 所指对象
    cout << *sp1 << endl; // 22
    cout << *sp2 << endl; // 22
    Check(wp); // still 22
    spl.reset();
    cout << *sp2 << endl; // 22
    Check(wp); // still 22
    sp2.reset();
    Check(wp); // pointer is invalid
}

```

智能指针还包括了weak_ ptr这个类模板。weak_ ptr的使用更为复杂一点，它可以指向shared_ptr指针指向的对象内存，却并不拥有该内存。而使用weak_ptr成员lock，则可返回其指向内存的-一个shared_ptr 对象，且在所指对象内存已经无效时，返回指针空值。这在验证share_ptr智能指针的有效性上会很有作用。