# MyBatis 笔记

## 1 MyBatis 简介

### 1.1 MyBatis 特性

1）MyBatis 支持定制化 SQL、存储过程及高级映射的持久层框架

2）封装了 Jdbc，但避免了写 Jdbc 代码

3）使用简单的 xml 或注解用于配置和原始映射

4）半自动的 ORM 对象

### 1.2 与其他持久层技术对比

- JDBC
  - SQL 夹杂在 java 代码中，耦合度高
  - 维护不易，若修改 SQL 语句，则需重新编译
- Hibernate 和 JPA
  - 操作简便
  - 实现常难 SQL 语句需要绕开框架，自己编写
  - 全映射的全自动框架，实现部分映射比较困难
  - 反射操作多，数据库性能下降
- MyBatis
  - 轻量级
  - SQL 与 Java 代码分开，修改 SQL 语句只需修改映射文件
  - 开发效率稍逊 Hibernate

## 2 搭建 MyBatis

### 2.1 配置 Maven 依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>ymk.learnssm</groupId>
  <artifactId>mybatis_helloworld</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.30</version>
    </dependency>
<!--    <dependency>-->
<!--      <groupId>org.projectlombok</groupId>-->
<!--      <artifactId>lombok</artifactId>-->
<!--      <optional>true</optional>-->
<!--    </dependency>-->
  </dependencies>

  <!-- 配置阿里云仓库 -->
  <repositories>
    <repository>
      <id>aliyun-repos</id>
      <url>https://maven.aliyun.com/repository/public</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>
  </repositories>
  <pluginRepositories>
    <pluginRepository>
      <id>aliyun-repos</id>
      <url>https://maven.aliyun.com/repository/public</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </pluginRepository>
  </pluginRepositories>

</project>
```

### 2.2 创建 MyBatis 核心配置文件

mybatis-config.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

  <typeAliases>
    <typeAlias alias="User" type="ymk.learnssm.entity.User" />
  </typeAliases>

  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC" />
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/test1?serverTimezone=GMT%2b8" />
        <property name="username" value="root" />
        <property name="password" value="Yo*tja>AF96;" />
      </dataSource>
    </environment>
  </environments>

  <!-- 引入 mybatis 映射文件 -->
  <mappers>
    <mapper resource="mappers/UserMapper.xml" />
  </mappers>
</configuration>
```

### 2.3 创建 mapper 接口

UserMapper.java

```java
public interface UserMapper {

    int insertUser();
}
```

### 2.4 配置 mapper 映射

UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org/DTD Mapper 3.0" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="ymk.learnssm.mapper.UserMapper">
  <!--
      两个一致
      1. mapper 接口的全类名和 namespace 保持一致
      2. mapper 接口中的方法方法名和映射文件中的 sql 的 id 保持一致
  -->

  <!--  int insertUser();-->
  <insert id="insertUser">
    insert into user(id, username, password, nickname, email, phone, address)
    values (20, 'admin', '123456', '管理员', '1252480844@qq.com', '13905142704', '江苏南京')
  </insert>

  <!-- id：返回的是所有对象的Map集合，type：每个对象是User类 -->
  <!--  <resultMap id="userMap" type="User">-->

  <!--id表示主键字段，property：User类中的属性，column：数据表中的字段，javaType：Use类中属性的类型 -->
  <!--result表示对象的任何一个属性字段-->
  <!--    <id property="id" column="id" javaType="java.lang.Integer"></id>-->
  <!--    <result property="username" column="username" javaType="java.lang.String">-->
  <!--    </result>-->
  <!--  </resultMap>-->
  <!-- useGeneratedKeys：（仅对insert有用），作用：取出由数据库表内部生成的主键值。默认值： false。
   比如：数据库管理系统的自动递增字段）-->

  <!-- keyProperty： （仅对insert有用）作用：用来标记一个属性，MyBatis 会设置它的值。默认：不设置。
  配合useGeneratedKeys使用，单独使用一个取的值为null -->

  <!--  <insert id="insertUser" useGeneratedKeys="true" keyProperty="id">-->
  <!--    insert into user (username, password, account)-->
  <!--    values (#{username}, #{password}, #{account})-->
  <!--  </insert>-->
  <!--  1、在各种标签中的id属性必须和接口中的方法名相同 ， id属性值必须是唯一的，不能够重复使用。-->
  <!--  2、 parameterType属性指明查询时使用的参数类型，resultType属性指明查询返回的结果集类型-->
  <!--  3、#{ }中的内容，为占位符，当参数为某个JavaBean时，表示放置该Bean对象的属性值-->

  <!--  <update id="updateUser" >-->
  <!--    update user set username=#{username},password=#{password},account=#{account} where id=#{id}-->
  <!--  </update>-->

  <!--  <delete id="deleteUser" parameterType="int">-->
  <!--    delete from user where id=#{id}-->
  <!--  </delete>-->

  <!--  <select id="selectUserById" parameterType="int" resultMap="userMap">-->
  <!--    select * from user where id=#{id}-->
  <!--  </select>-->

  <!--  <select id="selectAllUser"  resultMap="userMap">-->
  <!--    select * from user-->
  <!--  </select>-->

</mapper>
```

### 2.5 获取 sql 会话对象 测试功能

Test.java

```java
public class MyBatisTest {

    @Test
    public void testInsertUser() throws IOException {
        // 获取核心配置文件的输入流
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        // 获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        // 获取SqlSessionFactory对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(inputStream);
        // 获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        // 获取 UserMapper 的代理实现类对象
        UserMapper userMapperImpl = sqlSession.getMapper(UserMapper.class);
        // 测试插入功能
        System.out.println(userMapperImpl.insertUser());
    }

}
```

## 3 完善 MyBatis

### 3.1 添加查询功能

BookMapper.java

带参数的查询语句，根据id查询

```java
public interface BookMapper {

    Book getUserById(@Param("id") int id);
}
```

BookMapper.xml

xml中获取参数 #{参数名}

resultType 把返回的数据转换成 Book 类型

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org/DTD Mapper 3.0" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="ymk.learnssm.mapper.BookMapper">

  <!-- Book getUserById(@Param("id") int id) -->
  <select id="getUserById" resultType="ymk.learnssm.entity.Book">
    select *
    from book where userid = #{id};
  </select>

</mapper>
```

## 4 MyBatis 核心配置文件（mybatis-config.xml）

### 4.1 核心配置文件之 environment

```xml
<!--
    environments: 配置连接数据库的环境
    属性:
    default: 设置默认使用的环境的 id
  -->
  <environments default="development">
    <!--
      environment: 设置一个具体的数据库的环境
      属性:
      id: 设置环境的唯一标识（不能重复）
    -->
    <environment id="development">
      <!--
        transactionManager: 设置事务管理器
        属性:
        type: 设置事务管理的方式
        type="JDBC | MANAGED"
        JDBC: 表示使用原生的事务管理方式
        MANAGED: 被管理，例如 Spring
      -->
      <transactionManager type="JDBC"/>
      <!--
        dataSource: 设置事数据源
        属性:
        type: 设置数据源的类型
        type="POOLED | UNPOOLED | JNDI"
        POOLED: 表示使用数据库连接池
        UNPOOLED: 表示不使用数据库连接池
        JNDI: 表示使用上下文中的数据源
      -->
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/test1?serverTimezone=GMT%2b8"/>
        <property name="username" value="root"/>
        <property name="password" value="Yo*tja>AF96;"/>
      </dataSource>
    </environment>
  </environments>
```

### 4.2 核心配置文件之 properties

```xml
<!-- 引入 jdbc 配置文件，此后就可以使用 ${key} 的方式来访问 value -->
<properties resource="jdbc.properties"/>
```

把 jdbc 的配置文件写在一个单独的文件中

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test1?serverTimezone=GMT%2b8
jdbc.username=root
jdbc.password=Yo*tja>AF96;
```

### 4.3 核心配置文件之 typeAliases

```xml
<!-- 类型别名用别名来代替一个复杂的名字 -->
<typeAliases>
  <typeAlias alias="User" type="ymk.learnssm.entity.User"/>
  <typeAlias alias="Book" type="ymk.learnssm.entity.Book"/>
  <!-- 通过包设置别名，指定包下的所有类型都有默认的别名，即类名不区分大小写 -->
  <package name="ymk.learnssm.entity"/>
</typeAliases>
```

### 4.4 核心配置文件之 mappers

```xml
<!-- 引入 mybatis 映射文件 -->
<mappers>
  <!--
    以包的方式引入映射文件，但是必须满足两个条件:
    1. mapper 接口和映射文件所在的包必须一致
    2. mapper 接口的名字和映射文件必须一致
   -->
  <!--    <mapper resource="mappers/UserMapper.xml"/>-->
  <!--    <mapper resource="mappers/BookMapper.xml"/>-->
  <package name="ymk.learnssm.mapper"/>
</mappers>
```

## 5 MyBatis 获取参数值的两种方式

MyBatis 获取参数值的两种方式：

1. ${}：字符串拼接
2. #{}：占位符复制

### 5.1 获取单个参数情况

UserMapper.java

```java
public interface UserMapper {

    List<User> getUserByUsername(String username);

}
```

UserMapper.xml

```xml
<!-- 使用 #{} -->
<select id="getUserByUsername" resultType="User">
  select *
  from user where username = #{username单个参数里面输什么无所谓};
</select>

<!-- 使用 ${} -->
<select id="getUserByUsername" resultType="User">
  select *
  from user where username = '${username}';
</select>
```

### 5.2 获取多个参数情况

1. 以 arg0、arg1... 存储传入的多个参数

```xml
<!-- User checkLogin(String username, String password); -->
<select id="checkLogin" resultType="User">
  select *
  from user
  where username = #{arg0}
    and password = #{arg1};
</select>
```

2. 以 param1、param2... 存储传入的多个参数

```xml
<!-- User checkLogin(String username, String password); -->
<select id="checkLogin" resultType="User">
  select *
  from user
  where username = #{param1};
    and password = #{param2};
</select>
```

3. 用 @Param()注解 为传入的参数起名

```java
User checkLogin(@Param("username") String username, @Param("password") String password);
```

```xml
<!-- User checkLogin(String username, String password); -->
<select id="checkLogin" resultType="User">
  select *
  from user
  where username = #{username}
    and password = #{password};
</select>
```

4. 直接传入参数的键值对，可以直接通过键名获取

```java
@Test
public void testCheckLoginByMap() throws IOException {
    // 获取SqlSession对象
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    // 获取 UserMapper 的代理实现类对象
    UserMapper userMapperImpl = sqlSession.getMapper(UserMapper.class);
    // 测试插入功能
    Map map = new HashMap<>();
    map.put("username", "admin");
    map.put("password", "admin");
    User user = userMapperImpl.checkLoginByMap(map);
    System.out.println(user);
}
```

```xml
<select id="checkLoginByMap" resultType="User">
  select *
  from user
  where username = #{username}
    and password = #{password};
</select>
```

5. 可以通过实体类直接获取相对应的属性值

## 6 MyBatis 查询

### 6.1 查询返回多条数据 @MapKey()

将某个字段的值作为大 Map 的 key

```java
@MapKey("id")
Map<String, Object> getUserByIdToMap(@Param("id") Integer id);
```

### 6.2 查询返回多条数据 List\<map>

用一个存有多个 Map 的 List 集合

```java
List<Map<String, Object>> getUserByIdToMap(@Param("id") Integer id);
```

## 7 Mybatis 特殊功能

### 7.1 模糊查询

1. 单引号内使用 #{} 会导致 ？ 被识别为字符串，无法替换

```xml
<select id="getUserByLike" resultType="User">
  select * from user where username like '%${mohoName}%';
</select>
```

2. 使用 concat 拼接

```xml
<select id="getUserByLike" resultType="User">
    select * from user where username like concat('%',#{mohoName},'%');
  </select>
```

3. 使用双引号 “”

```xml
<select id="getUserByLike" resultType="User">
  select * from user where username like "%"#{mohoName}"%";
</select>
```

### 7.2 批量删除

1. 使用 ${} 字符串替换

```xml
<delete id="batchDelete">
  delete
  from user
  where id in (${ids});
</delete>
```

```java
userMapperImpl.batchDelete("3,4");
```

### 7.3 动态设置表名

```xml
<!-- List<User> getUserFromTable(@Param("tableName") String tableName); -->
  <select id="getUserFromTable" resultType="User">
    select *
    from ${tableName};
  </select>
```

```java
List list = userMapperImpl.getUserFromTable("user");
```

### 7.4 获取自增的主键

```xml
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
  insert into user
  values (null, #{username}, #{password}, #{nickname}, #{email}, #{phone}, #{address})
</insert>
```

## 8 搭建 MyBatis 框架

### 8.1 处理字段名和属性名不一致的情况

1. **更改 sql 语句，起字段别名**

数据库的数据名

![image-20221104140010926](./img/MyBatis笔记.assets/image-20221104140010926.png)

实体类字段名

```java
private Integer empId;

private String empName;

private Integer age;

private String gender;
```

sql 语句使用别名

```xml
<select id="getEmpById" resultType="Emp">
  select emp_id empId,emp_name empName,emp_age age,emp_gender gender from emp where emp_id = #{empId}
</select>
```

2. **使用 mybatis 核心配置文件，下划线驼峰替换**

```xml
<settings>
  <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

3. **配置 resultmap 映射**

```xml
<mapper namespace="ymk.learnssm.mapper.EmpMapper">

  <!-- column对应 sql 字段，property 对应 -->
  <resultMap id="empResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="emp_age" property="empAge"></result>
    <result column="emp_gender" property="empGender"></result>
  </resultMap>

  <!-- Emp getEmpById(@Param("empId") Integer empId); -->
  <select id="getEmpById" resultMap="empResultMap">
    select * from emp where emp_id = #{empId};
  </select>
    
</mapper>
```

### 8.2 多对一映射处理

1. **使用级联处理多对一映射**

联表查询语句如下

```xml
<select id="getEmpAndDeptById" resultMap="empDeptResultMap">
  select emp.*, dept.*
  from emp
         left join dept on emp.dept_id = dept.dept_id
  where emp.emp_id = #{empId};
</select>
```

设置resultmap

```xml
<resultMap id="empDeptResultMap" type="Emp">
  <id column="emp_id" property="empId"></id>
  <result column="emp_name" property="empName"></result>
  <result column="emp_age" property="empAge"></result>
  <result column="emp_gender" property="empGender"></result>
  <result column="dept_id" property="dept.deptId"></result>
  <result column="dept_name" property="dept.deptName"></result>
</resultMap>
```

查询结果

```bash
Emp{empId=1, empName='张三', empAge=20, empGender='男', dept=Dept{deptId=1, deptName='A'}}
```

2. **使用 association 处理多对一映射关系**

在 resultmap 中加入 association 属性

```xml
<resultMap id="empDeptAssResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="emp_age" property="empAge"></result>
    <result column="emp_gender" property="empGender"></result>
    <!--
      association：处理多对一的映射关系
      property：设置需要处理映射关系的属性和属性名
      javaType：设置要处理的属性类型
    -->
    <association property="dept" javaType="Dept">
      <id column="dept_id" property="deptId"></id>
      <result column="dept_name" property="deptName"></result>
    </association>
  </resultMap>
```

3. **使用分步查询处理多对一映射关系（执行两条查询语句）**

DeptMapper.xml

```xml
<mapper namespace="ymk.learnssm.mapper.DeptMapper">

  <resultMap id="deptMap" type="Dept">
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
  </resultMap>

  <select id="getDeptById" resultMap="deptMap">
    select *
    from dept
    where dept_id = #{id};
  </select>
</mapper>
```

EmpMapper.xml

```xml
<resultMap id="empDeptByStepResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="emp_age" property="empAge"></result>
    <result column="emp_gender" property="empGender"></result>
    <!--
      association：处理多对一的映射关系
      property：设置需要处理映射关系的属性和属性名
      select：设置写一步的查询语句的唯一标识
      column：将查询的字段作为下一步查询语句的的 sql 输入
    -->
    <association property="dept"
                 select="ymk.learnssm.mapper.DeptMapper.getDeptById"
                 column="dept_id"></association>
  </resultMap>

<select id="getEmpAndDeptByStep" resultMap="empDeptByStepResultMap">
    select emp.*, dept.*
    from emp
           left join dept on emp.dept_id = dept.dept_id
    where emp.emp_id = #{empId};
</select>
```

### 8.3 延迟加载

分步查询可以实现延迟加载

1. mybatis 设置中开启延迟加载

```xml
<settings>
  <!-- 开启延迟加载 -->
  <setting name="lazyLoadingEnabled" value="true"/>
  <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

2. 测试语句

```java
@Test
public void testGetEmpAndDeptByStep() {
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();

    EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

    Emp emp = mapper.getEmpAndDeptByStep(1);

    System.out.println(emp.getempName());
}
```

得到结果，当不需要 dept 信息时，就没有执行下一个查询语句

```bash
[DEBUG][2022-11-06 17:18:56 816][ymk.learnssm.mapper.EmpMapper.getEmpAndDeptByStep]-[==>  Preparing: select emp.*, dept.* from emp left join dept on emp.dept_id = dept.dept_id where emp.emp_id = ?;]
[DEBUG][2022-11-06 17:18:56 834][ymk.learnssm.mapper.EmpMapper.getEmpAndDeptByStep]-[==> Parameters: 1(Integer)]
[DEBUG][2022-11-06 17:18:56 882][ymk.learnssm.mapper.EmpMapper.getEmpAndDeptByStep]-[<==      Total: 1]
```

**还可以设置 association 的 fetchType 属性来实现延迟加载还是立即加载**

```xml
<resultMap id="empDeptByStepResultMap" type="Emp">
  <id column="emp_id" property="empId"></id>
  <result column="emp_name" property="empName"></result>
  <result column="emp_age" property="empAge"></result>
  <result column="emp_gender" property="empGender"></result>
  <!--
    association：处理多对一的映射关系
    property：设置需要处理映射关系的属性和属性名
    select：设置写一步的查询语句的唯一标识
    column：将查询的字段作为下一步查询语句的的 sql 输入
  -->
  <association property="dept" fetchType="lazy"
               select="ymk.learnssm.mapper.DeptMapper.getDeptById"
               column="dept_id"></association>
</resultMap>
```

### 8.4 一对多映射

1. **通过 collection 处理一对多映射**

```xml
<resultMap id="deptAssMap" type="Dept">
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
    <collection property="empList" ofType="Emp">
      <id column="emp_id" property="empId"></id>
      <result column="emp_name" property="empName"></result>
      <result column="emp_age" property="empAge"></result>
      <result column="emp_gender" property="empGender"></result>
    </collection>
</resultMap>

<select id="getDeptAndEmpById" resultMap="deptAssMap">
  select *
  from dept
         left join emp on dept.dept_id = emp.emp_id
  where dept.dept_id = #{id};
</select>
```

2. **通过分步查询处理一对多映射**

sql 语句

```xml
<resultMap id="deptAssMap" type="Dept">
  <id column="dept_id" property="deptId"></id>
  <result column="dept_name" property="deptName"></result>
  <collection property="empList" ofType="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="emp_age" property="empAge"></result>
    <result column="emp_gender" property="empGender"></result>
  </collection>
</resultMap>

<select id="getDeptAndEmpByStep" resultMap="deptStepMap">
    select *
    from dept
           left join emp on dept.dept_id = emp.emp_id
    where dept.dept_id = #{id};
  </select>
```

step one

```java
/**
 * 通过分步查询门以及部门中的员工信息
 *
 * @param id
 * @return
 */
Dept getDeptAndEmpByStep(@Param("id") Integer id);
```

step two

```java
/**
 * 查询员工信息合集 用于分步查询
 *
 * @param empId
 * @return
 */
List<Emp> getEmpListById(@Param("deptId") Integer deptId);
```

## 9 动态 SQL

根据条件动态拼接 sql 语句，解决字符串拼接痛点

### 9.1 if

```java
/**
 * 根据条件查询员工信息
 * @param emp
 * @return
 */
List<Emp> getEmpListByCondition(Emp emp);
```

条件查询，使用 if 进行拼接

```xml
<resultMap id="empDeptAssResultMap" type="Emp">
  <id column="emp_id" property="empId"></id>
  <result column="emp_name" property="empName"></result>
  <result column="emp_age" property="empAge"></result>
  <result column="emp_gender" property="empGender"></result>
  <!--
    association：处理多对一的映射关系
    property：设置需要处理映射关系的属性和属性名
    javaType：设置要处理的属性类型
  -->
  <association property="dept" javaType="Dept">
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
  </association>
</resultMap>

<select id="getEmpListByCondition" resultMap="empDeptAssResultMap">
  select * from emp left join dept on emp.dept_id = dept.dept_id where
  <if test="empName != null and empName != ''">
    emp_name = #{empName}
  </if>
  <if test="empAge != null and empAge != ''">
    and emp_age = #{empAge}
  </if>
  <if test="empGender != null and empGender != ''">
    and emp_gender = #{empGender}
  </if>
</select>
```

### 9.2 where

where 标签会自动判断条件标签是否成立 不成立则不拼接 where 并且where 标签还会自动删除前面多余的 and

```xml
<select id="getEmpListByCondition" resultMap="empDeptAssResultMap">
  select * from emp left join dept on emp.dept_id = dept.dept_id
  <where>
    <if test="empName != null and empName != ''">
      emp_name = #{empName}
    </if>
    <if test="empAge != null and empAge != ''">
      and emp_age = #{empAge}
    </if>
    <if test="empGender != null and empGender != ''">
      and emp_gender = #{empGender}
    </if>
  </where>
</select>
```

### 9.3 trim

trim 可以自动删除后面多余的 and

prefix，suffix：在标签内容前或后添加指定内容

prefixOverrides，suffixOverrides：在标签内容的前或后去除指定内容

```xml
<select id="getEmpListByCondition" resultMap="empDeptAssResultMap">
    select * from emp left join dept on emp.dept_id = dept.dept_id
    <trim prefix="where" suffixOverrides="and">
      <if test="empName != null and empName != ''">
        emp_name = #{empName} and
      </if>
      <if test="empAge != null and empAge != ''">
        emp_age = #{empAge} and
      </if>
      <if test="empGender != null and empGender != ''">
        emp_gender = #{empGender}
      </if>
    </trim>
  </select>
```

### 9.4 choose、when、otherwise

choose when 只要符合第一个就只会加上第一个条件，下面的条件都不会判断

相当于 if。。。else if 。。。else

```xml
<select id="getEmpListByChoose" resultType="Emp">
  select * from emp
  <where>
    <choose>
      <when test="empName != null and empName != ''">
        emp_name = #{empName}
      </when>
      <when test="">
        emp_age = #{empAge}
      </when>
      <when test="">
        emp_gender = #{empGender}
      </when>
    </choose>
  </where>
</select>
```

```java
@Test
public void testGetEmpByChoose() {
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    DynamicSqlMapper mapper = sqlSession.getMapper(DynamicSqlMapper.class);
    Emp emp = new Emp(null, "张三", 20, "");
    System.out.println(mapper.getEmpListByChoose(emp));
}
```

结果为

```bash
[Emp{empId=1, empName='张三', empAge=20, empGender='男', dept=null}, Emp{empId=5, empName='张三', empAge=21, empGender='女', dept=null}]
```

### 9.5 foreach

1. 批量添加功能

```java
/**
 * 批量添加用户
 * @param empList
 * @return
 */
int insertMoreEmp(@Param("empList") List<Emp> empList);
```

**foreach 的 separator 设置多个赋值之间的分隔符**

```xml
<insert id="insertMoreEmp">
  insert into emp values
  <foreach collection="empList" item="emp" separator=",">
    (#{emp.empId},#{emp.empName},#{emp.empAge},#{emp.empGender},null)
  </foreach>
</insert>
```

2. 批量删除功能

```java
/**
 * 批量删除功能
 * @param empIds
 * @return
 */
int deleteMoreEmp(@Param("empIds") Integer[] empIds);
```

open 表示循环的内容以什么开始

close 表示循环的内容以什么结束

```xml
<delete id="deleteMoreEmp">
    delete from emp where emp_id in
    <foreach collection="empIds" item="empId" separator="," open="(" close=")">
      #{empId}
    </foreach>
</delete>
```

或者

```xml
<delete id="deleteMoreEmp">
    delete from emp where
    <foreach collection="empIds" item="empId" separator="or">
      emp_id = #{empId}
    </foreach>
  </delete>
```

使用 or 当作分隔符

### 9.6 sql

sql 标签表示代码片段

可以用 include 标签来引用

```xml
<sql id="empColumns">
  emp_id,emp_name,emp_age,emp_gender,dept_id
</sql>

<select id="getEmpListByCondition" resultMap="empDeptAssResultMap">
  select <include refid="empColumns"></include> from emp left join dept on emp.dept_id = dept.dept_id
  <trim prefix="where" suffixOverrides="and">
    <if test="empName != null and empName != ''">
      emp_name = #{empName} and
    </if>
    <if test="empAge != null and empAge != ''">
      emp_age = #{empAge} and
    </if>
    <if test="empGender != null and empGender != ''">
      emp_gender = #{empGender}
    </if>
  </trim>
</select>
```

## 10 MyBatis 缓存

### 10.1 一级缓存

- **介绍**

  MyBatis 的一级缓存是 sqlSession 级别的，通过同一个 SqlSession 查询的数据会被缓存，再次使用同一个 SqlSession 查询同一条数据，会从缓存中获取

- 一级缓存失效的情况
  1. 不同的 SqlSession 对应不同的一级缓存
  2. 同一个 SqlSession 但是查询条件不同
  3. 同一个 SqlSession 两次查询期间执行了任意一次增删查改操作
  4. 同一个 SqlSession 两次查询期间手动清空了缓存

### 10.2 二级缓存

- **介绍**

  二级缓存是 SqlSessionFactory 级别，通过同一个 SqlSessionFactory 创建的 SqlSession 查询的结果会被缓存，此后若再次执行相同的查询语句，结果会从缓存中获取

- **二级缓存开启条件**：

  1. 在核心配置文件中全局属性 cacheEnabled="true" （默认为true）

  2. 在映射文件配置文件中设置标签\<cache/>

     ```xml
     <mapper namespace="ymk.learnssm.mapper.CacheMapper">
     
       <cache/>
     
     </mapper>
     ```

  3. **二级缓存必须在 SqlSession 关闭或提交之后有效**

     ```java
     sqlSession.close();
     ```

  4. 查询的数据所转换的实体类型必须实现序列化的接口

     ```java
     public class Emp implements Serializable {
     }
     ```

- **二级缓存失效的情况**

  两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效

### 10.3 二级缓存相关配置文件

```xml
<cache eviction="" flushInterval="" size="" readOnly="" blocking="" type=""/>
```

1. eviction 缓存回收策略 默认 LRU

   - LRU：最近最少使用的，一处最长时间不配使用的对象
   - FIFO：先进先出，按对象进入缓存的顺序来移出他们
   - SOFT：软引用，移出基于垃圾回收器状态和软引用规则的对象
   - WEAK：弱引用，更积极地移出基于垃圾收集器状态和弱引用规则的对象

2. flushInterval 刷新间隔，单位毫秒

   默认情况是不设置，调用语句时刷新

3. size 引用数目

   代表缓存可以存储多少个对象，太大容易导致内存溢出

4. readOnly 只读 默认 false

   - true：只读缓存 会给所有调用者返回缓存对象的相同实例
   - false：独写缓存，会返回缓存对象的拷贝（通过序列化）。慢但是安全

### 10.4 MyBatis 缓存查询顺序

1. 先查询二级缓存，因为二级缓存中可能会有其他 SqlSession 查出来的数据
2. 二级缓存没有再查一级缓存
3. 一级缓存也没有，则查询数据库

注：SqlSession 关闭后，一级缓存的数据会写入二级缓存

### 10.5 整合第三方缓存 EHcache

二级缓存可以使用第三方的缓存

## 11 MyBatis 逆向工程

### 11.1 简洁版

正向工程：先创建 java 实体类，由框架负责根据实体类生成数据库表。Hibernate 是支持正向工程的

逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成资源

1. 配置 maven,添加 mybatis 逆向插件及其依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>ymk.learnssm</groupId>
  <artifactId>mybatis_helloworld</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
    </dependency>
    <!-- mybatis-generator -->
    <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.7</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.30</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>RELEASE</version>
      <scope>compile</scope>
    </dependency>

    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
    <!--    <dependency>-->
<!--      <groupId>org.projectlombok</groupId>-->
<!--      <artifactId>lombok</artifactId>-->
<!--      <optional>true</optional>-->
<!--    </dependency>-->
  </dependencies>

  <build>
    <plugins>

      <plugin>
        <groupId>org.mybatis.generator</groupId>
        <artifactId>mybatis-generator-maven-plugin</artifactId>
        <version>1.4.0</version>

        <!-- 插件的依赖 -->
        <dependencies>
          <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.30</version>
          </dependency>
          <dependency>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-core</artifactId>
            <version>1.4.0</version>
          </dependency>
        </dependencies>

      </plugin>

    </plugins>
  </build>


  <!-- 配置阿里云仓库 -->
  <repositories>
    <repository>
      <id>aliyun-repos</id>
      <url>https://maven.aliyun.com/repository/public</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>
  </repositories>
  <pluginRepositories>
    <pluginRepository>
      <id>aliyun-repos</id>
      <url>https://maven.aliyun.com/repository/public</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </pluginRepository>
  </pluginRepositories>

</project>
```

2. 添加 generatorConfig.xml 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
    PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
    "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>



  <context id="DB2Tables" targetRuntime="MyBatis3Simple">


    <!-- 数据库连接驱动类,URL，用户名、密码 -->
    <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                    connectionURL="jdbc:mysql://localhost:3306/test1?serverTimezone=GMT%2b8"
                    userId="root" password="Yo*tja>AF96;">
    </jdbcConnection>

    <javaModelGenerator targetPackage="ymk.learnssm.entity" targetProject=".\src\main\java">
      <!-- 在targetPackage的基础上，根据数据库的schema再生成一层package，最终生成的类放在这个package下，默认为false -->
      <property name="enableSubPackages" value="true"/>
      <!-- 设置是否在getter方法中，对String类型字段调用trim()方法-->
      <property name="trimStrings" value="true"/>
    </javaModelGenerator>

    <!-- 生成xml映射文件：包名(targetPackage)、位置(targetProject) -->
    <sqlMapGenerator targetPackage="ymk.learnssm.mapper" targetProject=".\src\main\resources">
      <property name="enableSubPackages" value="true"/>
    </sqlMapGenerator>

    <!-- 生成DAO接口：包名(targetPackage)、位置(targetProject) -->
    <javaClientGenerator type="XMLMAPPER" targetPackage="ymk.learnssm.mapper" targetProject=".\src\main\java">
      <property name="enableSubPackages" value="true"/>
    </javaClientGenerator>

    <!-- 要生成的表：tableName - 数据库中的表名或视图名，domainObjectName - 实体类名 -->
    <table tableName="emp" domainObjectName="Emp">
    </table>
    <table tableName="dept" domainObjectName="Dept">
    </table>

  </context>
</generatorConfiguration>
```

### 11.2 奢华版

```xml
<context id="DB2Tables" targetRuntime="MyBatis3">
```

## 12 分页功能

**参数：**limit index pageSize

pageSize：每页显示的条数

pageNum：当前页的页码

index：当前页的起始索引，index=（pageNum-1）*pageSize

count：总数据

totalPage：总页数

page

```bash
Page{count=true, pageNum=1, pageSize=4, startRow=0, endRow=4, total=20, pages=5, reasonable=false, pageSizeZero=false}
[Emp{empId=1, empName='a', empAge=null, empGender='null', deptId=null}, 
Emp{empId=2, empName='b', empAge=null, empGender='null', deptId=null}, 
Emp{empId=3, empName='c', empAge=null, empGender='null', deptId=null}, 
Emp{empId=4, empName='d', empAge=null, empGender='null', deptId=null}]

```

```bash
PageInfo{pageNum=1, pageSize=4, size=4, startRow=1, endRow=4, total=20, pages=5, list=Page{count=true, pageNum=1, pageSize=4, startRow=0, endRow=4, total=20, pages=5, reasonable=false, pageSizeZero=false}
[Emp{empId=1, empName='a', empAge=null, empGender='null', deptId=null}, 
Emp{empId=2, empName='b', empAge=null, empGender='null', deptId=null}, 
Emp{empId=3, empName='c', empAge=null, empGender='null', deptId=null}, 
Emp{empId=4, empName='d', empAge=null, empGender='null', deptId=null}], 
prePage=0, nextPage=2, isFirstPage=true, isLastPage=false, hasPreviousPage=false, hasNextPage=true, navigatePages=5, navigateFirstPage=1, navigateLastPage=5, navigatepageNums=[1, 2, 3, 4, 5]}

```

