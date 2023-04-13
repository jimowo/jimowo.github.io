---
typora-copy-images-to: java笔记图片
typora-root-url: java笔记图片
---

# Java基础笔记

## 一、Java基础概述

### Java的重要特点

1. 面向对象
2. Java是健壮的（强类型机制、异常处理、垃圾的自动收集）
3. 跨平台性（编译生成的 class 文件可以通过JVM（Java虚拟机）直接在 windows 平台或 linux 平台运行）
4. 解释型语言（解释型语言，编译后的代码不能被机器直接执行需要通过解释器来执行）

### Java的运行机制及运行过程

#### Java**核心机制** - JVM

1. JVM是一个虚拟计算机，具有指令集并使用不同的存储区域。负责执行指令、管理数据、内存、寄存器，包含在JDK中
2. 不同平台有不同虚拟机，实现了一次编译全平台通用

#### 编译运行指令

编译 javac

运行 java

### JDK基本介绍

JDK = JRE + java开发工具（javac、java等）

JRE = JVM + Java SE标准类库

### Java快速入门

```java
// 1. pubulic hello 共有类
public class hello {
    // public static void main(String[] args) 主方法 程序入口
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

### Java开发注意事项

1. 一个源文件中只能有一个public类
2. 文件名必须与public类同名
3. 可以将main方法写在非public类中，并指定运行该方法

```java
// 每一个类编译后都会生成一个对应的 class 文件，编译后用 java dog 即可执行 dog 类里的主方法
class dog {
    public static void main(String[] args) {
        System.out.println("hello dog");
    }
}
// 编译后用 java cat 即可执行 cat 类里的主方法
class cat {
    public static void main(String[] args) {
        System.out.println("hello cat");
    }
}
```

### Java转义字符

1. \t : 制表符
2. \n: 换行符
3. \\\\ : 一个 \ ，编译器的会把第一个 \ 当做转义字符，所以输出一个斜杠需要打两个斜杆，输出两个则需要四个
4. \\" : 一个 "
5. \\' : 一个 '
6. \r : 一个回车，回车与换行不同，是将光标重新回到当前行开头

### Java注释

- 单行注释    // 注释文字

- 多行注释    /* 注释文字 */

- **文档注释**    类的说明文档，可以被javadoc解析    解析格式：javadoc -d 路径名 -xx -yy comment.java
  
  ```java
  /**
   * @author  Jimowo
   * @version 1.0.1beta
   */
  public class comment {
      public static void main(String[] args) {
          System.out.println("文档注释");
      }
  }
  ```

## 二、Java变量

### 编码表

- ASCII码，128个字符（包含英语字符）
  
  缺点：不能表示所有字符

- Unicode码，65536个字符（包含世界上所有字符）
  
  编码0 - 127位都与ASCII码相同，所以兼容ASCII码
  
  缺点：英文字母和汉字都占用2个字节，浪费空间

- UTF-8编码，使用1-6个字节来表示字符，根据不同符号来变化字节长度
  
  其中字母占一个字节，汉字占3个字节

### Java中 + 号的使用

1. 当加号左右两侧都是数值型时，则做加法运算
2. 当加号两侧有一方是字符串时，则做拼接运算（会把其中的数值型转为字符串）

### 内置数据类型

- **整型类型**（1byte = 8bit）
  
  byte（8位），short（16位），int（32位），long（64位）
  
  整型在内存中第一位存放符号位
  
  ```java
  int n1 = 1;
  // int n2 = 1L; // 后缀L表示这是一个长整型，所以不能复制给int类型
  long n2 = 1L;
  ```

- **浮点类型**
  
  float（32位，单精度），double（64位，双精度）
  
  浮点类型在内存中存放形式：符号位 + 指数位 + 尾数位
  
  ```java
  // float num1 = 1.1; // 报错，因为浮点数默认是double类型
  double num1 = 1.1;
  float num2 = 1.1f;
  double num3 = 1.1f; // 正确
  double num4 = 5.12e4 // 科学计数法
  ```

- **布尔类型**
  
  boolean（1位，只有 true 和 false 两个值）

- **字符类型**
  
  char（16位，最小值为0）
  
  ```java
  char c1 = 'a';    // 字符常量用单引号括起来
  char c2 = 97;    // 本质上char类型保存的是整数，输出的是对应的unicode码 
  System.out.println(c1);
  System.out.println(c2);    // 上面两个输出都是a
  ```

### 基本数据类型转换

- **自动类型转换**
  
  java在进行赋值或运算时，精度小的类型自动转换为精度大的类型
  
  顺序：
  
  ​                char → int → long → float → double
  
  byte → short  → int → long → float → double
  
  细节：
  
  1. 当有多种数据类型进行混合运算时，系统首先自动将数据转换成容量最大（精度最高）的类型
     
     ```java
     int n1 = 10;
     float n2 = n1 + 1.1;    // 错误，因为1.1默认为double类型，所以n1和1.1会变成double类型计算
     ```
  
  2. 精度高的类型也不能赋值给精度低的类型，例如double赋给int
  
  3. （byte、short）和char之间不会相互转化（范围不同），但是可以进行计算，计算时会都转换为int类型
     
     ```java
     byte b1 = 10;    // 正确，虽然10默认是int类型，但是具体值在byte范围内就可以赋值
     char n2 = 10;
     byte b2 = n2;    // 错误，char变量不能赋值给byte
     n2 += b1;
     b1 += n2;        // 这两个计算都是正确的
     n2 = n2 + b1;    // 错误 ？
     ```
  
  4. boolean不参与转换

- **强制类型转换**
  
  强制将高精度转换为低精度，使用时要加上强制转换符（类型），可能会造成精度降低或溢出
  
  ```java
  int i = (int)1.9;    // double类型强制转换为int类型
  System.out.println(i);    // 输出为1，精度降低
  byte b1 = (byte)130;
  System.out.println(b1);    // 输出为-126，因为130超过byte的最大值127所以造成了溢出
  ```
  
  细节：
  
  1. char类型可以保存int的常量值，但是不能保存int变量值
     
     ```java
     char c1 = 10;    // 正确
     int n1 = 10;
     char c2 = n1;    // 错误
     char c2 = (char)n1;        // 正确
     ```

### 基本数据类型和String类型的转换

- **基本类型转String**
  
  基本类型 + ""即可
  
  ```java
  int n1 = 10;
  String str1 = n1 + '';
  ```

- **String转基本类型**
  
  调用类型对应的parseXXX方法即可
  
  ```java
  String str1 = "123";
  int n1 = Integer.parseInt(str1);
  ```

## 三、Java运算符

### 算术运算符

算数运算符一览：

| 运算符        | 运算               | 范例                                  | 结果                 |
|:----------:|:----------------:|:-----------------------------------:|:------------------:|
| +          | 正号               | +7                                  | 7                  |
| -          | 负号               | b = 11；- b                          | -11                |
| +          | 加                | 1 + 2                               | 3                  |
| -          | 减                | 3 - 2                               | 1                  |
| *          | 乘                | 2 * 3                               | 6                  |
| /          | 除                | 6 * 2                               | 3                  |
| %          | 取余               | 5 * 2                               | 3                  |
| ++<br />++ | 自增（前）<br />自增（后） | int a = 1; ++ a;<br />int b = a ++; | a = 3;<br />b = 2; |
| --<br />-- | 自减（前）<br />自减（后） |                                     |                    |
| +          | 字符串相加            | " 12 " + "12"                       | "1212"             |

### 比较运算符

比较运算符一览：

==,    !=,    <,    >,    <=,    >=

特殊的：instanceof，    检查是否为类的对象，    "str" is instanceof String → true

### 逻辑运算符

逻辑运算符一览：

1. 短路与 &&，短路或 ||，取反 ！
2. 逻辑与 &，逻辑或 |，逻辑异或 ^

细节：

1. java中&&与&的区别在于，&不管左边是否为真，都会计算&左右两边的表达式，&&则是当左侧表达式为false时，就不计算右边表达式，效率更高
2. || 同上

### 赋值运算符

- **基本赋值运算符**
  
  =

- **复合赋值运算符**
  
  +=，-=，*=，/=，%=等
  
  a += b 等价于 a = a + b

- 细节：
  
  1. 运算顺序从右向左，int a = 1 + 2 + 3;
  
  2. 赋值运算符 = 的左边只能是变量，右边可以是变量、表达式、常量
  
  3. 符合赋值运算符会进行类型转换
     
     ```java
     byte b1 = 10;    // 正确，虽然10默认是int类型，但是常量在byte范围内就可以赋值
     char n2 = 10;
     n2 += b1;
     b1 += n2;        // 这两个计算都是正确的，因为 += 会进行类型转换
     n2 = n2 + b1;    // 错误
     ```

### 三元运算符

- 语法：条件表达式 ？ 表达式1 ：表达式2    ，如果条件表达式为true则结果为表达式1结果

- 细节：
  
  三元运算符的嵌套
  
  ```java
  // 找三个数中的最大值
  int a = 5, b = 3, c = 8;
  int result = a > b ? (a > c ? a : c) : (b > c ? b : c);
  ```
  
  ### 运算符优先级
1. （），{} 等
2. 单目运行 ++，--，~，！（**优先级从右向左**）
3. 算数运算符 *，/，%，+，-
4. 位移运算符 <<，>>，>>>
5. 比较运算符 <，>，<=，>=，instanceof
6. 逻辑运算符 ==，!=，&，^，|，&&，||
7. 三元运算符 ? :
8. 赋值运算符 =，*=，/=，%= 等（**优先级从右向左**）

### 键盘输入

需要导入 java.util.Scanner

```java
import java.util.Scanner;
public class inputDetail {
    public static void main(String[] args) {
        Scanner sc1 = new Scanner(System.in);    // 创建一个扫描仪接收键盘输入
        System.out.println("please enter");
        String name = sc1.next();                // next()表示接收下一个数
        int age = sc1.nextInt();
        double salary = sc1.nextDouble();
        sc1.close();
        System.out.println("name: " + name + " age: " + age + " salary: " + salary);
    }
}
```

### 原码、反码、补码

1. 正数的原码、反码、补码都一样
2. 负数的反码 = 原码符号位不变，其他位取反
3. 负数的补码 = 反码 + 1
4. 0的反码、补码都是0
5. java没有无符号数
6. 计算机运算时都是用补码运算的

## 四、控制结构

### 分支控制if - else

- **双分支**语法：
  
  if（条件表达式）{
  
  ​                执行代码块；// 可以有多条语句
  
  }
  
  else {
  
  ​                执行代码块；
  
  }

- **多分支**语法
  
  if（条件表达式）{
  
  ​                执行代码块；// 可以有多条语句
  
  }
  
  else if {
  
  ​                执行代码块；
  
  }
  
  ……
  
  else {
  
  ​                执行代码块；
  
  }

### switch分支结构

- 基本语法：
  
  switch（表达式）{
  
  ​            case 常量1：
  
  ​            语句块1；
  
  ​            break；// 退出switch，若没有break则会顺序执行下一个语句块
  
  ​            case 常量2：
  
  ​            语句块2；
  
  ​            break；
  
  ​            ……
  
  ​            default：// 如果case都不满足，则会进default默认语句块
  
  ​            默认语句块；
  
  ​            break；
  
  }

- 细节：
  
  1. switch（表达式），表达式中的返回值必须是byte，short，int，char，enum，String
  2. case 子句中的值必须是常量，不能是变量
  3. default可有可无
  4. 没有break，执行完一个case后，会顺序执行语句块到末尾

### for循环控制

- 基本语法：
  
  for（循环变量初始化；循环条件；循环变量迭代）{
  
  ​                循环操作语句；
  
  }

- 细节：
  
  1. for循环可以简写成for（；循环判断条件；）分号不能省略
  2. for循环可以有多条初始化语句，但要求类型相同，并用逗号隔开

### while循环控制

- 基本语法：
  
  while（循环条件）{
  
  ​            循环体语句；
  
  ​            变量迭代语句；
  
  }

- 细节：
  
  1. 先判断再执行

### do - while循环控制

- 基本语法：
  
  do {
  
  ​            循环体语句；
  
  ​            循环变量迭代；
  
  } while（循环条件）；

- 细节：
  
  1. 先执行，再判断，所以一定会执行一次
  2. 结尾有分号

### 多重循环控制

- 九九乘法表
  
  ```java
  public class chengFaBiao {
      public static void main(String[] args) {
          int cols = 9;
          for (int c = 1; c <= cols; c++) {
              for (int r = 1; r <= c; r++) {
                  System.out.print(r + " x " + c + " = " + r*c + "\t");
              }
              System.out.println("");
          }
      }
  }
  ```

- 空心三角形
  
  ```java
  
  ```

### 跳转控制语句 - break

- 基本语法：
  
  {
  
  ​        ……
  
  ​        break；
  
  ​        ……
  
  }
  
  跳出循环

- 细节：
  
  1. break语句出现在多层嵌套语句块中时，可以通过标签指明要终止于哪一层语句块
     
     ```java
         public static void main(String[] args) {
             label1:
             for (int j = 0; j < 4; j ++) {
             label2:
                 for (int i = 0; i < 10; i++) {
                     if (i == 2) {
                         break label2;
                     }
                 }
                 System.out.println("j = " + j);
             }
         }
     }
     ```
  
  2. 若没有指定break，默认退出最近的循环体

### 跳转控制语句 - continue

- 基本语法：
  
  {
  
  ​        ……
  
  ​        continue；
  
  ​        ……
  
  }
  
  用于结束本次循环，继续执行下次循环，同break可以通过标签来指定跳过的循环。

### 跳转控制语句 - return

return使用在方法，表示跳出所在方法，写在main方法中，则会退出程序。

## 五、数组、排序和查找

### 数组

- **数组的动态初始化**方法一
  
  语法：数据类型 数组名[] = new 数据类型 [大小]
  
  int a[] = new int[6];    // 创建一个int数组，存放6个int

- 动态初始化方法二
  
  先声明数组 int a[];，再初始化a = new int[10]；

- **数组的静态初始化**
  
  语法：数据类型 数组名[] = {元素值，元素值……}

- **数组的赋值机制**
  
  数组的赋值是引用传递，赋的是地址
  
  例如：
  
  ```java
  public class arrayAssign {
      public static void main(String[] args) {
          int[] arr1 = {1, 2, 3};
          int[] arr2 = arr1;    // 此时arr1和arr2指向的是同一片地址，所以改变arr2的值，也会改变arr1的值
          System.out.println(arr1[0]);    // 输出为1
          arr2[0] = 4;
          System.out.println(arr1[0]);    // 输出为4
      }
  }
  ```

- **数组拷贝**
  
  ```java
  public class arrayAssign {
      public static void main(String[] args) {
          int[] arr1 = {1, 2, 3};
          // 正确的数组赋值方法
          // 开辟新空间
          int[] arr2 = new int[arr1.length];
          // 遍历复制
          int i = 0;
          for (int num : arr1) {
              arr2[i] = num;
              i ++;
          }
          // 查看两数组地址
          System.out.println(arr1);
          System.out.println(arr2);
      }
  }
  ```

- **数组扩容**
  
  需要通过创建新数组的方式来扩容

- **冒泡排序**
  
  ```java
  /**
   * @apiNote 冒泡排序
   */
  public class bubbleSort {
      public static void main(String[] args) {
  
          int[] arrSort = {24, 69, 87, 53, 12};
          int temp;
          for (int i = 0; i < arrSort.length-1; i++) {
              for (int j = 0; j < arrSort.length-i-1; j++) {
                  if (arrSort[j] > arrSort[j+1]) {
                      temp = arrSort[j+1];
                      arrSort[j+1] = arrSort[j];
                      arrSort[j] = temp;
                  }
              }
          }
          for (int i : arrSort) {
              System.out.println(i);
          }
  
      }
  }
  ```

- **查找**
  
  1. 顺序查找
     
     数组挨个判断，找到了则返回下标
  
  2. 二分法查找
     
     先升序排序，再从数组中间位置开始比较，比查找的数小则说明查找的数在右半边，比查找的数大则说明在左半边，这样不断寻找，最多只需log2N次

### 二维数组


- **二维数组动态初始化**
  
  语法：类型\[][] 数组名 = new 类型\[大小][大小]

- **二维数组的初始化（特殊）**
  
  java允许动态创建以下的数组
  
  | i \ j | j = 0 | j = 1 | j = 2 |
  |:-----:|:-----:|:-----:|:-----:|
  | i = 0 | 1     |       |       |
  | i = 1 | 2     | 2     |       |
  | i = 2 | 3     | 3     | 3     |
  
  ```java
  public class twoDemensionArr {
      public static void main(String[] args) {
          int[][] arr2 = new int[3][];    // 创建一个不确定列数的二维数组
          for (int i = 0; i < arr2.length; i++) {
              arr2[i] = new int[i+1];        // 可以为每个子数组设置不同的列数
          }
          for (int i = 0; i < arr2.length; i++) {
              for (int j = 0; j < arr2[i].length; j++) {
                  arr2[i][j] = i+1;
              }
          }
      }
  }
  ```

- **二维数组的遍历**
  
  ```java
  public class twoDemensionArr {
      public static void main(String[] args) {
          for (int[] is : arr1) {
              for (int is2 : is) {
                  System.out.println(is2);
              }
          }
      }
  }
  ```

- **杨辉三角**
  
  ```java
  public class yangHui {
      public static void main(String[] args) {
          // 打印杨辉三角
          // 初始化
          int[][] arrTri = new int[10][];
          for (int i = 0; i < arrTri.length; i++) {  
              arrTri[i] = new int[i + 1];
          }
          // 赋值
          for (int i = 0; i < arrTri.length; i++) {
              for (int j = 0; j < arrTri[i].length; j++) {
                  if ((j == 0) || (j == arrTri[i].length-1)) {
                      arrTri[i][j] = 1;
                  }
                  else {
                      arrTri[i][j] = arrTri[i-1][j-1] + arrTri[i-1][j];
                  }
              }
          }
          // 打印显示
          for (int[] is : arrTri) {
              for (int is2 : is) {
                  System.out.print(is2 + " ");
              }
              System.out.println();
          }
  
      }
  }
  ```

- **细节**
  
  1. 二维数组的声明方式有：
     
     int \[][] arr,    int[] arr[],    int arr\[][]
  
  2. 二维数组实际上是由多个一维数组组成，它的各个一维数组长度可以相同也可以不同

## 六、面向对象编程（基础）

### 类与对象介绍

类是对象的模板，对象是类的实例

**类的五大成员**

1. **属性**
2. **方法**
3. **构造器**
4. **代码块**
5. **内部类**

### 对象内存布局


### 属性/成员变量

- **基本介绍**
  1. 成员变量 = 属性 = 字段（field）
  2. 属性是类的组成部分，可以是基本数据类型也可以是引用数据类型
  3. 属性的定义语法同变量，访问修饰符 属性类型 属性名；
  4. 属性如果不赋值，则实例会有默认值，规则和数组类似

### 如何创建对象

- **先声明再创建**
  
  Cat cat；// 声明对象
  
  cat = new Cat（）；// 创建

- **直接创建**
  
  Cat cat = new Cat（）；

### 类与对象的内存分配机制

Person p1 = new Person;

Person p2 = p1;

上述代码就像数组的赋值，对于引用型变量只是把变量的地址传递，不是又给p2开辟了新的内存空间

- **java内存结构分析**
  1. 栈：一般存放基本数据类型（局部变量）
  2. 堆：存放对象、数组等
  3. 方法区：常量池、类加载信息

### 成员方法

- **方法的调用机制**
  
  
  当main函数执行到方法时，会在栈中再开辟一个新的独立空间来执行方法

- **成员方法的定义**
  
  public 返回数据类型 方法名（形参列表） {
  
  ​            语句；
  
  ​            return 返回值；// return语句不是必须
  
  }
  
  细节：
  
  1. 一个方法最多有一个返回值
  2. 返回类型可以为任意类型，包含基本类型和引用类型（数组、对象）
  3. 返回数据类型为void时可以不写return
  4. 同一个类中的方法可以直接调用，不同类的方法需要通过实例化对象来调用
  5. 基本类型形参的改变不会改变原来实参，但是引用类型形参传递的是指向内存的地址，所以改变内存，也会引起实参的改变

### 克隆对象

```java
public class cloneObject {
    public static void main(String[] args) {
        Person p1 = new Person("ymk", 23);
        p1.printInfo();
        Person p2 = p1.personCpy();
        p2.printInfo();
    }
}

class Person {
    String name;
    int age;
    int cnt = 0;

    Person(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    public void printInfo() {
        System.out.println(name + " " + age);
    }

    public Person personCpy() {
        Person cpyP = new Person(name, age);
        return cpyP;
    }
}
```

### 方法递归调用

- 打印问题
  
  ```java
  public class recusionMeasure {
      public static void main(String[] args) {
          T t = new T();
          t.test(5);
      }
  }
  
  class T {
      public void test(int num) {
          if (num > 0) {
              test(num-1);
          }
          System.out.println(num);
      }
  }
  ```
  
  上段代码输出为0到5，不断的递归，test(5)->test(4)->test(3)->test(2)->test(1)->test(0)，到0结束递归
  

- 阶乘问题
  
  ```java
  public class recusionMeasure {
      public static void main(String[] args) {
          T t = new T();
          System.out.println(t.factorial(5));
      }
  }
  
  class T {
      public int factorial(int num) {
          if (num == 1) {
              return 1;
          } else {
              return factorial(num-1)*num;
          }
      }
  }
  ```
  

- **递归的重要规则**
  
  1. 执行一个方法时，就创建一个新的受保护的独立栈空间
  
  2. 方法的局部变量时独立的，不会相互影响，但是引用类型变量则会产生影响

- **斐波那契数列**
  
  ```java
  public class recusionMeasure {
      public static void main(String[] args) {
          T t = new T();
          System.out.println(t.fabonachi(7));
      }
  }
  class T {
      // 斐波那契数列
      public int fabonachi(int n) {
          if (n == 1 || n == 2) {
              return 1;
          } else {
              return fabonachi(n-1) + fabonachi(n-2);
          }
      }
  }
  ```

- **方法重载**
  
  介绍：java允许同一个类中多个同名方法存在，但要求形参不一致
  
  ```java
  class OvLoad {
      public int m(int x, int y) {
          return x*y;
      }
      public int m(int x) {
          return x*x;
      }
      public void m(String info) {
          System.out.println(info);
      }
  }
  ```

- **可变参数**
  
  介绍：java允许将同一个类中多个**同名同功能**但**参数个数不同**的方法封装成一个方法
  
  ```java
  class OvLoad {
      public int add(int... nums) {    // 接收的nums为一个int数组
          int sum = 0;
          for (int num : nums) {
              sum += num;
          }
          return sum;
      }
  }
  ```

- **作用域**
  
  1. 主要的变量就是属性（成员变量）和局部变量
  
  2. 局部变量一般是指在方法中定义的变量
  
  3. 全局变量就是属性，作用域为整个类体
     
     局部变量作用域在代码块中
  
  4. 全局变量可以不赋值直接使用，因为有默认值，局部变量必须赋值后使用
  
  5. 全局变量可以加修饰符

### 构造器

介绍：构造器用于类的初始化

```java
class Person {
    String name;
    int age;
    int cnt = 0;

    Person(String name, int age) {    // 构造器可以不用写修饰符，不能写返回值
        this.name = name;
        this.age  = age;
    Person(String name) {        // 可以构造器重载
        this.name = name;
    }
}
```

细节：

1. 一个类可以定义多个构造器，即构造器重载
2. 创建对象时，系统自动调用该类的构造，构造器完成对象的初始化
3. 若不定义构造器，系统会提供默认的构造器，一旦定义了自己的构造，默认的就失效

### this关键字

介绍：java虚拟机给每个对象分配一个this，代表当前对象，存储了当前对象的地址

细节：

1. this关键字可以用来访问本类的属性，方法，构造器
2. this只能在类定义的方法中使用
3. this用于区分全局变量和局部变量
4. 用this访问构造器：this（参数列表）只能在构造器中使用

## 七、面向对象编程（中级）

### IDEA的使用

- **IDEA快捷键**
  
  1. 删除当前行    ctrl + d
  2. 复制当前行    ctrl + alt + ⬇
  3. 补全代码        alt + /
  4. 添加 / 取消注释    ctrl + /
  5. 自动导入对应包 alt + enter
  6. 快速格式化代码 ctrl + alt + L
  7. 生成构造器 alt + insert
  8. 查看继承关系 ctrl + H
  9. 快速跳转方法的定义 ctrl + B

- **模板 / 自定义模板**
  
  fie -> settings -> editor -> live templates -> 
  
  1. sout模板
  2. fori模板

### 包Package

- **包的三大作用**
  
  1. 区分名字相同的类
  2. 当类很多时，可以很好的管理类
  3. 控制访问范围

- **包基本语法**
  
  **package** com.ymk
  
  (关键字)    (包名) com是一级目录 ymk是二级目录

- **包的本质**
  
  创建不同的文件夹目录来保存类文件

- **命名规范**
  
  com.公司名.项目名.业务模块名

- **常用的包**
  
  1. java.lang    // 基本包，默认引入
  2. java.util    // util包，工具包
  3. java.net    // 网络包，做网络开发
  4. java.awt    // java界面开发

- **Java核心技术卷补充**
  
  1. 静态导入：
     
     ```java
     import static java.lang.System.*;// 导入了System类的所有静态方法和静态成员
     
     out.println("hello")
     ```

### 访问修饰符

- **基本介绍**
  
  控制方法和属性的访问权限
  
  1. public
  2. protected
  3. 默认级别
  4. private
  
  | 访问级别 | 访问控制修饰符   | 同类  | 同包  | 子类  | 不同包 |
  | ---- | --------- | --- | --- | --- | --- |
  | 公开   | public    | ✔   | ✔   | ✔   | ✔   |
  | 受保护  | protected | ✔   | ✔   | ✔   | ❌   |
  | 默认   | 没有修饰符     | ✔   | ✔   | ❌   | ❌   |
  | 私有   | private   | ✔   | ❌   | ❌   | ❌   |

- **细节**
  
  只有public和默认才能修饰类

### 面向对象特征 --- 封装

- **介绍**
  封装就是把抽象出的数据（属性）和对数据的操作（方法）封装在一起，数据被保护在内部，程序的其他部分只有通过被授权的操作（方法），才能对数据进行操作
- **好处**
  1. 隐藏实现细节
  2. 可以对数据进行验证
- **封装实现步骤**
  1. 将属性进行私有化private（除了该类的方法外，无法修改属性）
  2. 提供一个公共的set方法，来对属性进行判断赋值
  3. 提供一个公共的get方法，来获取属性的值

### 面向对象特征 --- 继承

- **介绍**
  
  当两个类中很多属性和方法都可以共用，这时候就需要继承。子类通过继承父类中的共有属性和方法

- **基本语法**
  
  class 子类 extends 父类 {
  
  }

- **细节**
  
  1. 子类继承了所有的属性和方法，但是私有属性不能在子类直接访问，要通过公共的方法去访问
  2. 子类必须调用父类的构造器完成父类的初始化
  3. 当创建子类对象时，不管使用子类的哪个构造器，默认情况下总会去调用父类的无参构造器，如果父类没有提供无参构造器，则必须在子类中用super去指定使用父类哪个构造器完成对父类的初始化工作
  4. 同样，如果不想用默认的父类构造器，也可以用super指定一个
  5. super在使用时，需要放在构造器第一行
  6. super（）和this（）不能存在同一个构造器
  7. java所有类都是object的子类
  8. 父类构造器的调用不仅仅调用定义的父类，将一直向上调用到object
  9. 一个子类只能继承一个父类

- **继承的本质分析**
  
  ```java
  public class Extend01 {
      public static void main(String[] args) {
          Son son = new Son();
          // 按照查找关系来返回属性
          // 1. 首先看子类是否有该属性
          // 2. 如果子类有这个属性，并且可以访问，则返回该信息（private修饰的属性是不能被子类访问的）
          // 3. 如果子类没有则向上面的父类查找，直到一个父类有该属性
          System.out.println(son.name);    // 三个类都有name属性，这里返回的是son的name
      }
  }
  class Grandpa {
      String name = "grandpa";
      String hobby = "travel";
  }
  class Father extends Grandpa{
      String name = "father";
      int age = 48;
  }
  class Son extends Father{
      String name = "son";
  }
  ```

### Super关键字

- **介绍**
  
  super代表父类的引用，用于访问父类的属性、方法、构造器

- **基本语法**
  
  1. 访问父类的属性 / 方法，但不能访问父类的private属性 / 方法：super.属性名 / 方法
  2. 访问父类的构造器：super（参数列表）

- **细节**
  
  1. 调用父类构造器的好处（分工明确，父类属性由父类初始化，子类属性由子类初始化）
  2. 当子类中有和父类重名的属性 / 方法时，要访问父类成员必须用super
  3. super的访问不限于父类，若使用super父类中没有，则会使用父类的父类，super的访问遵循**就近原则**

- **super和this的比较**
  
  | NO. | 区别点   | this                      | super                    |
  | --- | ----- | ------------------------- | ------------------------ |
  | 1   | 访问属性  | 访问本类中的属性，如果本类中没有则从父类中继续查找 | 访问父类中的属性，父类中没有则往父类中的父类查找 |
  | 2   | 调用方法  | 访问本类中的方法，如果本类中没有则从父类中继续查找 | 直接访问父类中的方法               |
  | 3   | 调用构造器 | 调用本类的构造器，必须放在构造器首行        | 调用父类构造器，必须放在首行           |
  | 4   | 特殊    | 表示当前对象                    | 子类中访问父类对象                |

### 方法重写 / 覆盖（override）

- **介绍**
  
  就是子类有一个和父类相同的方法

- **细节**
  
  1. 子类方法的名称，参数要和父类方法完全相同
  
  2. 子类方法的返回类型需和父类方法返回类型一样，或者是父类方法返回类型的子类，例如父类返回object，子类返回String
  
  3. 子类方法不能缩小父类方法的访问权限，即父类为public时子类不能是protected，默认，private
  
  4. **重载与重写的区别**
     
     | 名称         | 作用范围 | 方法名 | 形参列表   | 返回类型     | 修饰符          |
     | ---------- | ---- | --- | ------ | -------- | ------------ |
     | 重载overload | 本类   | 相同  | 不能完全一样 | 无要求      | 无要求          |
     | 重写override | 父子类  | 相同  | 相同     | 相同或父子类关系 | 子类不能缩小父类访问权限 |

### 面向对象特征 --- 多态

- **介绍**
  
  方法和对象具有多种形态，多态是建立在封装和继承的基础上的

- **多态的具体体现**
  
  1. 方法的多态
     
     重写和重载就体现了方法的多态
  
  2. 对象的多态（核心）
     
     ```java
     public class Poly01 {
         public static void main(String[] args) {
             Animal animal = new Dog();    // 一个对象的编译类型和运行类型可以不一致，等号左边是编译类型，右边是运行类型
             animal.cry();                // 输出为Woo，会优先执行运行类型中的方法，若没有则会执行编译类型中的方法
             animal = new Cat();            // 运行类型可以改变，但编译类型不能改变
             animal.cry();                // 输出为Meow
         }
     }
     
     class Animal {
         public void cry() {
             System.out.println("谁在叫");
         }
     }
     
     class Dog extends Animal{
         public void cry() {
             System.out.println("Woo!");
         }
     }
     
     class Cat extends Animal{
         public void cry() {
             System.out.println("Meow!");
         }
     }
     ```
  
  3. 多态的向上转型
     
     本质：父类引用指向子类对象
     
     语法：父类类型 引用名 = new 子类名（）；
     
     特点：可以调用父类中的所有成员，不能调用子类中的特有成员
  
  4. 多态的向下转型
     语法：子类类型 引用名 = （子类类型）父类引用
     
     要求父类引用必须指向当前子类类型
     
     可以调用子类中所有成员
     
     ```java
     public class Poly01 {
         public static void main(String[] args) {
             Animal animal = new Dog();
             Dog dog = (Dog)animal;    // 强制类型转换
         }
     }
     ```
  
  5. 属性重写问题
     
     属性与方法不同，属性没有重写一说
     
     ```java
     public class Poly01 {
         public static void main(String[] args) {
             Base base = new Sub();
             System.out.println(base.count);    // 输出Base类型的count，属性的输出看其编译类型
         }
     }
     
     class Base {
         int count = 10;
     }
     
     class Sub extends Base {
         int count = 20;
     }
     ```

### java的动态绑定机制（非常重要）

```java
public class DynamicBind {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.sum());    // 1. 当调用对象方法时，该方法会和对象的运行类型绑定
        System.out.println(a.sum1());    // 2. 当调用对象属性时，没有动态绑定机制，哪里声明哪里使用
    }
}

class A {
    public int i = 10;

    public int sum() {
        return geiI() + 10;
    }

    public int sum1() {
        return i + 10;
    }

    public int geiI() {
        return i;
    }
}

class B extends A {
    public int i = 20;

//    public int sum() {
//        return i + 20;
//    }

    public int sum1() {
        return i + 10;
    }

    public int geiI() {
        return i;
    }
}
```

### 多态的应用 --- 多态数组

- **介绍**
  
  数组的定义类型为父类类型，里面保存的实际元素为子类类型

- **示例**
  
  ```java
  // test.java
  public class test {
      public static void main(String[] args) {
          // 多态数组
          Person[] persons = new Person[5];
          persons[0] = new Person("jack", 20);
          persons[1] = new Student("rose", 18, 100);
          persons[2] = new Teacher("smith", 24, 6000);
          persons[3] = new Student("nancy", 19, 87);
          persons[4] = new Teacher("david", 23, 20000);
          // 循环调用动态数组
          for (Person person : persons) {
              person.say();   // 动态绑定机制，会按照运行的类型动态地调用方法
          }
      }
  }
  
  // Person.java
  public class Person {
      private String name;
      private int age;
  
      public Person(String name, int age) {
          this.name = name;
          this.age = age;
      }
      public String getName() {
          return name;
      }
      public void setName(String name) {
          this.name = name;
      }
      public int getAge() {
          return age;
      }
      public void setAge(int age) {
          this.age = age;
      }
      public void say() {
          System.out.println("name: " + name);
          System.out.println("age: " + age);
      }
  }
  
  // Student.java
  public class Student extends Person{
      private int score;
  
      public Student(String name, int age, int score) {
          super(name, age);
          this.score = score;
      }
      public int getScore() {
          return score;
      }
      public void setScore(int score) {
          this.score = score;
      }
      @Override
      public void say() {
          super.say();
          System.out.println("score: " + score);
      }
  }
  
  // Teacher.java
  public class Teacher extends Person{
      private int salary;
  
      public Teacher(String name, int age, int salary) {
          super(name, age);
          this.salary = salary;
      }
      public int getSalary() {
          return salary;
      }
      public void setSalary(int salary) {
          this.salary = salary;
      }
      @Override
      public void say() {
          super.say();
          System.out.println("salary: " + salary);
      }
  }
  ```

### 多态的应用 --- 多态参数

- **介绍**
  
  方法定义的形参为父类类型，形参可以为子类类型

### Object类详解

- **equles方法**
  
  - == 与 equles 对比
    
    1. == 判断基本类型，表示判断对象的值是否相等
    2. == 判断引用类型，表示判断对象的值是否相等
  
  - equles方法只能用来判断引用类型，默认判断对象地址是否相等，子类中往往重写该方法
    
    ```java
    // 源代码中object类中的equles方法
    public boolean equles(Object obj) {
        return (this == obj)
    }
    // Integer中的equles方法
    public Boolean equles(Object obj) {
        if (obj instanceof Integer) {
            return value == ((Integer)obj).intvalue();
        }
    }
    ```

- **hashcode方法**
  
  1. 提高哈希结构容器的效率
  2. 两个引用，如果指向同一个对象，那么哈希值肯定是一样的；如果指向不同对象，那么哈希值肯定不一样
  3. 哈希值主要是根据地址号来的，但不完全等价于地址
  4. 后面集合中，会重写hashcode方法

- **toString方法**
  
  - **介绍**
    
    默认返回：全类名 + @ + 哈希值的十六进制，子类往往重写toString方法，用于返回对象的属性类型
    
    ```java
    // object类的toString方法
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
    ```
  
  - **细节**
    
    1. 重写toString方法打印该对象和拼接对象时，都会自动调用该对象的toString形式
    2. 直接输出一个对象时toString方法会默认调用

- **finalize方法**
  
  1. 当对象被回收时，系统自动调用该对象的finalize方法。子类可以重写该方法，做一些**释放资源**的操作。
  2. 什么时候被回收：当某个对象没有任何引用时，则**jvm**就认为该对象是一个垃圾对象，就会使用垃圾回收机制来销毁该对象。
  3. 垃圾回收机制的调用，是由系统来决定的，也可以由**system.gc()** 主动触发垃圾回收机制

## 八、项目 ：房屋出租系统

### 项目需求

实现基于文本界面的房屋出租系统，能够实现对房屋信息的添加、修改、删除（用数组实现），并能够打印房屋明细表

- **主菜单**
  
  ——————房屋出租系统——————
  
  1. 新增房源
  2. 查找房源
  3. 删除房源
  4. 修改房屋信息
  5. 房屋列表
  6. 退出

- **查找房源**
  
  请选择（1-6）：2
  
  ————————查找房屋————————
  
  请输入你要查找的id：1
  
  1    jack    118    海淀区    3000    未出租
  
  ————————查找房屋————————
  
  请输入你要查找的id：10
  
  ————————没有该房屋———————

- **删除房源**
  
  ————————删除房屋————————
  
  请选择房屋编号（-1退出）：1
  
  确认是否删除（Y/N）：Y
  
  ————————删除完成————————

- **修改房源**（如果不希望修改直接回车即可）
  
  ————————修改客户————————
  
  请选择修改房屋编号（-1退出）：2
  
  姓名（king）：（None）
  
  电话（112）：（116）
  
  地址（朝阳区）：（昌平区）
  
  租金（2000）：5000
  
  状态（未出租）：已出租
  
  ————————修改完成————————

- **房屋列表**
  
  ————————房屋列表————————
  
  编号        房主        电话        地址        月租        状态（未出租/已出租）
  
  2             none       116         昌平区    5000        已出租

### 程序框架设计

- **HouseView.java**（界面）
  1. 显示界面
  2. 接收其他用户的输入
  3. 调用其他类完成对房屋信息的各种操作
- **HouseService.java**（业务）
  1. 响应HouseView的调用
  2. 完成对房屋信息的各种操作（增删改查）
- **House.java**（model）
  1. 一个House对象表示一个房屋信息
- **HouseRentApp.java**（程序入口）

## 九、面向对象编程（高级）

### 类变量和类方法

- 类变量
  
  1. 什么是类变量
     
     类变量就叫静态变量，该类所有对象共享的变量
  
  2. 如何定义类变量
     
     加上static
     
     jdk7以上的版本，静态域存储于定义类型的class对象中，class对象如同堆中其他对象一样存在GC堆中
  
  3. 如何访问类变量
     
     推荐使用：类名.类变量名
  
  ```java
  public class ChildGame {
      public static void main(String[] args) {
          Child child1 = new Child("jack");
          Child child2 = new Child("rose");
          child1.join();
          System.out.println(child1.count);    // 输出都为1
          System.out.println(child2.count);
          child2.join();
          System.out.println(child1.count);    // 输出都为2
          System.out.println(child2.count);
      }
  }
  
  class Child {
      private String name;
      public static int count = 0;    // 类静态变量，所有对象共享
      public Child() {}
      public Child(String name) {
          this.name = name;
      }
      public void join() {
          System.out.println(name + "加入了游戏.");
          count ++;
      }
  }
  ```

- 类方法
  
  1. 类方法中无this参数
  2. 类方法可以通过类名调用，也可以通过对象名调用

- 细节
  
  1. 静态方法只能访问静态成员
  2. 非静态方法可以访问所有成员
  3. 在编写代码时，仍要遵守访问权限规则

### 理解main方法语法

- 深入理解main方法：public static void main（String[] args）{}
  
  1. java虚拟机在调用main方法，所以该方法的访问权限必须是public
  
  2. static可以使虚拟机在执行main方法时不必创建对象
  
  3. String[] 数组的参数在执行java命令时传递
     
  
  4. main方法与一般static方法相同，可以调用类的静态成员，不能调用非静态成员

### 代码块

- 基本介绍
  
  类成员，类似于方法，但与方法不同没有方法名，没有返回，没有参数，只有方法体，而且不显示调用，只有加载类或创建对象时隐式调用

- 基本语法
  
  [修饰符] { 代码 }；

- 注意
  
  1. 修饰符可选，只能写static
  2. 有静态代码块和普通代码块
  3. ；号可以省略

- 细节
  
  1. static代码块作用是对类进行初始化，随着类的加载而执行，只会执行一次
     
     普通代码块，每创建一个对象就会执行一次
  
  2. 类什么时候被加载
     
     - 创建对象实例时（new）
     - 创建子类对象实例，父类也会被加载
     - 使用类的静态成员时
  
  3. 普通的代码块，在创建对象实例时，会被隐式的调用。每创建一次就会调用一次
     
     如果只是使用类的静态成员，不会调用
     
     ```java
     public class CodeBlockDetail {
         public static void main(String[] args) {
             AA.hi();    // 输出为
                         // AA的静态代码块1被执行
                        // hi
         }
     }
     class AA {
         // 静态代码块
         static { System.out.println("AA的静态代码块1被执行"); }
         // 普通代码块
         { System.out.println("AA的普通代码块1被执行"); }
         // 类静态方法
         public static void hi() { System.out.println("hi"); }
     }
     ```
  
  4. 创建一个对象时，在一个类中的调用顺序是：
     
     1. 调用静态代码块和静态属性初始化（初始化顺序取决于定义顺序）
     2. 调用普通代码块和普通属性初始化（初始化顺序取决于定义顺序）
     3. 调用构造方法
     
     ```java
     public class CodeBlockDetail {
         public static void main(String[] args) {
             AA aa = new AA();
         }
     }
     class AA {
         public AA() {
             System.out.println("AA的构造器");
         }
         // 静态代码块
         static {
             System.out.println("AA的静态代码块1被执行");
         }
         static {
             System.out.println("AA的静态代码块2被执行");
         }
         // 普通代码块
         {
             System.out.println("AA的普通代码块1被执行");
         }
         {
             System.out.println("AA的普通代码块2被执行");
         }
         // 类静态方法
         public static void hi() {
             System.out.println("hi");
         }
     }
     // 输出
     // AA的静态代码块1被执行
     // AA的静态代码块2被执行
     // AA的普通代码块1被执行
     // AA的普通代码块2被执行
     // AA的构造器
     ```
  
  5. 构造器的最前面隐含了super（）和调用普通代码块
     
     ```java
     class A {
         public A() {
             super();
             // 调用普通代码块
             System.out.println("OK");
         }
     }
     ```
  
  6. 创建一个子类对象时，初始化顺序如下
     
     1. 父类的静态代码块和静态属性（初始化顺序取决于定义顺序）
     2. 子类的静态代码块和静态属性（初始化顺序取决于定义顺序）
     3. 父类的普通代码块和普通属性（初始化顺序取决于定义顺序）
     4. 父类的构造方法
     5. 子类的普通代码块和普通属性（初始化顺序取决于定义顺序）
     6. 子类的构造方法
  
  7. 静态代码块只能调用静态成员，普通代码块可以调用任意成员

### 单例设计模式

- **什么是单例模式**（单个实例）
  
  1. 采取一定方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且只提供一个取得对象实例的方法
  2. 单例模式有两种：1）饿汉式 2）懒汉式

- **单例模式应用实例**
  
  1. 构造器私有化 =》防止直接new对象
  2. 类的内部创建对象
  3. 向外暴露一个静态的公共方法
  4. 代码实现
  
  ```java
  // 饿汉式
  public class SingleTon01 {
      public static void main(String[] args) {
          GirlFriend instance = GirlFriend.getInstance();
          GirlFriend instance2 = GirlFriend.getInstance();
          // 两个instance都指向同一个实例
          System.out.println(instance);
          System.out.println(instance2);
      }
  }
  
  class GirlFriend
  {
      private String name;
      // 类的内部创建对象
      private static GirlFriend only = new GirlFriend("ztt");
      // 构造器私有化
      private GirlFriend(String name) {
          this.name = name;
      }
      // 向外暴露一个静态的公共方法
      public static GirlFriend getInstance() {
          return only;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  }
  ```
  
  1. 构造器私有化
  2. 定义一个static静态属性对象
  3. 提供一个public的static方法，可以返回一个Cat对象（若对象为null则创建一个对象）
  
  ```java
  public class SingleTon02 {
      public static void main(String[] args) {
          Cat instance = Cat.getInstance();
          Cat instance2 = Cat.getInstance();// 两次只运行了一次构造器
      }
  }
  
  class Cat
  {
      private String name;
  
      static Cat cat;
  
      private Cat(String name) {
          System.out.println("运行构造器");
          this.name = name;
      }
  
      public static Cat getInstance() {
          if (cat == null) {
              cat = new Cat("ztt");
          }
          return cat;
      }
  }
  ```

### final关键字

- **基本介绍**
  
  1. 当不希望类被继承时，可以用final修饰
  2. 当不希望父类的某个方法被子类重写时，可以用final关键字修饰
  3. 当不希望类的某个属性被改时，可以用final修饰
  4. 当不希望某个局部变量被修改时，可以用final修饰

- **final使用细节**
  
  1. final修饰的属性又叫常量，一般用XX_XX_XX来命名
  
  2. final修饰的属性在定义时，必须赋初值，并且以后不能再修改
     赋值可以在定义时，构造器中，或代码块中
  
  3. 如果final修饰的属性是静态的，那么初始化位置只能是定义时或静态代码块中，不能在构造器中赋值
  
  4. final + static 搭配使用不会导致类加载
     
     ```java
     public class FinalDetail02 {
         public static void main(String[] args) {
             System.out.println(A.num);
         }
     }
     
     class A {
     //    public static int num = 999;    // 输出该属性会导致类加载，静态代码块被执行
         public static final int num = 998;    // final修饰后就不会导致类加载，只打印998
         static {
             System.out.println("A的静态代码块被执行");
         }
     }
     ```

### 抽象类

- **抽象类的介绍**
  
  1. 用abstract关键字来修饰类，这个类就是抽象类
  2. 用abstract关键字来修饰方法，这个类就是抽象方法

- **抽象类使用细节**
  
  1. 抽象类不一定包含抽象方法，但是一个类包含抽象方法则一定要声明为抽象类
  2. abstract只能修饰类和方法，不能修饰属性
  3. 如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，否则该类也得声明为抽象类

- **抽象模板**
  使用抽象模板来计算任意一段代码的运行时间
  
  ```java
  public class Template01 {
      public static void main(String[] args) {
          new TestTemp().calcTimes();
      }
  }
  // 使用抽象模板来计算任意一段代码的运行时间
  abstract class Template {
      public abstract void code();
      //计算一段代码的运行时间
      public void calcTimes() {
          long startTime = System.currentTimeMillis();
          code();
          long endTime = System.currentTimeMillis();
          System.out.println("耗时：" + (endTime-startTime));
      }
  }
  
  class TestTemp extends Template {
      public void code() {
          long num = 0;
          for (long i = 1; i <= 8000000; i++) {
              num += i;
          }
      }
  }
  ```

### 接口

- **基本介绍**
  
  给出一些没有实现的方法，封装到一起，到某个类要使用的时候，再根据具体情况把这些方法写出来

- **语法**
  
  interface 接口名 {
  
  ​    // 属性
  
  ​    // 方法
  
  }
  
  class 类名 implements 接口 {
  
  ​    // 自己的属性
  
  ​    // 自己的方法
  
  ​    // 必须实现接口的抽象方法
  
  }
  
  ```java
  // Interface01.java
  public class Interface01 {
      public static void main(String[] args) {
          Computer pc = new Computer();
          pc.work(new Camera());
      }
  }
  
  // USBInterface.java
  public interface USBInterface {
      public void start();    // 接口中abstract可以省略
      public void stop();
  }
  
  // Camera.java
  public class Camera implements USBInterface{
      @Override
      public void start() {
          System.out.println("相机开始工作");
      }
  
      @Override
      public void stop() {
          System.out.println("相机停止工作");
      }
  }
  
  //Computer.java
  public class Computer {
      public void work(USBInterface usbInterface) {
          usbInterface.start();
          usbInterface.stop();
      }
  }
  ```

- **细节**
  
  1. 接口不能被实例化
  2. 接口中的所有方法是public方法，接口中的抽象方法可以不写abstract
  3. 一个普通类实现接口就必须将该接口的所有方法都实现；抽象类可以不用
  4. 一个类可以同时实现**多个**接口
  5. 接口中的属性是final + static的
  6. 接口不能继承类，但可以继承接口
  7. 接口的修饰符只能用public或默认

- **接口VS继承**
  
  1. 子类继承父类就自动拥有父类的功能
  2. 如果子类需要扩展功能，可以通过接口的方式扩展

- **接口的多态**
  
  ```java
  public class InterfacePolyPara {
      public static void main(String[] args) {
          IF0 if0 = new Cat();    // 像类一样的多态
          IF0 if1 = new Dog();
      }
  }
  
  interface IF0 {}
  class Cat implements IF0 {}
  class Dog implements IF0 {}
  ```

- **接口多态传递**
  
  ```java
  public class InterfacePolyPass {
      public static void main(String[] args) {
          IH1 ih1 = new Teacher();
          IH0 ih0 = new Teacher();    // 接口的传递性让Teacher类也实现了IH0接口
      }
  }
  
  interface IH0 {}
  interface IH1 extends IH0{}
  
  class Teacher implements IH1 {}
  ```

- **练习**
  
  ```java
  interface A {
      int x = 0;
  }
  class B {
      int x = 1;
  }
  class C extends B implements A {
      public void printX() {
          // 访问接口的x就用A.x
          // 访问父类的x就用super.x
          System.out.println(A.x);
          System.out.println(super.x);
      }
      public static void main(String[] args) {
          new C().printX();
      }
  }
  ```

- **抽象类与接口的区别**
  

- **Java核心技术卷补充**
  
  1. default方法冲突
     1. 超类的默认方法优先
     2. 如果同时implements的两个接口有同名default方法，需要手动选择方法
     3. 如果继承的超类和接口中有同名默认方法，超类的方法优先

### 内部类

- **介绍**
  
  一个类的内部嵌套了一个类

- **语法**
  
  class Outer {    // 外部类
  
  ​        class Inner { }    // 内部类
  
  }
  
  class other { }    // 其他类

- **内部类的分类**
  
  1. 定义在外部类的局部位置上（比如方法内）
     1. 局部内部类（有类名）
     2. 匿名内部类（没有类名）
  2. 定义在外部类的成员位置上
     1. 成员内部类（没有static）
     2. 静态内部类（有static）

- **局部内部类的使用**
  
  1. 可以直接访问外部类的所有成员
  
  2. 不能添加访问修饰符，可以使用final修饰符
  
  3. 作用域仅在定义的局部
  
  4. 局部类访问外部类可以直接访问
  
  5. 外部类访问局部类要先创建局部类对象再访问其成员
     
     ```java
     class Outer1 {
         private int n1 = 1;
     
         public void f1() {
             class Inner01 {
                 private void f2() {
                     System.out.println("外部类n1 = " + Outer1.this.n1);   // 可以直接访问外部类的所有成员
                     System.out.println("内部类n1 = " + n1);   // 成员名重名时采用就近原则，优先本类的n1
                     f3();
                 }
             }
             final class Inner02 extends Inner01 {}  // 不能添加访问修饰符，可以使用final修饰符
             Inner01 inner02 = new Inner02();    // 外部类访问局部类要先创建局部类对象再访问其成员
             inner02.f2();
         }
     
         public void f3() {
             System.out.println("外部类f3()");
         }
     }
     ```
  
  6. 外部其他类不能访问局部内部类（局部内部类是局部变量）

- **匿名内部类的使用**
  
  1. 匿名内部类既是一个类的定义，又是一个类的对象
  
  ```java
  public class AnonymousInner {
      public static void main(String[] args) {
          // 基于接口的匿名内部类，编译类型IA，运行类型是匿名内部类
          IA cat = new IA() {     // 匿名内部类，相当于下方注释的Cat类
              @Override
              public void cry() {
                  System.out.println("Meow");
              }
          };
          cat.cry();
          IA dog = new IA() {
              @Override
              public void cry() {
                  System.out.println("Woo");
              }
          };
          dog.cry();
          System.out.println("匿名类名称：" + cat.getClass());    // 输出为：匿名类名称：class ymkedu.oop.Innerclass_.AnonymousInner$1
                                                              // 匿名类名称为外部类名称加个$1
          System.out.println("匿名类名称：" + dog.getClass());
          // 基于类的匿名内部类
          Father father = new Father("Father匿名内部类") {
              @Override
              public void hello() {
                  System.out.println("hello Father匿名内部类");
                  super.hello();
              }
          };
          father.hello();
          // 基于抽象类的匿名内部类与普通类的区别是必须要重写抽象方法
      }
  }
  
  interface IA {
      public void cry();
  }
  
  class Father {
      private String name;
  
      public Father(String name) {
          this.name = name;
      }
      public void hello() {
          System.out.println("hello Father");
      }
  }
  
  //class Cat implements IA {
  //    @Override
  //    public void cry() {
  //        System.out.println("Meow");
  //    }
  //}
  ```

- **成员内部类**
  
  成员内部类定义在外部类的成员位置，没有static修饰
  
  1. 可以直接访问所有成员
  2. 可以添加访问修饰符
  3. 作用域在整个类中，外部类需要先创建对象再调用

- **静态内部类**
  
  比成员内部类多个static
  
  1. 可以访问外部类的所有静态成员
  2. 可以添加访问修饰符
  3. 作用域整个类

### 代理（proxy）

- **介绍**
  
  利用代理可以在运行时创建实现一组给定接口的新类。只有在编译时期无法确定需要实现哪个接口时才有必要使用代理

- **静态代理**
  
  通过静态代理来实现功能增强
  
  ```java
  public interface UserService {
      public void select();   
      public void update();
  }
  
  public class UserServiceImpl implements UserService {  
      public void select() {  
          System.out.println("查询 selectById");
      }
      public void update() {
          System.out.println("更新 update");
      }
  }
  // 增强的代理
  public class UserServiceProxy implements UserService {
      private UserService target; // 被代理的对象
  
      public UserServiceProxy(UserService target) {
          this.target = target;
      }
      public void select() {
          before();
          target.select();    // 这里才实际调用真实主题角色的方法
          after();
      }
      public void update() {
          before();
          target.update();    // 这里才实际调用真实主题角色的方法
          after();
      }
  
      private void before() {     // 在执行方法之前执行
          System.out.println(String.format("log start time [%s] ", new Date()));
      }
      private void after() {      // 在执行方法之后执行
          System.out.println(String.format("log end time [%s] ", new Date()));
      }
  }
  
  public class Client1 {
      public static void main(String[] args) {
          UserService userServiceImpl = new UserServiceImpl();
          UserService proxy = new UserServiceProxy(userServiceImpl);
  
          proxy.select();
          proxy.update();
      }
  }
  ```

- **静态代理的缺点**
  
  1. 当需要代理多个类的时候，由于代理对象要实现与目标对象一致的接口，有两种方式：
     
     - 只维护一个代理类，由这个代理类实现多个接口，但是这样就导致**代理类过于庞大**
     
     - 新建多个代理类，每个目标对象对应一个代理类，但是这样会**产生过多的代理类**
  
  2. 当接口需要增加、删除、修改方法的时候，目标对象与代理类都要同时修改，**不易维护。**

- **动态代理介绍**
  
  Java虚拟机**类加载过程**主要分为五个阶段：加载、验证、准备、解析、初始化。其中加载阶段需要完成以下3件事情：
  
  1. 通过一个类的全限定名来获取定义此类的二进制字节流
  2. 将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构
  3. 在内存中生成一个代表这个类的 `java.lang.Class` 对象，作为方法区这个类的各种数据访问入口
  
  为了让生成的代理类与目标对象（真实主题角色）保持一致性，从现在开始将介绍以下两种最常见的方式：
  
  1. 通过实现接口的方式 -> JDK动态代理
  2. 通过继承类的方式 -> CGLIB动态代理

- **JDK动态代理**
  
  利用反射机制，实现 InvocationHandler 接口，重写invoke方法
  
  ```java
  import java.lang.reflect.InvocationHandler;
  import java.lang.reflect.Method;
  import java.util.Date;
  
  public interface UserService {
      public void select();   
      public void update();
  }
  
  public class UserServiceImpl implements UserService {  
      public void select() {  
          System.out.println("查询 selectById");
      }
      public void update() {
          System.out.println("更新 update");
      }
  }
  
  public class LogHandler implements InvocationHandler {
      Object target;  // 被代理的对象，实际的方法执行者
  
      public LogHandler(Object target) {
          this.target = target;
      }
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
          before();
          Object result = method.invoke(target, args);  // 调用 target 的 method 方法
          after();
          return result;  // 返回方法的执行结果
      }
      // 调用invoke方法之前执行
      private void before() {
          System.out.println(String.format("log start time [%s] ", new Date()));
      }
      // 调用invoke方法之后执行
      private void after() {
          System.out.println(String.format("log end time [%s] ", new Date()));
      }
  }
  // 调用代理类
  public class Client2 {
      public static void main(String[] args) throws IllegalAccessException, InstantiationException {
          // 设置变量可以保存动态代理类，默认名称以 $Proxy0 格式命名
          // System.getProperties().setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
          // 1. 创建被代理的对象，UserService接口的实现类
          UserServiceImpl userServiceImpl = new UserServiceImpl();
          // 2. 获取对应的 ClassLoader
          ClassLoader classLoader = userServiceImpl.getClass().getClassLoader();
          // 3. 获取所有接口的Class，这里的UserServiceImpl只实现了一个接口UserService，
          Class[] interfaces = userServiceImpl.getClass().getInterfaces();
          // 4. 创建一个将传给代理类的调用请求处理器，处理所有的代理对象上的方法调用
          //     这里创建的是一个自定义的日志处理器，须传入实际的执行对象 userServiceImpl
          InvocationHandler logHandler = new LogHandler(userServiceImpl);
          /*
             5.根据上面提供的信息，创建代理对象 在这个过程中，
                 a.JDK会通过根据传入的参数信息动态地在内存中创建和.class 文件等同的字节码
                 b.然后根据相应的字节码转换成对应的class，
                 c.然后调用newInstance()创建代理实例
           */
          UserService proxy = (UserService) Proxy.newProxyInstance(classLoader, interfaces, logHandler);
          // 调用代理的方法
          proxy.select();
          proxy.update();
  
          // 保存JDK动态代理生成的代理类，类名保存为 UserServiceProxy
          // ProxyUtils.generateClassFile(userServiceImpl.getClass(), "UserServiceProxy");
      }
  }
  ```

### 枚举和注解

#### 枚举

- **介绍**
  
  ```java
  public class Enum01 {
      public static void main(String[] args) {
          System.out.println(Season.SPRING);
      }
  }
  
  enum Season {
      SPRING("春天", "温暖"), SUMMER("夏天", "炎热"),
      AUTUMN("秋天", "凉爽"), WINTER("冬天", "寒冷");
      private String name;
      private String desc;
      // 枚举类型构造器默认是private，防止修改内部属性
      Season(String name, String desc) {
          this.name = name;
          this.desc = desc;
      }
      // 使用枚举类型就不需要
  //    public static Season Spring = new Season("春天", "温暖");
  //    public static Season Summer = new Season("夏天", "炎热");
  //    public static Season Autumn = new Season("秋天", "凉爽");
  //    public static Season Winter = new Season("冬天", "寒冷");
  
      public String getDesc() {
          return desc;
      }
  
      public void setDesc(String desc) {
          this.desc = desc;
      }
  }
  ```

- **细节**
  
  1. 使用enum关键字的类默认会继承Enum类（包含Enum类的一些属性和方法）
  2. 枚举对象必须放在类的第一行
  3. 使用enum关键字之后就不能再继承其他类了，因为隐式的继承了Enum类，java是单继承机制
  4. 枚举类也可以实现接口

- **枚举类常用方法**
  
  1. toString：Enum类已经重写过，默认返回对象的属性（可以重写该方法）
  2. name：得到当前枚举对象的名称，不常用，一般用toString
  3. ordinal：得到当前常量的次序
  4. compareTo：可以比较两个枚举常量的大小
  5. clone：枚举类型不能clone
  6. valueOf：传递枚举对象和枚举常量名称给静态方法valueOf，可以得到对应枚举常量
  7. equals
  8. hashCode
  9. getDeclaringClass：得到枚举常量所属类型的Class对象

#### 注解

- **注解（Annotation）介绍**
  
  使用时要加@符号，并把注解当作一个修饰后面程序的修饰符

- **三个基本的注解**
  
  1. @Override：修饰一个方法，表示重写父类方法
  2. @Deprecated：表示某个程序元素（类、方法），已过时
  3. @SupressWarnings：抑制编译器警告 ，写入你不希望显示的警告信息

- **JDK的元注解**
  
  - 基本介绍
    
    元注解用于修饰其他注解
  
  - 元注解种类
    
    1. @Retention：指定注解的作用范围（Source，Class，Runtime）
    2. @Target：指定注解可以在哪些地方使用（类，方法）
    3. @Documented：指定该注解是否会在javadoc上体现
    4. @Inherited：子类会继承父类注解

## 十、异常

### 异常介绍

- **基本概念**
  
  Java中，将程序执行中发生的不正常情况称为异常（不是语法错误和逻辑错误）
  
  异常对象都派生于Throwable类

- **异常分类**
  
  1. Error：java虚拟机无法解决的严重问题（JVM系统内部错误，资源耗尽），不能忽视
  2. Exception：其他因为编程错误或偶然的外在因素导致的一般性问题，派生出RuntimeException和IOException
  
  RuntimeException是非检查型异常是可以预测的，其余Exception是不可预测的异常

- **常见运行时异常**
  
  1. NullPointerException空指针异常
     
     ```java
     String name = null;
     System.out.println(name.length());
     ```
  
  2. ArithmeticException数学运算异常
     
     ```java
     int num1 = 10, num2 = 0;
     int res = num1 / num2;    // 整除0
     ```
  
  3. ArrayIndexOutOfBoundsException数组下标越界异常
     
     ```java
     int[] array = new int[5];
     int m = array[-1];    // 非法索引访问数组
     ```
  
  4. ClassCastException类型转换异常
     
     ```java
     class A {};
     class B extends A {};
     class C extends A {};
     A b = new B();
     C c = (C)b;        // 强制将代码转换为不是实例的子类
     ```
  
  5. NumberFormatException数字格式不正确异常
     
     ```java
     String name = "yanmingkui";
     int num = Integer.parseInt(name);    // 把非数字字符串转换为int
     ```

- **编译异常**
  
  编译异常是在编译期间必须处理的异常，否则不能通过编译

- **异常处理机制**
  
  ```java
  try {
      // 代码可能有异常
  } catch(Exception e) {
      // 捕获到异常
      // 得到异常对象后，程序员自己处理
  } finally {
      // 不管try代码块是否有异常，始终要执行finally
      // 通常将释放资源的代码放在finally
  }
  ```

- **try—catch细节**
  
  1. 如果异常发生了，则异常后面的代码不会执行，直接进到catch块
  
  2. 如果异常没有发生，则顺序执行try代码块，不会进入catch
  
  3. 要求子类异常写在前面，父类异常写在后面
     
     ```java
     try {
         // 代码
     } catch (NullPointerException e) {
     
     } catch (ArithmeticException e) {
     
     } catch (Exception e) {    // 父类写前面，后面的子类catch就没意义了    
     
     }
     ```

### 抛出异常

- **声明检查型异常**
  
  ```java
  public FileInputStream(String name) throws FileNotFoundException // 可以抛出多个异常
  ```
  
  表明这个构造器如果正常运行会产生一个FileInputStream对象，若出错则会抛出一个FileNotFoundException异常
  
  下面两种情况需要使用throws方法来抛出异常
  
  1. 调用了一个抛出检查型异常的方法，例如FileInputStream构造器
  2. 检测到一个错误，并利用throw语句抛出一个检查型异常

## 十一、常用类

### 包装类

- **包装类的分类**（Wrapper）
  
  1. 针对八种基本定义相应的引用类型
  2. 有了类的特点，就可以调用类中的方法

- **包装类和基本数据的转化**
  
  1. jdk5前是手动装箱和手动拆箱
     
     ```java
     public class WrapperType {
         public static void main(String[] args) {
             // 手动装箱
             int i = 10;
             Integer i1 = new Integer(i);
             // 或者
             Integer i2 = Integer.valueOf(i);
             // 手动拆箱
             Integer j = new Integer(19);
             int j1 = j.intValue();
         }
     }
     ```
  
  2. jdk5以后是自动装箱方式（调用valueOf）
     
     ```java
     public class WrapperType {
         public static void main(String[] args) {
             // 自动装箱
             int m = 10;
             Integer m2 = m;        // 用的是valueOf
             // 自动拆箱
             Integer n2 = new Integer(18);
             int n = n2;
         }
     }
     ```
  
  3. ```java
     public class WrapperExercise01 {
         public static void main(String[] args) {
             // 三元运算符 默认按两者中精度最高的类型来输出
             Object obj = true ? new Integer(1) : new Double(2.0);
             System.out.println(obj);// 输出1.0
         }
     }
     ```

### Integer类

- **面试题（Integer创建机制）**
  
  ```java
  // 自动装箱用的valueOf函数
  public static Integer valueOf(int i) {
          if (i >= IntegerCache.low && i <= IntegerCache.high)
              return IntegerCache.cache[i + (-IntegerCache.low)];
          return new Integer(i);
  }
  // main函数
  public class WrapperExercise02 {
      public static void main(String[] args) {
          Integer i = new Integer(1);
          Integer j = new Integer(1);
          System.out.println(i == j);    
          // false，因为==比对的是是不是同一个类变量
  
          Integer m = 1;
          Integer n = 1;
          System.out.println(m == n);    
          // true，根据上面的valueOf函数所示，1在-127和128直接return缓存区的类
  
          Integer x = 128;
          Integer y = 128;
          System.out.println(x == y);    
          // false，128在范围外，根据valueOf函数，所以会new一个类变量
      }
  }
  ```

### String类

- **String类的理解和创建对象**
  
  1. String对象用于保存字符串
  2. 字符串常量：“你好”， “12.97”
  3. 字符串的字符使用Unicode编码，一个字符占两个字节
  4. String类较常用的构造器
     - String s1 = new String（）；
     - String s2 = new String（String original）；
     - String s3 = new String（char[] a);
     - String s4 = new String（char[] a,  int startIndex,  int count）；
  5. String类实现了Serializable接口，串行化，可以在网络传输
  6. String是final类，不能继承
  7. String 有属性 private final char value[] 用于存放字符串类容，final 类型不能再指向其他字符串

- **例子**
  
  ```java
  public class String01 {
      public static void main(String[] args) {
          String a = "hello";
          String b = "abc";
          String c = a + b;
          // 常量池中创建了3个变量，hello, abc, helloabc,c指向一个String变量，String变量指向常量池中的helloabc
      }
  }
  ```

- **String 类的常见方法**
  
  1. equals：区分大小写，判断内容是否相等
  2. equalsIgnoreCase：忽略大小写的判断
  3. length：获取字符个数
  4. indexOf：获取字符在字符串中第一次出现的索引，找不到则返回-1
  5. lastIndexOf：获取字符在字符串中最后一次出现的索引，找不到则返回-1
  6. substring：截取指定范围的字符串
  7. trim：去前后空格
  8. charAt：获取某索引处的字符
  9. toUpperCase
  10. toLowerCase
  11. concat：拼接字符串
  12. replace：替换字符串中的字符
  13. split：分割字符串，以一个字符为标准分割
  14. compareTo比较两个字符串的大小
  15. format：将所有信息拼接在一个字符串

- **Java核心技术卷补充**
  
  1. 比较两个字符串相等时，不能用 == ，要用equals（），== 只能判断两个字符串是否放在相同的位置上，并不是比较字符串内容
     
     ```java
     String str1 = "hel";
     String str2 = "hello";
     // 这里截取hello的前3位与"hel"比较，应当输出true
     System.out.println(str2.substring(0, 3) == "hel");// false
     // 因为定义str1时，常量池中已经出现了 hel ，substring产生的字符串并不在常量池中，所以不在同一位置，输出false
     System.out.println(str2.substring(0, 3).equals("hel"));// true
     ```
  
  2. 

### StringBuffer类

- **介绍**
  
  StringBuffer是可变长度的，因为其父类的char[] value不是final类型，不用每次变化字符串都更换地址

- **String与StringBuffer相互转换**
  
  两者都可以使用构造器来相互转化
  
  ```java
  public class StringAndStringBuffer {
      public static void main(String[] args) {
          //看 String——>StringBuffe
          String str = "hello tom";
          //方式 1 使用构造器
          //注意： 返回的才是 StringBuffer 对象，对 str 本身没有影响
          StringBuffer stringBuffer = new StringBuffer(str);
          //方式 2 使用的是 append 方法
          StringBuffer stringBuffer1 = new StringBuffer();
          stringBuffer1 = stringBuffer1.append(str);
          //看看 StringBuffer ->String
          StringBuffer stringBuffer3 = new StringBuffer("韩顺平教育");
          //方式 1 使用 StringBuffer 提供的 toString 方法
          String s = stringBuffer3.toString();
          //方式 2: 使用构造器来搞定
          String s1 = new String(stringBuffer3);
      }
  }
  ```

- **常见方法**
  
  1. 增 append：增加在末尾
  2. 删 delete：删除指定索引之内的字符
  3. 插 insert：指定索引位置插入
  4. 长度 length

- **练习**
  
  ```java
  public class StringBufferExercise {
      public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);
          System.out.print("Input goods name: ");
          StringBuffer goodsName = new StringBuffer(scanner.next());
          System.out.print("Input goods price: ");
          StringBuffer goodsPrice = new StringBuffer(scanner.next());
          int dotIndex = goodsPrice.lastIndexOf(".");
          for (int i = dotIndex-3; i > 0; i-=3) {
              goodsPrice.insert(i, ",");
          }
  //        String name = goodsName.toString();
  //        String price = goodsPrice.toString();
          String formatStr = "商品名：%s\t价格：%s";
          String info = String.format(formatStr, goodsName, goodsPrice);
          System.out.println(info);
      }
  }
  ```

### StringBuilder类

- **介绍**
  
  1. 与StringBuffer类类似，但比StringBuffer类要快，建议优先使用
  2. 主要方法是append和insert，可以重载，以接收任意类型数据
  3. StringBuilder的方法没有做互斥处理，即没有synchronized关键字，因此在单线程的情况下使用

- **三种String类比较**
  
  ```java
  public class Compare {
      public static void main(String[] args) {
          long startTime = 0L;
          long endTime = 0L;
          StringBuffer buffer = new StringBuffer("");
          startTime = System.currentTimeMillis();
          for (int i = 0; i < 80000; i++) {//StringBuffer 拼接 20000 次
              buffer.append(String.valueOf(i));
          }
          endTime = System.currentTimeMillis();
          System.out.println("StringBuffer 的执行时间：" + (endTime - startTime));
          StringBuilder builder = new StringBuilder("");
          startTime = System.currentTimeMillis();
          for (int i = 0; i < 80000; i++) {//StringBuilder 拼接 20000 次
              builder.append(String.valueOf(i));
          }
          endTime = System.currentTimeMillis();
          System.out.println("StringBuilder 的执行时间：" + (endTime - startTime));
          String text = "";
          startTime = System.currentTimeMillis();
          for (int i = 0; i < 80000; i++) {//String 拼接 20000
              text = text + i;
          }
          endTime = System.currentTimeMillis();
          System.out.println("String 的执行时间：" + (endTime - startTime));
      }
  }
  ```
  
  可以看出StringBuilder效率最高

- **String、StringBuffer和StringBuilder类的选择**
  
  1. 如果字符串存在大量修改的操作，则使用StringBuffer或StringBuilder
  2. 如果存在大量修改操作，并在**单线程**的情况，使用StringBuilder
  3. 如果存在大量修改操作，并在**多线程**的情况，使用StringBuffer
  4. 如果字符串很少修改，被多个对象引用，则使用String

### Math类

- **介绍**
  
  包含基本数学运算的方法

- **常用方法**
  
  1. abs
  2. 正余弦
  3. 平方根
  4. 随机数random（）：返回0~1之间一个随机小数
  5. 最值

### Arrays类

包含了一系列静态方法，用于管理或操作数组

- **常用方法**
  
  1. toString 返回字符串形式
     
     ```java
     Arrays.toString(arr);
     ```
  
  2. sort 排序
     
     ```java
     Arrays.sort(arr);
     ```
  
  3. binarySearch 二分法查找，要求必须排好序
     
     ```java
     Arrays.binarySearch(arr, 4);
     ```
  
  4. copyOf 数组元素复制
     
     ```java
     int[] newArr = Arrays.copyOf(arr, arr.length);
     ```
  
  5. fill 数组元素填充
  
  6. equals 比较两个数组元素是否一致
  
  7. asList 将一组值，转换成List

- **sort（）定制排序**
  
  ```java
  import java.util.Arrays;
  import java.util.Comparator;
  
  public class ArraysExercise {
      public static void main(String[] args) {
          Book[] books = new Book[4];
          books[0] = new Book("红楼梦", 43);
          books[1] = new Book("西游记", 50);
          books[2] = new Book("水浒传", 100);
          books[3] = new Book("三国演义", 30);
          // price从大到小排序(定制排序),需要重写compare方法
  //        Arrays.sort(books, new Comparator<Object>() {
  //            @Override
  //            public int compare(Object o1, Object o2) {
  //                Book b1= (Book)o1;
  //                Book b2= (Book)o2;
  //                return b2.getPrice() - b1.getPrice();
  //            }
  //        });
          // price从小到大排序
  //        Arrays.sort(books, new Comparator<Object>() {
  //            @Override
  //            public int compare(Object o1, Object o2) {
  //                Book b1= (Book)o1;
  //                Book b2= (Book)o2;
  //                return b1.getPrice() - b2.getPrice();
  //            }
  //        });
          // name从长到短排序
          Arrays.sort(books, new Comparator<Object>() {
              @Override
              public int compare(Object o1, Object o2) {
                  Book b1= (Book)o1;
                  Book b2= (Book)o2;
                  return b2.getName().length() - b1.getName().length();
              }
          });
  
          for (Book book : books) {
              System.out.println(book.getName());
              System.out.println(book.getPrice());
          }
      }
  }
  
  class Book {
      private String name;
      private int price;
  
      public Book(String name, int price) {
          this.name = name;
          this.price = price;
      }
  ```

### System类

- **常用方法**
  1. exit：退出当前程序
  2. arraycopy：复制数组元素
  3. currentTimeMillens：返回当前时间距离1970-1-1的毫秒数
  4. gc：运行垃圾回收机制

### BigInteger和BigDecimal类

- **介绍**
  1. BigInteger适合保存比较大的整型
  2. BigDecimal适合保存精度更高的浮点型
  3. 对这两类进行计算，需要用到下面的类方法
- **常用方法**
  1. add
  2. subtract
  3. multiply
  4. divide

### 日期类

- **第一代日期类**
  
  1. Date：精确到毫秒
  2. SimpleDateFormat：格式化和解析日期的类
  
  ```java
  public class Date01 {
      public static void main(String[] args) {
          Date d1 = new Date(); // 获取当前的系统时间
          System.out.println("当前日期 = " + d1);
          Date d2 = new Date(9234567);    // 根据指定秒数来获得日期
          System.out.println("d2 = " + d2);
          // 创建SimpleDateFormat对象来指定格式
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy 年 MM 月 dd 日 hh:mm:ss E");
          String fmt = sdf.format(d1);    // 按format来转换字符串
          System.out.println("当前日期 = " + fmt);
      }
  }
  ```

- **第二代日期类**
  
  1. Calendar类
  2. Calendar是一个抽象类，并且构造器是private，要考getInstance（）来获取时间
  
  ```java
  public class Calendar01 {
      public static void main(String[] args) {
          Calendar c = Calendar.getInstance(); //创建日历类对象//比较简单，自由
          System.out.println("c=" + c);
          //2.获取日历对象的某个日历字段
          System.out.println("年：" + c.get(Calendar.YEAR));
          // 这里为什么要 + 1, 因为 Calendar 返回月时候，是按照 0 开始编号
          System.out.println("月：" + (c.get(Calendar.MONTH) + 1));
          System.out.println("日：" + c.get(Calendar.DAY_OF_MONTH));
          System.out.println("小时：" + c.get(Calendar.HOUR));
          System.out.println("分钟：" + c.get(Calendar.MINUTE));
          System.out.println("秒：" + c.get(Calendar.SECOND));
          //Calender 没有专门的格式化方法，所以需要程序员自己来组合显示
          System.out.println(c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONTH) + 1) +
                  "-" + c.get(Calendar.DAY_OF_MONTH) + " " + c.get(Calendar.HOUR_OF_DAY) +
                  ":" + c.get(Calendar.MINUTE) + ":" + c.get(Calendar.SECOND));
      }
  }
  ```

- **第三代日期类（JDK8加入）**
  
  1. LocalDate（日期/年月日）、LocalTime（时间/时分秒）、LocalDateTime（日期时间/年月日时分秒）
  
  2. DateTimeFormatter格式日期类，类似于SimpleDateFormat类
     
     ```java
     public class ThirdDate{
         public static void main(String[] args) {
             //第三代日期
             //1. 使用 now() 返回表示当前日期时间的 对象
             LocalDateTime ldt = LocalDateTime.now(); //LocalDate.now();//LocalTime.now()
             System.out.println(ldt);
             //2. 使用 DateTimeFormatter 对象来进行格式化
             // 创建 DateTimeFormatter 对象
             DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
             String format = dateTimeFormatter.format(ldt);
             System.out.println("格式化的日期=" + format);
             System.out.println("年=" + ldt.getYear());
             System.out.println("月=" + ldt.getMonth());
             System.out.println("月=" + ldt.getMonthValue());
             System.out.println("日=" + ldt.getDayOfMonth());
             System.out.println("时=" + ldt.getHour());
             System.out.println("分=" + ldt.getMinute());
             System.out.println("秒=" + ldt.getSecond());
             LocalDate now = LocalDate.now(); //可以获取年月日
             LocalTime now2 = LocalTime.now();//获取到时分秒
             //提供 plus 和 minus 方法可以对当前时间进行加或者减
             //看看 890 天后，是什么时候 把 年月日-时分秒
             LocalDateTime localDateTime = ldt.plusDays(890);
             System.out.println("890 天后=" + dateTimeFormatter.format(localDateTime));
             //看看在 3456 分钟前是什么时候，把 年月日-时分秒输出
             LocalDateTime localDateTime2 = ldt.minusMinutes(3456);
             System.out.println("3456 分钟前 日期=" + dateTimeFormatter.format(localDateTime2));
         }
     }
     ```
  
  3. Instant时间戳
     
     类似于Date，可以和Date互相转换
     
     ```java
     Date date = Date.from(instant);
     Instant instant = date.toInstant();
     ```

## 十二、集合

### 集合的理解和好处

- **集合**
  1. 可以动态保存多个对象
  2. 提供了一系列增删改查的方法

### Collection接口和常用方法


- **常用方法**
  
  1. add：添加单个元素
  2. remove：删除指定元素
  3. contains：查找元素是否存在
  4. size：获取元素个数
  5. isEmpty：判断是否为空
  6. clear：清空
  7. addAll：添加多个元素
  8. containsAll：查找多个元素是否都存在
  9. removeAll：删除多个元素

- **遍历接口元素方式**
  
  1. Iterator迭代器对象遍历
     
     - Iterator接口的方法
       1. hasNext（）：判断是否还有下个元素，如果有，就将指针指向下一个元素
       2. next（）：返回下一个元素，使用前必须先使用hasNext判断
       3. remove（）
     
     ```java
     public class CollectionIterator {
         public static void main(String[] args) {
             Collection col = new ArrayList();
     
             col.add(new Book("sanguoyanyi", "luoguanzhong", 10.1));
             col.add(new Book("hongloumeng", "caoxueqin", 5.1));
             col.add(new Book("xiyouji", "wuchengen", 34.6));
             // 遍历col
             // 1.得到col的迭代器，将指针指向col的第一个元素
             Iterator iterator = col.iterator();
             // 2.使用while循环遍历
             while (iterator.hasNext()) {
                 Object obj = iterator.next();
                 System.out.println("obj = " + obj);
             }
     
         }
     }
     
     class Book {
         private String name;
         private String author;
         private double price;
     
         public Book(String name, String author, double price) {
             this.name = name;
             this.author = author;
             this.price = price;
         }
     
         @Override
         public String toString() {
             return "Book{" +
                     "name='" + name + '\'' +
                     ", author='" + author + '\'' +
                     ", price=" + price +
                     '}';
         }
     }
     ```
  
  2. for循环增强
     
     for-each
     
     ```java
     // 其实也是调用迭代器方法
     for (Object b : col) {
         System.out.println("Book: " + b);
     }
     ```
     
     ​    

### List接口和常用方法

- **介绍**
  List接口是Collection接口的子接口
  
  1. List集合类的接口是有序的，每个元素有对应的索引

- **常用方法**
  
  1. add
  2. get
  3. indexOf
  4. lastIndexOf
  5. remove
  6. set：替换掉指定位置的元素
  
  ```java
  public class List01 {
      public static void main(String[] args) {
          List list = new ArrayList();
          // add
          list.add("jack");
          list.add(10);
          list.add(true);
          list.add(2, "rose");
          System.out.println("list = " + list);
          // remove
          list.remove(true);
          System.out.println("list = " + list);
          // contains
          System.out.println(list.contains(10));
          // addAll 传入一个集合
          ArrayList arrayList = new ArrayList();
          list.addAll(arrayList);
          System.out.println(list.contains(10));
          // set
          list.set(1, 5);
          System.out.println(list.contains(10));
          // sublist 返回子列
          List returnList = list.subList(1,3);
          System.out.println(list.contains(10));
          // size 返回list的大小
          System.out.println(list.size());
      }
  }
  ```

- **List的三种遍历方式**
  
  1. 使用iterator（参考上面的Collection遍历）
  2. 使用for each
  3. 使用普通for，通过index来遍历

- **List练习**
  
  ```java
  public class ListExercise02 {
      public static void main(String[] args) {
          List list = new ArrayList();
          list.add(new Book("xiyouji", 12.3, "wuchengen"));
          list.add(new Book("anguoyanyi", 22.1, "shinaian"));
          list.add(new Book("shuihuzhuan", 12.5, "luoguanzhong"));
          for (int i = 0; i < list.size(); i++) {
              for (int j = i; j < list.size() - i; j++) {
                  Book temp1 = (Book) list.get(i);
                  Book temp2 = (Book) list.get(i + 1);
                  if (temp1.getPrice() > temp2.getPrice()) {
                      list.set(j + 1, temp1);
                      list.set(j, temp2);
                  }
              }
          }
          System.out.println("list:" + list);
      }
  }
  
  class Book {
      private String name;
      private double price;
      private String author;
  
      public Book(String name, double price, String author) {
          this.name = name;
          this.price = price;
          this.author = author;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public double getPrice() {
          return price;
      }
  
      public void setPrice(double price) {
          this.price = price;
      }
  
      public String getAuthor() {
          return author;
      }
  
      public void setAuthor(String author) {
          this.author = author;
      }
  
      @Override
      public String toString() {
          return "name=" + name +
                  ", price=" + price +
                  ", author='" + author;
      }
  }
  ```

### ArrayList底层结构和源码分析

- **注意事项**
  1. ArrayList可以加入null
  2. ArrayList是由数组来实现数据存储的
  3. ArrayList基本等同于Vector，但是没有**synchronized**修饰，**线程不安全**
- **ArrayList底层操作机制和源码分析**
  1. ArrayList中有一个object数组
  2. 当创建ArrayList对象时，如果使用无参构造器，则初始elementData容量为0，第一次添加则扩容为10，之后每次扩容为1.5倍
  3. 如果使用指定大小的构造器，则初始elementData容量为指定大小，每次扩容变1.5倍

### Vector底层结构和源码剖析

- **介绍**
  
  1. Vector底层也是一个对象数组，protected Object[] elementData
  2. Vector是线程同步的，线程安全

- **Vector和ArrayList比较**
  
  |           | 底层结构               | 版本     | 线程安全    | 扩容倍数                                                 |
  | --------- | ------------------ | ------ | ------- | ---------------------------------------------------- |
  | ArrayList | 可变数组               | jdk1.2 | 不安全，效率高 | 有参构造1.5倍<br />如果是无参<br />1.第一次10<br />2.从第二次开始1.5倍扩容 |
  | Vector    | 可变数组<br />Object[] | jdk1.0 | 安全，效率不高 | 如果是无参，默认10，满后按2倍扩容<br />如果指定大小，每次都按2倍扩容              |

### LinkedList底层结构

- **说明**
  
  1. LinkList底层实现了双向链表和双端队列地特点
  2. 可以添加任意元素，包括null
  3. 线程不安全，没有线程同步

- **LinkedList底层操作机制**
  
  1. 底层双向链表，两个属性first和last分别指向首节点和尾节点
  2. 每个节点中prev指向前一个节点，next指向后一个节点
  3. LinkedList的添加和删除，不是通过数组，效率更高

- **LinkedList增删改查**
  
  ```java
  public class LinkedList01 {
      public static void main(String[] args) {
          LinkedList list = new LinkedList();
          for (int i = 0; i < 10; i++) {
              list.add("hello" + i);
          }
          System.out.println("LinkedList = " + list);
          // 删除节点
          list.remove(); // 不写index默认删除第一个节点
          System.out.println("LinkedList = " + list);
          list.remove(0);
          System.out.println("LinkedList = " + list);
          // 修改节点
          list.set(1, "set1");
          System.out.println("LinkedList = " + list);
          // 得到节点
          Object o = list.get(1);
          System.out.println(o);
          // 遍历
          System.out.println("LinkedList遍历");
          Iterator iterator = list.iterator();
          while (iterator.hasNext()) {
              Object next =  iterator.next();
              System.out.println("next = "+next);
          }
          // for each遍历
          System.out.println("for-each遍历");
          for (Object o1: list) {
              System.out.println("next = "+o1);
          }
      }
  }
  ```

- **ArrayList和LinkedList比较**
  
  1. 如果改查操作多用ArrayList
  2. 如果增删操作多用LinkedList

- **LinkedList的添加和删除**
  
  ```java
  List<String> staff = new LinkedList<>();
  staff.add("Amy");
  staff.add("Bob");
  staff.add("Car");
  Iterator<String> iter1 = staff.iterator();    // 普通的迭代器只有remove方法
  ListIterator<String> iter2 = staff.listIterator();    // 这种迭代器实现了add方法
  // 注意
  iter1.next();    
  iter1.remove();    // 删除了迭代器左边的元素
  iter1.previous();
  iter1.remove();    // 删除了迭代器右边的元素
  ```

### Set接口和常用方法

- **介绍**
  
  1. 无序，没有索引
  2. 不允许重复元素，所以最多包含一个null

- **常用方法**
  
  Set接口时Collection子接口，所以常用方法和Collection接口一样

- **遍历方式**
  
  1. 迭代器
  2. for-each
  3. 不能使用for加索引的方式来遍历
  
  ```java
  public class Set01 {
      public static void main(String[] args) {
          Set set = new HashSet();
          for (int i = 0; i < 10; i++) {
              set.add("hello" + i);
          }
          Iterator iterator = set.iterator();
          while (iterator.hasNext()) {
              Object next = iterator.next();
              System.out.println("set = " + next);
          }
      }
  }
  /*输出不是按add顺序来的
  set = hello0
  set = hello1
  set = hello4
  set = hello5
  set = hello2
  set = hello3
  set = hello8
  set = hello9
  set = hello6
  set = hello7
  */
  ```

### Set接口实现类-HashSet

- **介绍**
  
  1. HashSet实际上是HashMap，**构造器里使用了HashMap的构造器**
     
     ```java
     public HashSet() {
             map = new HashMap<>();
         }
     ```
  
  2. 可以存放null，但是只能有一个null
  
  3. 不保证元素有序，hash后再确定索引结果

- **HashSet底层机制说明**
  
  1. HashSet底层是HashMap，HashMap底层是**数组+链表+红黑树**
  2. 添加一个元素时，先得到Hash值，再将Hash值转换为索引值
  3. 找到存储表table，看这个索引位置是否已经存放元素
  4. 如果没有，直接存入
  5. 如果有，调用equals比较，若相同就不添加，若不同就以链表形式添加到后面
  6. 在Java8中，如果一条链表的元素个数达到8，且table大小大于64就会进化成红黑树，否则就用数组扩容
  7. 第一次添加时，table数组扩容到16，临界值是16*（loadFactor=0.75）=12，每次到临界值就会扩容2倍，变为32，以此类推

- **使用HashCode方法**
  
  ```java
  public class HashSetExercise02 {
      public static void main(String[] args) {
          Set set = new HashSet();
          set.add(new Employ("ymk", 12000, new MyDate(1998, 3, 31)));
          set.add(new Employ("ztt", 12000, new MyDate(1997, 3, 23)));
      }
  }
  
  class Employ {
      private String name;
      private double sal;
      private MyDate birthday;
  
      public Employ(String name, double sal, MyDate birthday) {
          this.name = name;
          this.sal = sal;
          this.birthday = birthday;
      }
  
      @Override
      public boolean equals(Object o) {
          if (this == o) return true;
          if (o == null || getClass() != o.getClass()) return false;
          Employ employ = (Employ) o;
          return Objects.equals(name, employ.name) && Objects.equals(birthday, employ.birthday);
      }
  
      @Override
      public int hashCode() {
          return Objects.hash(name, birthday);
      }
  }
  
  class MyDate {
      private int year;
      private int month;
      private int day;
  
      public MyDate(int year, int month, int day) {
          this.year = year;
          this.month = month;
          this.day = day;
      }
  }
  ```

### Set接口实现类-LinkedHashSet

- **介绍**
  
  1. LinkedHashSet是HashSet的子类
  
  2. 底层是一个LinkedHashMap，数组加双向链表
     
     
     可以看出比HashSet多了before和after分别指向前一个add和后一个add，这样就可以保证遍历的时候按add顺序遍历

### Set接口实现类-TreeSet

对集合进行遍历时，每个值将自动地按照排序后地顺序呈现，排序是用红黑树结构完成的。

要使用TreeSet，则元素必须实现Comparable接口。

### Map接口和常用方法

- **介绍**
  
  1. Map用于保存有映射关系的数据：Key-Value
  2. Key和Value可以是任何引用类型数据，会封装到HashMap$Node对象中
  3. Map中的Key不能重复
  4. Value可以重复
  5. 常用String类来做Key

- **常用方法**
  
  1. put：添加k-v
  2. remove：根据键删除映射关系
  3. get：根据键获取键值
  4. containsKey：查找键是否存在

- **遍历方法**
  
  ```java
  public class Map01 {
      public static void main(String[] args) {
          Map map = new HashMap();
          map.put("邓超", "孙俪");
          map.put("王宝强", "马蓉");
          map.put("鹿晗", "关晓彤");
          map.put("宋喆", "马蓉");
  
          // 先取出所有Key
          Set keySet = map.keySet();  // 返回一个key集合
          // 1.增强for,用map的方法get根据key得到对应value
          for (Object key : keySet) {
              System.out.println(key + "-" + map.get(key));
          }
          // 2.迭代器
          Iterator iterator = keySet.iterator();
          while (iterator.hasNext()) {
              Object key = iterator.next();
              System.out.println(key + "-" + map.get(key));
          }
          // 3.取出所有value再遍历
          Collection values = map.values();
          //可以用for-each或迭代器遍历
      }
  }
  ```

### Map接口实现类-HashTable

- **介绍**
  1. 存放的键和值都不能为null
  2. HashTable是线程安全的，HashMap线程不安全
  3. 方法和HashMap类似

### Map接口实现类-Properties

- **介绍**
  1. Properties类继承自HashTable类并且实现了Map接口
  2. 使用类似HashTable，key，value不能为null
  3. 用于xxx.properties文件（IO流）中，加载数据到Properties类对象

### 总结-开发中如何选择集合实现类

1. 先判断存储类型（一组对象【单列】或一组键值对【双列】）

2. 一组对象【单列】：Collection接口
   
   - 允许重复：List
     
     - 增删多：LinkedList（双向链表）
     - 改查多：ArrayList（Object[] 数组）
   
   - 不允许重复：Set
     
     - 无序：HashSet（底层HashMap）
     
     - 排序：TreeSet
       
       ```java
       public class TreeMap01 {
           public static void main(String[] args) {
               TreeSet treeSet = new TreeSet(new Comparator() {
                   @Override
                   public int compare(Object o1, Object o2) {
                       return ((String)o1).length() - ((String)o2).length();
                   }
               });
               treeSet.add("jack");
               treeSet.add("ymk");
               treeSet.add("qwewe");
               System.out.println("TreeSet = " + treeSet);
           }
       }
       ```
     
     - 插入和取出顺序一致：LinkedHashSet（数组加双向链表）

3. 一组键值对【双列】：Map
   
   - 键无序：HashMap（链表数组）
   - 键排序：TreeMap
   - 键插入和取出顺序一致：LinkedHashMap
   - 读取文件：Properties

### Collections工具类

- **介绍**
  1. Collections是一个操作Set、List和Map等集合的工具类
  2. 提供对集合元素进行排序、查询和修改等操作
- **排序**
  1. reverse（List）：反转
  2. shuffle（List）：随机排序
  3. sort（List）：升序
  4. sort（List, Comparator）：指定排序方法
  5. swap（List，int，int）：将指定List集合中的i处元素和j处元素交换
- **查找**
  1. max
  2. min
  3. frequency：元素出现次数
  4. copy
  5. replaceAll（List，oldVal，newVal）：新值替换List中的所有旧值

## 十三、泛型

### 泛型的理解和好处

- **为什么需要泛型**
  
  普通方法
  
  ```java
  public class ArrayList01 {
      public static void main(String[] args) {
          ArrayList arrayList = new ArrayList();
          // 如果add了不是Dog类型的对象也不会报错
          arrayList.add(new Dog("旺财", 10));
          arrayList.add(new Dog("大黄", 2));
          arrayList.add(new Dog("柯基", 5));
          // 遍历
          for (Object o :
                  arrayList) {
              System.out.println("Dog: " + o);
              // 如果想要调用Dog的方法需进行强制类型转换
              ((Dog)o).hello();
          }
      }
  }
  
  class Dog {
      private String name;
      private int age;
  
      public Dog(String name, int age) {
          this.name = name;
          this.age = age;
      }
  
      @Override
      public String toString() {
          return "name=" + name + ", age=" + age;
      }
  
      public void hello() {
          System.out.println("woo");
      }
  }
  ```
  
  使用泛型
  
  ```java
  public class ArrayList02 {
      public static void main(String[] args) {
          // 表示存放到ArrayList集合中的元素是Dog类型
          // 这样我们取出的元素也是Dog类型而不是Object
          ArrayList<Dog> arrayList = new ArrayList<Dog>();
          arrayList.add(new Dog("旺财", 10));
          arrayList.add(new Dog("大黄", 2));
          arrayList.add(new Dog("柯基", 5));
          // 如果添加了其他类，就会报错
          //arrayList.add(new Cat());
      }
  }
  
  class Cat {}
  ```

- **泛型好处**
  
  1. 编译时会检查添加元素的类型，提高了安全性
  2. 减少了类型转换的次数，提高效率

### 泛型介绍

可以在类声明时通过一个标识表示类中的某个属性的类型，或者是某个方法的返回值类型，或者是参数类型

### 泛型语法

- **泛型的声明**
  
  interface 接口\<T\> {} 和 class 类<K,V>
  
  1. 其中，T，K，V不带表值，而是代表类型
  2. 任意字母都可以，常用T表示，是Type的缩写

- **泛型的实例化**
  
  要在类名后面指定类型参数
  
  1. List\<string\> strList = new ArrayList\<String\>();
  2. Iterator\<Customer\> iterator = customers.iterator();

- **泛型的使用细节**
  
  1. \<T\>只能是引用类型，不能是int
  2. 给了泛型具体类型后，可以传入该类型及其子类型
  3. 可以简写List\<string\> strList = new ArrayList<>();

### 自定义泛型类

- **基本语法**
  
  class 类名 <T, R...> {
  
  ​        成员    // ... 表示可以有多个泛型成员
  
  }

- **细节**
  
  1. 普通成员（属性，方法）可以使用泛型
  2. 使用泛型的数组不能初始化
  3. 静态方法中不能使用类的泛型
  4. 泛型类的类型，是在创建对象时指定的，若没有指定类型，默认为Object
  
  ```java
  public class Generic01 {
      public static void main(String[] args) {
          Person person = new Person(10);
          System.out.println(person.f());
          person.show();
  
          Person<String> person1 = new Person<String>("yanmingkui");
          System.out.println(person1.f());
          person1.show();
      }
  }
  
  class Person<E> {
      E s;
  
      public Person(E s) {    // 构造器中使用泛型
          this.s = s;
      }
  
      public E f() {    // 方法中返回值可以为泛型
          return s;
      }
  
      public void show() {
          System.out.println(s.getClass());
      }
  }
  ```

### 自定义泛型接口

- **基本语法**
  
  interface 接口名 <T, R ...> {
  
  ​        代码
  
  }

- **注意细节**
  
  1. 接口中，静态成员也不能使用泛型，不能直接用泛型定义类
  2. 泛型接口的类型，在**继承接口**或**实现接口**时确定
  3. 没有指定类型，默认Object
  
  ```java
  interface IUsb<U, R> {
      // U name; // 无法定义，因为接口中的类默认是静态类型
      R get(U u); // 抽象方法中可以使用泛型
      default R method(U u) { // jdk8默认方法中可以使用泛型
          return null;
      }
  }
  
  interface IA extends IUsb<String, Double> {
      // 继承接口时指定泛型接口的类型
  }
  
  class BB implements IUsb<Integer, Float> {  // 实现接口时，直接指定泛型接口的类型
      @Override
      public Float get(Integer integer) {
          return null;
      }
  }
  ```

### 自定义泛型方法

- **基本语法**
  
  修饰符 <T, R ...> 返回类型 方法名（参数列表）{
  
  ​        代码
  
  }

- **注意细节**
  
  1. 泛型方法，可以定义在普通类中，也可以定义在泛型类中
  
  2. 调用时，确定类型
  
  3. ```java
     public void eat(E e) {}    // 修饰符后没有<>，不是泛型方法，只是调用了泛型
     ```
     
     ```java
     class Fish {
         public<T, R> void fly(T t, R r) {   // 普通类中的泛型方法
             System.out.println(t.getClass());
             System.out.println(r.getClass());
         }
     }
     
     class Cat<T, R> {
         public<K> void hello(R r, K k) {    // 泛型类中的泛型方法，也可以使用自己声明的泛型
             System.out.println(r.getClass());
             System.out.println(k.getClass());
         }
     }
     ```

### 泛型的继承和通配符

- **介绍**
  
  1. 泛型不具有继承性
     
     ```java
     List<Object> list = new ArrayList<Object>(); // 正确
     //List<Object> list = new ArrayList<String>(); // 错误
     ```
  
  2. \<?\>：支持任意泛型类型
  
  3. \<? extends A\>：支持A类以及A类的子类
     
     ```java
     List\<? extends Object\> list1 = new ArrayList\<String\>(); // 正确
     ```
  
  4. \<? super A\>：支持A类以及A类的父类，不限于直接父类
     
     ```java
     List\<? super String\> list2 = new ArrayList\<Object\>(); // 正确
     ```

### java核心技术卷补充

1. 类型变量的限定
   
   ```java
   public <T extends Comparable & Serializable> T min(T[] a);
   // 要求T是实现了Comparable接口的类
   // 避免了方法中使用了Comparable接口方法，而类中不具有而报错
   ```

2. java不支持泛型类型的数组，可以使用@SafeVarargs标注来消除限制，但是可能会引发异常
   
   ```java
   Pair<String>[] table = array(pair1, pair2);
   Object[] objArrary = table;
   objArrary[0] = new Pair<Employee>();    // 产生异常
   ```

3. Class类本身就是一种泛型

4. 泛型类的静态成员和方法无效，故禁止使用
   
   ```java
   public class A<T> {
       private static T aInstance;    // Error
       private Static T aMethod() {}    // Error
   }
   ```

5. 不能throws或catch泛型类的实例

6. 无论S与T有什么联系，Pair\<S>与Pair\<T>没有什么联系

### JUnit测试

- **介绍**
  
  1. JUnit是一个Java语言的单元测试框架
  2. 多数Java的开发环境都已经集成了JUnit作为单元测试的工具

- **语法**
  
  在函数上加上@Test可以直接运行

## 十四、坦克大战（1）

### Java绘图坐标系

## 十五、多线程基础

### 线程的基本使用

- **创建线程的两种方式**
  
  1. 继承Thread类，重写run方法
     
     ```java
     public class Thread01 {
         public static void main(String[] args) {
             Cat cat = new Cat();
             cat.start();
         }
     }
     // 当一个类继承了Thread类，它就可以当成线程使用
     class Cat extends Thread {
         private int times;
         @Override
         public void run() {
             times = 0;
             while (true) {
                 if (times++ == 8) {
                     break;
                 }
                 // 每隔一秒输出一次
                 System.out.println("Cat Thread");
                 try {
                     Thread.sleep(1000);
                 } catch (InterruptedException e) {
                     e.printStackTrace();
                 }
             }
         }
     }
     ```
  
  2. 实现Runnable接口，重写run方法
     
     ```java
     // java是单继承的，可能一个类已经继承了父类，这时上一个方法就无法使用了
     public class Thread02 {
         public static void main(String[] args) {
             Tiger tiger = new Tiger();
             // tiger.start() 这里不能直接用start
             Thread thread = new Thread(tiger);
             thread.start();
         }
     }
     
     class Animal {
     
     }
     
     class Tiger extends Animal implements Runnable {
         private int times;
         @Override
         public void run() {
             times = 0;
             while (true) {
                 if (times++ == 4) {
                     break;
                 }
                 // 每隔一秒输出一次
                 System.out.println("tiger oww\t" + Thread.currentThread());
                 try {
                     Thread.sleep(1000);
                 } catch (InterruptedException e) {
                     e.printStackTrace();
                 }
             }
         }
     }
     ```

- **jconsole监视线程**
  
  需要添加以下jvm启动参数
  
  -Dcom.sun.management.jmxremote 
  -Dcom.sun.management.jmxremote.port=8011
  -Dcom.sun.management.jmxremote.ssl=false 
  -Dcom.sun.management.jmxremote.authenticate=false

- **多线程执行**
  
  ```java
  public class Thread03 {
      public static void main(String[] args) {
          T1 t1 = new T1();
          T2 t2 = new T2();
          Thread thread1 = new Thread(t1);
          Thread thread2 = new Thread(t2);
          thread1.start();
          thread2.start();
      }
  }
  
  class T1 implements Runnable {
      int count = 0;
  
      @Override
      public void run() {
          while (true) {
              // 每隔一秒输出"hello world"
              System.out.println("hello world\t" + Thread.currentThread()+ (++count));
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              if (count == 60) {
                  break;
              }
          }
      }
  }
  
  class T2 implements Runnable {
      int count = 0;
  
      @Override
      public void run() {
          while (true) {
              // 每隔一秒输出"hello world"
              System.out.println("hi\t" + Thread.currentThread() + (++count));
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              if (count == 50) {
                  break;
              }
          }
      }
  }
  ```

- **继承Thread vs 实现Runnable的区别**
  
  1. 从java设计来看，没有本质上区别
  
  2. 实现Runnable接口方式更加适合多个线程共享一个资源的情况，并且避免了单继承的限制，**建议使用Runnable**
  
  3. 举例：售票系统（三个窗口售票总共100张）
     
     ```java
     public class ThreadShop {
         public static void main(String[] args) {
             // 三家店同时卖，所以要创建三个线程
             Shop1 shop1 = new Shop1();
             Shop1 shop2 = new Shop1();
             Shop1 shop3 = new Shop1();
             new Thread(shop1).start();
             try {
                 Thread.sleep(100);
             } catch (InterruptedException e) {
                 e.printStackTrace();
             }
             new Thread(shop2).start();
             try {
                 Thread.sleep(100);
             } catch (InterruptedException e) {
                 e.printStackTrace();
             }
             new Thread(shop3).start();
         }
     }
     
     class Shop1 implements Runnable {
         private int ticketsNum = 50;
     
         @Override
         public void run() {
             while (true) {
                 if (ticketsNum <= 0) {
                     System.out.println("票已售完");
                     break;
                 }
                 // 每100毫秒卖出去一张票
                 try {
                     Thread.sleep(100);
                 } catch (InterruptedException e) {
                     e.printStackTrace();
                 }
                 System.out.println("窗口:" + Thread.currentThread() + "售出一张票\t" + "剩余票数" + (--ticketsNum));
             }
         }
     }
     ```

### 线程终止

- **基本说明**
  
  1. 当线程完成后，会自动退出
  2. 还可通过使用变量来控制run方法退出的方式停止线程（**通知方式**）

- **使用案例**
  
  ```java
  public class ThreadStop {
      public static void main(String[] args) {
          AThread aThread = new AThread();
          new Thread(aThread).start();
          // 延迟10秒后结束子线程
          try {
              Thread.sleep(10000);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
          aThread.setLoop(false);
      }
  }
  
  class AThread implements Runnable {
      boolean loop = true;    // 设置一个标记变量
  
      @Override
      public void run() {
          while (loop) {  // 用loop来控制循环
              try {
                  Thread.sleep(100);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              System.out.println("AThread运行......");
          }
      }
      // 在给以设置loop的方法，即可退出线程
      public void setLoop(boolean loop) {
          this.loop = loop;
      }
  }
  ```

### 线程常用方法

- **常用方法第一组**
  
  1. setName    // 设置线程名称
  2. getName
  3. start
  4. run
  5. setPriority
  6. getPriority
  7. sleep
  8. interrupt

- **注意事项**
  
  1. start底层会创建一个新线程，run只是调用线程方法
  2. interrupt只是中断线程，但线程并没用真正结束，一般用于中断正在休眠线程

- **常用方法第二组**
  
  1. yield    // 线程的礼让，让出CPU，让其他线程执行
  2. join    // 线程插队，插队若成功，则先执行完插队的线程
  
  ```java
  public class ThreadYield {
      public static void main(String[] args) {
          int count = 20;
          A a = new A();
          Thread t = new Thread(a);
          t.start();
          while (true) {
              if (count-- <= 0) {
                  break;
              }
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              System.out.println("hello" + Thread.currentThread().getName());
              if (count == 15) {
                  System.out.println("让子线程先运行");
  //                Thread.yield();   // 礼让不一定成功
                  try {
                      t.join();
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
                  System.out.println("子线程运行结束，再运行主线程");
              }
          }
      }
  }
  
  class A implements Runnable{
      private int count = 20;
      @Override
      public void run() {
          while (true) {
              if (count-- <= 0) {
                  break;
              }
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              System.out.println("hello" + Thread.currentThread().getName());
          }
      }
  }
  ```

- **用户线程和守护线程**
  
  1. 用户线程：也叫工作线程当线程的任务执行完或通知方式结束
  2. 守护线程：一般是为工作线程服务的，当所有用户线程结束，守护线程自动结束（垃圾回收机制）

- **设置守护线程**
  
  ```java
  public class ThreadDaemon {
      public static void main(String[] args) {
          MyDaemonThread thread = new MyDaemonThread();
          thread.setDaemon(true);    // 设置为守护线程
          thread.start();
          for (int i = 0; i < 100; i++) {
              try {
                  Thread.sleep(50);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              System.out.println("主线程运行中");
          }
          System.out.println("主线程运行完毕");
      }
  }
  
  class MyDaemonThread extends Thread {
      @Override
      public void run() {
          while (true) {
              try {
                  Thread.sleep(50);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
              System.out.println("守护线程运行中......");
          }
      }
  }
  ```

### 线程的生命周期

- **JDK中用Thread.State枚举表示了线程的几种状态**
  
  1. New：尚未启动
  2. RUNNABLE：在JVM中执行
  3. BLOCKED：被阻塞等待监视器锁定
  4. WAITING：正在等待另一个线程执行特定动作
  5. TIMED_WAITING：正在等待另一个线程执行动作达到指定时间
  6. TERMINATED：已退出

- **线程状态转换图**

- **查看线程状态**
  
  ```java
  public class ThreadState {
      public static void main(String[] args) {
          T t = new T();
          System.out.println(t.getName() + "状态" + t.getState());
          t.start();
          while (Thread.State.TERMINATED != t.getState()) {
              System.out.println(t.getName() + "状态" + t.getState());
              try {
                  Thread.sleep(500);
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          }
          System.out.println(t.getName() + "状态" + t.getState()); // 子线程已经终止
      }
  }
  
  class T extends Thread {
      @Override
      public void run() {
          while (true) {
              for (int i = 0; i < 10; i++) {
                  System.out.println("hi" + i);
                  try {
                      Thread.sleep(1000);    // 线程睡眠时处于TIMED_WAITING
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
              break;
          }
      }
  }
  ```

### 线程同步

- **线程同步机制**
  
  1. 多线程编程时，一些敏感数据不允许被多个线程同时访问，保证数据完整性
  2. 即当一个线程对内存进行操作时，其他线程都不可以对这个内存地址进行操作

- **同步方法 - Synchronized**
  
  1. 同步代码块
     
     synchronized（对象）{    // 得到对象的锁，才能操作同步代码
     
     ​        // 需要被同步的代码
     
     }
  
  2. synchronized还可以放在方法声明中，表示整个方法为同步方法
     
     public synchronized void m（String name）{
     
     ​        // 需要被同步代码
     
     }

### 互斥锁

- **介绍**
  
  1. 每个对象都有一个互斥锁
  2. 关键字synchronized来与对象的互斥锁联系。当某个对象用synchronized修饰时，表明该对象在任一时刻只能由一个线程访问
  3. 非静态的同步方法的锁可以是this也可以是其他对象
  4. 静态的同步方法的锁为当前类本身
  
  ```java
  public class ThreadShop {
      public static void main(String[] args) {
          Shop1 shop1 = new Shop1();
          // 三家店同时卖，所以要创建三个线程
          new Thread(shop1).start();
          new Thread(shop1).start();
          new Thread(shop1).start();
      }
  }
  
  class Shop1 implements Runnable {
      private int ticketsNum = 50;
  //    Object o = new Object();
  
      public synchronized static void m1() {}
  
      public static void m2() {
          synchronized (Shop1.class) {    // 静态方法互斥锁在类对象
              System.out.println("m2");
          }
      }
  
      private void sell() {
          synchronized (this) {       // 代码块互斥锁在this
              while (true) {
                  if (ticketsNum <= 0) {
                      System.out.println("票已售完");
                      break;
                  }
                  // 每100毫秒卖出去一张票
                  try {
                      Thread.sleep(100);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
                  System.out.println("窗口:" + Thread.currentThread() + "售出一张票\t" + "剩余票数" + (--ticketsNum));
              }
          }
      }
  ```
  
      @Override
      public /*synchronized*/ void run() {
          sell();
      }
  
  }

```
- **注意事项**

1. 实现互斥步骤：
   - 先分析需要上锁的代码
   - 选择同步代码块或同步方法
   - 要求多个线程的锁对象为同一个即可，即使用同一个对象来start线程



### 线程死锁

- **基本介绍**

多个线程都占用了对方的锁资源，但不肯相让，导致死锁

- **模拟线程死锁**

```java
public class DeadLock_ {
    public static void main(String[] args) {
        //模拟死锁现象
        DeadLockDemo A = new DeadLockDemo(true);
        A.setName("A 线程");
        DeadLockDemo B = new DeadLockDemo(false);
        B.setName("B 线程");
        A.start();
        B.start();
    }
}

class DeadLockDemo extends Thread {
    static Object o1 = new Object();// 保证多线程，共享一个对象,这里使用 static
    static Object o2 = new Object();
    boolean flag;
    public DeadLockDemo(boolean flag) {//构造器
        this.flag = flag;
    }
    @Override
    public void run() {
    //1. 如果 flag 为 T, 线程 A 就会先得到/持有 o1 对象锁, 然后尝试去获取 o2 对象锁
    //2. 如果线程 A 得不到 o2 对象锁，就会 Blocked
    //3. 如果 flag 为 F, 线程 B 就会先得到/持有 o2 对象锁, 然后尝试去获取 o1 对象锁
    //4. 如果线程 B 得不到 o1 对象锁，就会 Blocked
        if (flag) {
            synchronized (o1) {//对象互斥锁, 下面就是同步代码
                System.out.println(Thread.currentThread().getName() + " 进入 1");
                synchronized (o2) { // 这里获得 li 对象的监视权
                    System.out.println(Thread.currentThread().getName() + " 进入 2");
                }
            }
        } else {
            synchronized (o2) {
                System.out.println(Thread.currentThread().getName() + " 进入 3");
                synchronized (o1) { // 这里获得 li 对象的监视权
                    System.out.println(Thread.currentThread().getName() + " 进入 4");
                }
            }
        }
    }
}
```

### 释放锁

- **如何释放锁**
  1. 当前线程的同步方法、同步代码块**执行结束时**释放锁
  2. 当前线程在同步代码块、同步方法中遇到**break、return**
  3. 当前线程在同步代码块、同步方法中出现了未处理的**Error或Exception**，导致异常结束
  4. 当前线程在同步代码块、同步方法中执行了线程对象的**wait ()方法**，当前线程暂停，并释放锁
- **下面的操作不会释放锁**
  1. 线程执行同步代码块或同步方法时，程序调用sleep（）、yield（）方法时，不会释放锁
  2. 线程执行同步代码块时，其他线程调用了该线程的suspend（）方法将该线程方法挂起，该线程不会释放锁

## 十六、IO流

### 文件流

文件在程序中是以流的形式来操作的

### 常用文件操作

- **创建文件对象相关构造器和方法**
  
  new File（String pathname）    // 根据路径构建一个File对象
  
  new File（File parent， String child）    // 根据父目录文件+子路径构建
  
  new File（String parent， String child）    // 根据父目录+子路径构建
  
  createNewFile（）    // 创建新文件
  
  ```java
  public class File01 {
      // method 1 new File(String pathname)
      @Test
      public void create01() {
          // File对象在java程序中只是一个对象
          File file = new File("e:\\news1.txt");
          try {
              file.createNewFile(); // File对象在java程序中只是一个对象，只有执行了createNewFile才会创建文件
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
      // method 2 new File(File parent, String child) // 根据父目录文件+子路径构建
      @Test
      public void create02() {
          File parentFile = new File("e:\\");
          File file = new File(parentFile, "news2.txt");
          try {
              file.createNewFile();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
      // method 3 new File(String parent, String child)
      @Test
      public void create03() {
          File file = new File("e:\\", "news3.txt");
          try {
              file.createNewFile();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```

- **获取文件的相关信息**
  
  1. getName
  2. getAbsolutePath
  3. getParent
  4. length
  5. exists
  6. isFile
  7. isDirectory
  
  ```java
  public class File02 {
      //获取文件的信息
      @Test
      public void info() {
          //先创建文件对象
          File file = new File("e:\\news1.txt");
          //调用相应的方法，得到对应信息
          System.out.println("文件名字=" + file.getName());
          //getName、getAbsolutePath、getParent、length、exists、isFile、isDirectory
          System.out.println("文件绝对路径=" + file.getAbsolutePath());
          System.out.println("文件父级目录=" + file.getParent());
          System.out.println("文件大小(字节)=" + file.length());
          System.out.println("文件是否存在=" + file.exists());//T
          System.out.println("是不是一个文件=" + file.isFile());//T
          System.out.println("是不是一个目录=" + file.isDirectory());//F
  
      }
  }
  ```

- **目录的操作和文件的删除**
  
  1. mkdir    // 创建一级目录
  2. mkdirs    // 创建多级目录
  3. delete    // 删除目录或文件
  
  ```java
  public class File03 {
      @Test
      public void makeDir() {
          File file = new File("e:\\demo\\a\\b\\c");
          // 判断目录是否存在，否则创建多级目录
          if (!file.exists()) {
              file.mkdirs();
          }
      }
  }
  ```

### IO流原理及流的分类

- **Java IO流原理**
  
  1. I/O用于处理数据传输（读写、网络通讯）
  2. Java.io包下提供了各种“流”类和接口
  3. 输入input：读取外部数据到程序中
  4. 输出output：将程序数据输出到存储设备

- **流的分类**
  
  1. 按操作数据单位不同分为：字节流（8bit）二进制文件，字符流（按字符）文本文件
  2. 按数据流的流向不同分为：输入流、输出流
  3. 按流的角色不同分为：节点流、处理流/包装流
  
  | 抽象基类 | 字节流          | 字符流    |
  | ---- | ------------ | ------ |
  | 输入流  | InputStream  | Reader |
  | 输出流  | OutputStream | Writer |

### IO流体系图 - 常用的类

- **IO流 体系图**
  

- **FileInputStream介绍**
  
  ```java
  public class FileInputStream01 {
      // 单字节读取
      @Test
      public void readFile01() {
          int readData = 0;
          FileInputStream fileInputStream = null;
          try {
              fileInputStream = new FileInputStream("e:\\hello.txt");
              // 从输入流读取一个字节的数据
              // 返回-1表示读取完毕
              while ((readData = fileInputStream.read()) != -1) {
                  System.out.println((char) readData);
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // 关闭文件流
              try {
                  fileInputStream.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  
      @Test
      public void readFile02() {
          // 多字节读取
          byte[] readBuff = new byte[8];
          int readLen = 0;
          FileInputStream fileInputStream = null;
          try {
              fileInputStream = new FileInputStream("e:\\hello.txt");
              // 从输入流读取最多readBuff.length个数据
              // 返回-1表示读取完毕
              // 如果读取正常，返回实际读取的字节数
              while ((readLen = fileInputStream.read(readBuff)) != -1) {
                  System.out.print(new String(readBuff, 0, readLen));
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // 关闭文件流
              try {
                  fileInputStream.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **FileOutputStream介绍**
  
  ```java
  public class FileOutputStream01 {
      @Test
      public void writeFile01() {
          FileOutputStream fileOutputStream = null;
          // 1. new FileOutputStream(filePath) 创建方式，会覆盖原来的内容
          // 2. new FileOutputStream(filePath, true) 创建方式，追加到文件后面
          try {
              fileOutputStream = new FileOutputStream("e:\\a.txt");
              // 写入一个字节
              fileOutputStream.write('H');
              // 写入一个字符串
              String str = "hello world";
              fileOutputStream.write(str.getBytes(StandardCharsets.UTF_8), 0, 4);
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  fileOutputStream.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **FileOutputStream拷贝**
  
  ```java
  public class FileCpy {
      @Test
      public void FileCopy() {
          FileInputStream fileInputStream = null;
          FileOutputStream fileOutputStream = null;
          byte[] readBuff = new byte[8];
          int readLen = 0;
          try {
              fileInputStream = new FileInputStream("e:\\hello.txt");
              fileOutputStream = new FileOutputStream("e:\\a.txt");
              // 一边读一边写
              while ((readLen = fileInputStream.read(readBuff)) != -1) {
                  fileOutputStream.write(readBuff, 0 ,readLen);
              }
              System.out.println("拷贝完成");
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  if (fileInputStream != null) {
                      fileInputStream.close();
                  }
                  if (fileOutputStream != null) {
                      fileOutputStream.close();
                  }
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **FileReader相关方法**
  
  1. new FileReader（File/String）
  2. read：每次读取单个字符，返回该字符值，文件末尾返回-1
  3. read（char[]）：批量读取多个字符到数组，返回读取到的字符数，如果到文件末尾返回-1
  4. new String（char[]）：将char[]转换成String
  5. new String（char[]，off，len）：将char[]的指定部分转换成String
  
  ```java
  public class FileReader01 {
      @Test
      public void readFile01() {
          String filePath = "e:\\hello.txt";
          FileReader fileReader = null;
          int data = 0;
  
          try {
              fileReader = new FileReader(filePath);
              // 循环读取 read 单字符
              while ((data = fileReader.read()) != -1) {
                  System.out.print((char) data);
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  if (fileReader != null) {
                      fileReader.close();
                  }
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  
      @Test
      public void readFile02() {
          String filePath = "e:\\hello.txt";
          FileReader fileReader = null;
          char[] buff = new char[8];
          int readLen = 0;
  
          try {
              fileReader = new FileReader(filePath);
              // 循环读取 read 多字符
              while ((readLen = fileReader.read(buff)) != -1) {
                  System.out.print(new String(buff, 0, readLen));
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  if (fileReader != null) {
                      fileReader.close();
                  }
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **FileWriter常用方法**
  
  1. new FileWriter（File/String）：覆盖模式，相当于流的指针在首端
  2. new FileWriter（File/String，true）：追加模式，相当于流的指针在尾端
  3. write（int）：写入单个字符
  4. write（char[]）：写入指定数组
  5. write（char[]，off，len）：写入指定数组的指定部分
  6. write（String）：写入整个字符串
  7. write（String，off，len）：写入字符串的指定部分
  8. String.toCharArray（）
  
  注意：FileWriter使用后，必须要关闭（close）或刷新（flush），否则写入不到指定文件
  
  ```java
  public class FileWriter01 {
      public static void main(String[] args) {
          String filePath = "e:\\note.txt";
          //创建 FileWriter 对象
          FileWriter fileWriter = null;
          char[] chars = {'a', 'b', 'c'};
          try {
              fileWriter = new FileWriter(filePath);//默认是覆盖写入
              // 3) write(int):写入单个字符
              fileWriter.write('H');
              // 4) write(char[]):写入指定数组
              fileWriter.write(chars);
              // 5) write(char[],off,len):写入指定数组的指定部分
              fileWriter.write("韩顺平教育".toCharArray(), 0, 3);
              // 6) write（string）：写入整个字符串
              fileWriter.write(" 你好北京~");
              fileWriter.write("风雨之后，定见彩虹");
              // 7) write(string,off,len):写入字符串的指定部分
              fileWriter.write("上海天津", 0, 2);
              //在数据量大的情况下，可以使用循环操作.
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
  //对应 FileWriter , 一定要关闭流，或者 flush 才能真正的把数据写入到文件
  //老韩看源码就知道原因.
  /*
              private void writeBytes() throws IOException {
                  this.bb.flip();
                  int var1 = this.bb.limit();
                  int var2 = this.bb.position();
                  assert var2 <= var1;
                  int var3 = var2 <= var1 ? var1 - var2 : 0;
                  if (var3 > 0) {
                      if (this.ch != null) {
                          assert this.ch.write(this.bb) == var3 : var3;
                      } else {
                          this.out.write(this.bb.array(), this.bb.arrayOffset() + var2, var3);
  
                      }
                  }
                  this.bb.clear();
              }
  */
              try {
              //fileWriter.flush();
              //关闭文件流，等价 flush() + 关闭
                  fileWriter.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
          System.out.println("程序结束...");
      }
  }
  ```

### 节点流和处理流

- **介绍**
  
  1. 节点流可以从一个特定的数据源读写数据，如FileReader、FileWriter
  2. 处理流是连接已存在的流之上，为程序提供更为强大的读写功能，如BufferedReader、BufferedWriter

- **节点流和处理流的区别和联系**
  
  1. 节点流是底层流/低级流，直接跟数据源相接
  2. 处理流（包装流）包装节点流，既可以消除不同节点流的的实现差异，也可以提供更方便的方法来完成输入输出
  3. 处理流对节点流进行包装，使用了**修饰器设计模式**，不会直接与数据源相连

- **处理流 - BufferedReader 和 BufferedWriter**
  
  ```java
  public class BufferedReaderANDWriter {
      @Test
      public void bufferedRead() {
          String filePath = "e:\\hello.txt";
          String line;
          BufferedReader bufferedReader = null;
          try {
              // 创建bufferedReader
              bufferedReader = new BufferedReader(new FileReader(filePath));
              // 读取
              //1. bufferedReader.readLine() 是按行读取文件
              //2. 当返回 null 时，表示文件读取完毕
              while ((line = bufferedReader.readLine()) != null) {
                  System.out.println(line);
              }
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  bufferedReader.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
      @Test
      public void bufferedWrite() {
          String filePath = "e:\\ok.txt";
          //创建 BufferedWriter
          //说明:
          //1. new FileWriter(filePath, true) 表示以追加的方式写入
          //2. new FileWriter(filePath) , 表示以覆盖的方式写入
          BufferedWriter bufferedWriter = null;
          try {
              bufferedWriter = new BufferedWriter(new FileWriter(filePath));
              bufferedWriter.write("hello, 韩顺平教育!");
              bufferedWriter.newLine();//插入一个和系统相关的换行
              bufferedWriter.write("hello2, 韩顺平教育!");
              bufferedWriter.newLine();
              bufferedWriter.write("hello3, 韩顺平教育!");
              bufferedWriter.newLine();
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              try {
                  //说明：关闭外层流即可 ， 传入的 new FileWriter(filePath) ,会在底层关闭
                  bufferedWriter.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **处理流 - BufferedInputStream 和 BufferedOutputStream**
  
  ```java
  // 拷贝文件
  public class BufferedOutputStream_ {
      public static void main(String[] args) {
          // String srcFilePath = "e:\\Koala.jpg";
          // String destFilePath = "e:\\hsp.jpg";
          // String srcFilePath = "e:\\0245_韩顺平零基础学 Java_引出 this.avi";
          // String destFilePath = "e:\\hsp.avi";
          String srcFilePath = "e:\\a.java";
          String destFilePath = "e:\\a3.java";
          //创建 BufferedOutputStream 对象 BufferedInputStream 对象
          BufferedInputStream bis = null;
          BufferedOutputStream bos = null;
          try {
              //因为 FileInputStream 是 InputStream 子类
              bis = new BufferedInputStream(new FileInputStream(srcFilePath));
              bos = new BufferedOutputStream(new FileOutputStream(destFilePath));
              //循环的读取文件，并写入到 destFilePath
              byte[] buff = new byte[1024];
              int readLen = 0;
              //当返回 -1 时，就表示文件读取完毕
              while ((readLen = bis.read(buff)) != -1) {
                  bos.write(buff, 0, readLen);
              }
              System.out.println("文件拷贝完毕~~~");
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              //关闭流 , 关闭外层的处理流即可，底层会去关闭节点流
              try {
                  if(bis != null) {
                      bis.close();
                  }
                  if(bos != null) {
                      bos.close();
                  }
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
  ```

- **对象流 - ObjectInputStream 和 ObjectOutputStream**
  
  - **序列化与反序列化**
    
    1. 序列化就是在保存数据时，保存数据的值和数据类型
    2. 反序列化就是在恢复数据时，恢复数据的值和数据类型
    3. 为了让某个类时可序列化的，该类必须实现如下两个接口之一：
       - Serializable    // 标记接口，没有方法
       - Externalizable   // 该接口有方法需要实现
  
  - **对象流介绍**
    
    ObjecInpuStream提供反序列化功能
    
    ObjectOutputStream提供序列化功能
    
    ```java
    public class ObjectOutStream_ {
        @Test
        public void out() {
            // 要注意序列化文件的保存格式
            String filePath = "e:\\data.dat";
            ObjectOutputStream objectOutputStream = null;
    
            try {
                objectOutputStream = new ObjectOutputStream(new FileOutputStream(filePath));
                objectOutputStream.writeInt(100);
                objectOutputStream.writeBoolean(true);
                objectOutputStream.writeChar('a');
                objectOutputStream.writeDouble(12.1);
                objectOutputStream.writeUTF("严明奎");
                objectOutputStream.writeObject(new Dog("puppy"));
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (objectOutputStream != null) {
                    try {
                        objectOutputStream.close();
                        System.out.println("保存完毕");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    
        @Test
        public void in() {
            String filePath = "e:\\data.dat";
            ObjectInputStream objectInputStream = null;
    
            try {
                objectInputStream = new ObjectInputStream(new FileInputStream(filePath));
                System.out.println(objectInputStream.readInt());
                System.out.println(objectInputStream.readBoolean());
                System.out.println(objectInputStream.readChar());
                System.out.println(objectInputStream.readDouble());
                System.out.println(objectInputStream.readUTF());
                System.out.println(objectInputStream.readObject());
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } finally {
                if (objectInputStream != null) {
                    try {
                        objectInputStream.close();
                        System.out.println("读取完成");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
    
    class Dog implements Serializable {
        private String name;
    
        public Dog(String name) {
            this.name = name;
        }
    
        public String getName() {
            return name;
        }
    
        @Override
        public String toString() {
            return "name=" + name;
        }
    }
    ```
  
  - **注意事项**
    
    1. 读写顺序要一致
    2. 序列化对象需实现Serializable
    3. 序列化的类中建议添加SerialVersionUID，为了提高版本兼容性
    4. 序列化对象时，默认将里面所有属性都序列化，除了static和transient成员
    5. 序列化对象时，里面的属性也要实现序列化接口
    6. 序列化具备可继承性
  
  - **标准输入输出流**
    
    |            | 类型          | 默认设备 |
    | ---------- | ----------- | ---- |
    | System.in  | InputStream | 键盘   |
    | System.out | PrintStream | 显示器  |
  
  - **转换流 - InputStreamReader 和 OutputStreamWriter**
    
    1. InputStreamReader可以将InputStream（字节流）转换成Reader（字符流）
    2. OutputStreamWriter可以将OutputStream转换成Writer
    3. 处理纯文本数据时转换为字符流效率更高，还可以指定编码格式
    
    ```java
    public class InputStreamReader_ {
        @Test
        public void input() {
            String filePath = "e:\\a.txt";
            String line;
            BufferedReader bufferedReader = null;
            try {
                // 创建bufferedReader 读取转换的FileInputStream
                bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "utf-8"));
                // 读取
                //1. bufferedReader.readLine() 是按行读取文件
                //2. 当返回 null 时，表示文件读取完毕
                while ((line = bufferedReader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    ```

### 打印流 - PrintStream 和 PrintWriter

```java
public class PrintStream_ {
    @Test
    public void PrintWriter_() {
        PrintWriter printWriter = null;
        try {
            printWriter = new PrintWriter(new FileWriter("e:\\f2.txt"));
            printWriter.print("PrintWriter Test");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // 关闭流，才会写入数据到文件
                printWriter.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Test
    public void PrintStream_() {
        PrintStream out = System.out;
        //在默认情况下，PrintStream 输出数据的位置是 标准输出，即显示器
        /*
        public void print(String s) {
        if (s == null) {
        s = "null";
        }
        write(s);
        }
        */
        try {
            //因为 print 底层使用的是 write , 所以我们可以直接调用 write 进行打印/输出
            out.write("PrintStream Test".getBytes());
            out.close();
            //我们可以去修改打印流输出的位置/设备
            //1. 输出修改成到 "e:\\f1.txt"
            //2. "hello, 韩顺平教育~" 就会输出到 e:\f1.txt
            //3. public static void setOut(PrintStream out) {
            // checkIO();
            // setOut0(out); // native 方法，修改了 out
            // }
            System.setOut(new PrintStream("e:\\f1.txt"));
            System.out.println("PrintStream Test");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Properties类

- **介绍**
  
  1. 专门用于读写配置文件的集合类
     
     配置文件格式：
     
     键1 = 值1
     
     键2 = 值2
  
  2. 键值对不需要空格，值不需要引号，默认类型为String

- **常见方法**
  
  1. load：加载配置文件的键值对到Properties对象
  2. list：将数据显示到指定设备
  3. getProperty（key）：根据键获取值
  4. setProperty（key，value）：设置键值对
  5. store：将Properties对象的键值对储存到配置文件中（idea中的中文默认编码为unicode）

- **properties案例**
  
  ```java
  public class Properties01 {
      public static void main(String[] args) {
          // 使用Properties类来读取
          // 1. 创建对象
          Properties properties = new Properties();
          // 2. 加载指定配置文件
          try {
              properties.load(new FileReader("e:\\mysql.properties"));
          } catch (IOException e) {
              e.printStackTrace();
          }
          //3. 把 k-v 显示到控制台
          properties.list(System.out);
          //4. 根据 key 获取对应的值
          String user = properties.getProperty("user");
          String pwd = properties.getProperty("pwd");
          System.out.println("用户名=" + user);
          System.out.println("密码是=" + pwd);
  
          // 修改 Properties父类时Hashtable，操作与其相同
          properties.setProperty("charset", "utf8");
          properties.setProperty("user", "汤姆");//注意保存时，是中文的 unicode 码值
          properties.setProperty("pwd", "888888");
  
          //将 k-v 存储文件中即可
          try {
              properties.store(new FileOutputStream("src\\mysql2.properties"), null);
          } catch (IOException e) {
              e.printStackTrace();
          }
          System.out.println("保存配置文件成功~");
      }
  }
  ```

## 十七、网络编程

### 网络通信相关概念

- **网络通信**
  
  java.net包下提供了一系列的类或接口

- **ipv4地址分类**
  

- **域名**
  
  www.baidu.com将ip地址映射成域名（HTTP协议）

- **端口号**
  
  1. 概念：用于标识计算机上某个特定的网络程序
  2. 表示形式：整数形式，端口范围0~65535【占两个字节】
  3. 0~1024已经被占用，比如ssh占用22，ftp占用21，http占用80

- **网络通信协议**
  
  
  1. tcp/ip协议
     
     中文名，传输控制协议/因特网互联协议，由网络层的ip协议和传输层的tcp协议组成
     
  
  2. tcp和udp
     
     tcp
     
     1. 使用tcp协议前，须先建立TCP连接，形成数据传输通道
     2. 传输前，采用三次握手方式
     3. 客户端和服务端
     4. 连接中可进行大数据量传输
     5. 传输完毕，需释放已简历的连接，效率低
     
     udp
     
     1. 将数据、源、目的封装成数据包，不需要建立连接
     2. 每个数据包的大小限制在64k内，不适合传输大量数据
     3. 不需要握手连接
     4. 发送数据结束时无需断开连接（释放资源），速度快

### InetAddress类

- **相关方法**
  
  1. getLocalHost：获取本机InetAddress对象
  2. getByName：根据指定主机名/域名获取IP地址对象
  3. getHostName：获取InetAddress对象的主机名
  4. getHostAddress：获取InetAddress对象的地址

- **案例**
  
  ```java
  public class InetAddress01 {
      public static void main(String[] args) {
          // 获取本机InetAddress对象getLocalHost
          try {
              InetAddress localHost = InetAddress.getLocalHost();
              System.out.println(localHost);
          } catch (UnknownHostException e) {
              e.printStackTrace();
          }
          //根据指定主机名/域名获取 ip 地址对象 getByName
          try {
              InetAddress host2 = InetAddress.getByName("BF-201911032247");
              System.out.println(host2);
          } catch (UnknownHostException e) {
              e.printStackTrace();
          }
          //获取 InetAddress 对象的主机名 getHostName
          //获取 InetAddress 对象的地址 getHostAddress
          try {
              InetAddress host3 = InetAddress.getByName("www.hsp.com");
              System.out.println(host3);
              String host3Name = host3.getHostName();
              System.out.println(host3Name);
              String host3Address = host3.getHostAddress();
              System.out.println(host3Address);
          } catch (UnknownHostException e) {
              e.printStackTrace();
          }
      }
  }
  ```

### Socket 网络套接字

- **介绍**
  1. 通信的两端都要有Socket
  2. 网络通信其实就是Socket间的通信
  3. Socket允许程序把网络连接当成一个流，数据在两个Socket间通过IO传输

### TCP网络通信编程

- **基本介绍**
  

- **案例**
  
  ```java
  // 服务端
  public class SocketTCP02Server {
      public static void main(String[] args) {
          try {
              // 在本机的9999端口监听，等待连接
              ServerSocket serverSocket = new ServerSocket(9999);
              System.out.println("服务端在9999端口监听，等待连接。。。");
              // 没有客户端连接9999端口时，程序会阻塞
              // 有客户端连接则会返回Socket对象
              Socket socket = serverSocket.accept();
              System.out.println("服务端 socket = " + socket.getClass());
              // 通过socket.getInputStream 读取客户端写入到数据通道的数据
              InputStream inputStream = socket.getInputStream();
              // IO读取
              byte[] buf = new byte[1024];
              int readLen = 0;
              while ((readLen = inputStream.read(buf)) != -1) {
                  System.out.println(new String(buf, 0, readLen));
              }
              // 关闭流和socket
              inputStream.close();
              socket.close();
              serverSocket.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```
  
  ```java
  // 客户端
  public class SocketTCP01Client {
      public static void main(String[] args) {
          // 连接服务端(IP, 端口)
          try {
              Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
              System.out.println("客户端 socket 返回=" + socket.getClass());
              // 连接上后，生成Socket
              OutputStream outputStream = socket.getOutputStream();
              // 通过输出流，写入数据到数据通道
              outputStream.write("hello, server".getBytes(StandardCharsets.UTF_8));
              // 关闭流对象和socket
              outputStream.close();
              socket.close();
              System.out.println("客户端退出");
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```

- **netstat指令**
  
  1. netstat -an可以查看当前主机网络情况，包括端口监听和网络连接情况
  2. Listening表示某个端口在监听
  3. 如果有一个外部程序（客户端）连接到该端口，就会显示一条连接信息

## 十八、反射

- **介绍**
  
  1. 在运行时分析类的能力
  2. 在运行时检查对象
  3. 实现泛型数组操作代码
  4. 利用Method对象（类似C++中的函数指针）

- **Class类**
  
   运行期间每个对象都有一个**运行时类型标识**，保存这些信息的类名为Class
  getName（）方法可以返回类的名字
  Class.forName（）方法可以获得类名对应的Class对象

- **Constructor对象**
  
  对一个Class对象使用getConstrouctor（）可以获得Constructor对象
  可以通过Constructor类的newInstance（）方法来构造一个实例

- **利用反射分析类的能力**
  
  1. 查看任意对象的内容
     
     getFields（）：返回类中的public成员变量
     
     getDeclaredFields（）：返回类中的所有成员变量
     
     getMethods（）：返回类中的public方法
     
     getDeclaredMethods（）：返回类中的所有方法
     
     getConstrouctors（）：返回类中的public构造器
     
     getDeclaredConstrouctors（）：返回类中的所有构造器
  
  2. 操作对象内容
     
     ```java
     Employee harry = new Employee("harry hacker", 50000, 10 ,1, 1989);
     Class cl = harry.getClass();    // 获得Class对象
     Field f = cl.getDeclaredField("name");    // 获得private String name成员
     f.setAccessible(true);    // 获得访问权限
     Object obj = f.get(harry);    // 获取对应的String对象
     f.set(harry, "david");    // 改变name值
     ```

- **使用反射机制调用任意方法**
  
  Method类的invoke方法允许你调用包装在当前Method对象中的方法
  
  ```java
  public class Method01 {
      public static void main(String[] args) {
          Employee harry = new Employee("harry chou", 6000);
          try {
              Class cl = harry.getClass();// 获得Class对象
              Method m1 = cl.getMethod("getName");// 获得对应的方法
              Method m2 = cl.getMethod("getSalary");
              String n = (String)m1.invoke(harry);// 调用Class对应的方法
              double s = (Double)m2.invoke(harry);
              System.out.println(n);
              System.out.println(s);
          } catch (NoSuchMethodException e) {
              e.printStackTrace();
          } catch (IllegalAccessException e) {
              e.printStackTrace();
          } catch (InvocationTargetException e) {
              e.printStackTrace();
          }
      }
  }
  
  class Employee {
      private String name;
      private double salary;
  
      public Employee(String name, double salary) {
          this.name = name;
          this.salary = salary;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public double getSalary() {
          return salary;
      }
  
      public void setSalary(double salary) {
          this.salary = salary;
      }
  }
  ```

## 十九、Lambda表达式

### 语法

```java
(parameters) -> expression
或
(parameters) ->{ statements; }
```

以下是lambda表达式的重要特征:

- **可选类型声明：**不需要声明参数类型，编译器可以统一识别参数值。
- **可选的参数圆括号：**一个参数无需定义圆括号，但多个参数需要定义圆括号。
- **可选的大括号：**如果主体包含了一个语句，就不需要使用大括号。
- **可选的返回关键字：**如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定表达式返回了一个数值。

### 表达式实例

```java
// 1. 不需要参数,返回值为 5  
() -> 5  

// 2. 接收一个参数(数字类型),返回其2倍的值  
x -> 2 * x  

// 3. 接受2个参数(数字),并返回他们的差值  
(x, y) -> x – y  

// 4. 接收2个int型整数,返回他们的和  
(int x, int y) -> x + y  

// 5. 接受一个 string 对象,并在控制台打印,不返回任何值(看起来像是返回void)  
(String s) -> System.out.print(s)
```

### 函数式接口

对于只有一个抽象方法得接口，需要这种接口得对象时，可以提供一个lambda表达式，这种接口称为函数式接口

```java
public void testLambda() {
        GreetingService gs = message -> System.out.println("hello" + message);
        gs.sayMessage(" lambda");
}

interface GreetingService {
        void sayMessage(String message);
}
```

### 变量作用域

lambda 表达式只能引用标记了 final 的外层局部变量，这就是说不能在 lambda 内部修改定义在域外的局部变量，否则会编译错误。

```java
public class Java8Tester {

   final static String salutation = "Hello! ";

   public static void main(String args[]){
      GreetingService greetService1 = message -> 
      System.out.println(salutation + message);
      greetService1.sayMessage("Runoob");
   }

   interface GreetingService {
      void sayMessage(String message);
   }
}
```

lambda 表达式的局部变量可以不用声明为 final，但是不可被后面的代码修改（即隐性的具有 final 的语义）

```java
int num = 1;  
Converter<Integer, String> s = (param) -> System.out.println(String.valueOf(param + num));
s.convert(2);
num = 5;  // 修改num，引起报错
//报错信息：Local variable num defined in an enclosing scope must be final or effectively 
```

## 二十、面试题

1. **为什么重写 equals 还要重写 hashcode？**
   
   因为equals是通过hashcode来比较的，通过hash计算可以直接定位某个值存储的位置，这样比如比较两集合时不通过hashcode来比较只能遍历依次比较，通过hashcode可以直接确定位置，效率高

2. **== 和 equals 比较的区别**
   
   ==：对于8种基本数据类型，是比较他们的值是否相等；对于引用数据类型，比较他们在堆内存的地址是否相等
   
   equals：默认返回结果是两个对象使用 == 的判断结果；可以重写对象的equals方法

3. **为啥有时会出现 4.0 - 3.6 = 0.40000001 这种现象？**
   
   因为浮点类型采用二进制系统表示，二进制系统种无法精确的表示分数1/10，所以会出现舍入误差
   
   0.1无法精确表示，因为它不能表示成为1/(2^n)的和的形式
   
   如果在数值计算中不允许有任何舍入误差， 就应该使用 BigDecimal类

4. **final 关键字的作用**
   
   可以修饰引用、方法和类
   
   修饰基本数据类型：该数据为常量，值无法修改
   
   修饰引用数据类型：该对象本身可以修改，但指向该对象的地址不能修改
   
   修饰方法：方法无法被子类重写
   
   修饰类：无法被继承

5. **介绍 Java 的集合类**
   
   2大接口：Collection、Map
   
   Collection下有3个子接口：Set、List、Queue
   
   

6. **ArrayList 和 LinkedList 的区别**

7. **描述动态代理的几种实现方式？分别说出相应的优缺点**
   
   代理可以分为 "静态代理" 和 "动态代理"，动态代理又分为 "JDK动态代理" 和 "CGLIB动态代理" 实现。
   **静态代理**：代理对象和实际对象都继承了同一个接口，在代理对象中指向的是实际对象的实例，这样对外暴露的是代理对象而真正调用的是 Real Object
   
   - **优点**：可以很好的保护实际对象的业务逻辑对外暴露，从而提高安全性。
   - **缺点**：不同的接口要有不同的代理类实现，会很冗余
   
   **JDK 动态代理**：
   
   为了解决静态代理中，生成大量的代理类造成的冗余；JDK 动态代理只需要实现 InvocationHandler 接口，重写 invoke 方法便可以完成代理的实现，jdk的代理是利用反射生成代理类 Proxyxx.class 代理类字节码，并生成对象 jdk动态代理之所以**只能代理接口**是因为**代理类本身已经extends了Proxy，而java是不允许多重继承的**，但是允许实现多个接口。
   
   **优点**：解决了静态代理中冗余的代理实现类问题。
   
   **缺点**：JDK 动态代理是基于接口设计实现的，如果没有接口，会抛异常。
   
   **CGLIB 代理**：
   
   由于 JDK 动态代理限制了只能基于接口设计，而对于没有接口的情况，JDK方式解决不了；CGLib 采用了非常底层的字节码技术，其原理是通过字节码技术为一个类创建子类，并在子类中采用方法拦截的技术拦截所有父类方法的调用，顺势织入横切逻辑，来完成动态代理的实现。实现方式实现 MethodInterceptor 接口，重写 intercept 方法，通过 Enhancer 类的回调方法来实现。但是CGLib在创建代理对象时所花费的时间却比JDK多得多，所以对于单例的对象，因为无需频繁创建对象，用CGLib合适，反之，使用JDK方式要更为合适一些。 同时，由于CGLib由于是采用动态创建子类的方法，对于final方法，无法进行代理。
   
   **优点**：没有接口也能实现动态代理，而且采用字节码增强技术，性能也不错。
   
   **缺点**：技术实现相对难理解些。

