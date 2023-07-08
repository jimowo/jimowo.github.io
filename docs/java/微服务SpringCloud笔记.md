# 微服务SpringCloud笔记

## 0 微服务架构理论

### 介绍

微服务架构提倡将单一的应用程序划分成一组小的服务，服务之间互相协调，为用户提供最终价值。每个服务运行在**独立的进程**中，服务与服务间采用轻量级的通信机制互相协作。

### 微服务的组成

1. 服务注册与开发 eureka springboot
2. 服务调用 feign
3. 服务熔断 hystrix
4. 负载均衡 ribbon
5. 服务降级 hystrix
6. 服务消息队列
7. 配置管理中心 spring cloud config 
8. 服务网关 zuul
9. 服务监控
10. 全链路追踪
11. 自动化构建部署
12. 服务定时任务、调度操作

### SpringCloud 简介

分布式微服务架构的一站式解决方案 ![img](https://pic2.zhimg.com/80/v2-7f707a632b189c2a9cd7af1c3f63f091_1440w.webp)

- **路由网关 Spring Cloud Zuul**

Zuul 是作为微服务系统的网关组件，致力于动态路由、过滤、监控、弹性伸缩和安全。

- **服务注册和发现 Eureka**

Eureka 是作为微服务系统的服务注册与发现组件，提供服务注册和发现功能。

- **网络请求 RestTemplate**

RestTemplate 是一个访问 RESTful API 接口的网络请求框架。

- **负载均衡 Ribbon**

Ribbon 是一个负载均衡组件，Ribbon作为服务消费者的负载均衡器，一种是和 RestTemplae结合，一种是和 Feign 相结合，Feign 默认集成了 Ribbon 。

- **声明式调用 Feign**

简单方便的调用 Spring Cloud 服务的工具，让 Java Http 客户端调用过程变的简单。

- **配置中心 Config**

将配置文件进行统一管理，可以从 Config Server 服务或 Git 仓库读取。

- **熔断器 Hystrix**

Hystrix 提供了熔断器的功能，能够阻止分布式系统中出现联动故障。

- **服务链路追踪 Sleuth**

Sleuth 是 Spring Cloud 中的一个组件，主要功能是在分布式系统中提供服务链路追踪的解决方案。

- **服务监控 Spring Boot Admin**

Spring Boot Admin 用于管理和监控一个或多个 Spring Boot 程序，使用 Spring Boot Admin 监控 Spring Cloud 微服务。

- **消息总线 Bus**

Spring Cloud Bus 将 Spring 的事件处理机制和消息中间件消息的发送和接收整合起来，可以轻松的将分布式应用中连接有消息中间件的多个服务节点连接起来，实现消息互通。

- **系统保护**

为保证服务的安全，微服务系统需要增加安全验证，常用的方式是增加 Spring Security 或Spring OAuth2 框架来保护微服务系统。

## 1 微服务治理

### 1.1 认识微服务

- **微服务架构的演变**

  单体架构：耦合度高，不适合多人开发。

  分布式架构：对业务功能对系统进行拆分，每个业务模块独立开发，称为服务，降低耦合度。服务拆分会导致部署困难。

  分布式需要考虑的问题:1.服务拆分颗粒度如何 2.服务集群地址如何维护 3.服务之间如何远程调用 4.服务健康如何感知

- **微服务**

  - 单一职责：拆分粒度更小，每个服务对应唯一业务能力，避免重复业务开发
  - 面向服务：微服务对外暴露业务接口
  - 自治：团队独立，技术独立，数据独立，部署独立
  - 隔离性强：服务做好隔离，容错，降级，避免出现级联问题
  
- **微服务结构**

  ![微服务架构图](https://p1-tt.byteimg.com/origin/pgc-image/7e2daeb01c254066b25314b67a08e995?from=pc)

- **微服务技术对比**

  |                | Dubbo             | SpringCloud              | SpringCloudAlibaba       |
  | -------------- | ----------------- | ------------------------ | ------------------------ |
  | 注册中心       | zookeeper、redis  | Eureka、Consul           | Nacos、Eureka            |
  | 服务远程调用   | Dubbo协议         | Feign（Http协议）        | Dubbo、Feign             |
  | 配置中心       | 无                | SpringCloudConfig        | SpringCloudConfig、Nacos |
  | 服务网关       | 无                | SpringCloudGateway、Zuul | SpringCloudGateway、Zuul |
  | 服务监控和保护 | dubbo-admin功能弱 | Hystrix                  | Sentinel                 |

  SpringCloudAlibaba兼容前两种架构

- **SpringCloud**

  - SpringCloud集成了各种微服务组件，基于SpingBoot实现自动装配
  - 与SpringBoot有对应版本

### 1.2 分布式服务架构案例

- **服务拆分和远程调用**

  1. 不同微服务，不要开发重复业务
  2. 微服务**数据独立**，不要访问其他微服务数据库
  3. 可以把自己得业务暴露为接口，供其他微服务调用

- **案例 调用其他服务的接口**

  要求 查询订单并且查询其中用户对应的信息

  1. 在order-service的OrderApplication中注册RestTemplate
  2. 服务远程调用RestTemplate实现调用其他服务的接口（发送HTTP请求）

- **提供者与消费者**

  - 服务提供者：一次业务中，被其他微服务调用的
  - 消费者：调用其他服务的

### 1.3 eureka 注册中心

- **远程调用的问题**

  1. 服务消费者该如何获取服务提供者的地址信息
  2. 如果有多个服务提供者，消费者该如何选择
  3. 消费者如何得知服务提供者的健康状态

- **Eureka的作用**

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206200346227.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjM0ODMy,size_16,color_FFFFFF,t_70)

  Eureka就好比是滴滴，负责管理、记录服务提供者的信息。服务调用者无需自己寻找服务，而是把自己的需求告诉Eureka，然后Eureka会把符合你需求的服务告诉你。Eureka说白了就是一个注册服务中心。

  同时，服务提供方与Eureka之间通过“心跳”机制进行监控，当某个服务提供方出现问题，Eureka自然会把它从服务列表中剔除。

  这就实现了服务的自动注册、发现、状态监控。

- **服务注册到Eureka**

  1. 服务注册

     - 引入Eureka-client依赖

       ```xml
       <!--eureka客户端依赖-->
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
       </dependency>
       ```

     - 在application中配置eureka地址

       ```yml
       eureka:
         client:
           service-url:  # eureka的地址信息
             defaultZone: http://127.0.0.1:10086/eureka
       ```

  2. 无论是消费者还是提供者，引入Eureka-client依赖都可以完成注册

- **在order-service完成拉取服务**

  1. 修改OrderService的代码，修改访问的url路径（IP改为服务名称）

     ```java
     public Order queryOrderById(Long orderId) {
         // 1.查询订单
         Order order = orderMapper.findById(orderId);
         // 2.利用RestTemplate发起http请求，查询用户
         // 2.1.url路径
         String url = "http://userservice/user/" + order.getUserId();
         // 2.2.发送http请求，实现远程调用
         User user = restTemplate.getForObject(url, User.class);
         // 3.封装user到Order
         order.setUser(user);
         // 4.返回
         return order;
     ```

  2. 在order-service项目启动类OrderApplication中的RestTemplate添加负载均衡注解

     ```java
     @Bean
     @LoadBalanced
     public RestTemplate restTemplate() {
         return new RestTemplate();
     }
     ```

### 1.4 Ribbon 负载均衡原理

- **负载均衡原理**

  ```java
  String url = "http://userservice/user/" + order.getUserId();
  ```

  这条url被Ribbon实现的请求拦截器拦截，获取服务名称，请求拦截器中根据服务名称从Eureka中拉取服务列表，再通过负载均衡算法获得服务![img](https://ask.qcloudimg.com/http-save/yehe-10027812/9b1088fe21ecd89b97b825b2507d4f21.png?imageView2/2/w/2560/h/7000)

  ```java
  // 负载均衡流程
  public ClientHttpResponse intercept(final HttpRequest request, final byte[] body,
  	final ClientHttpRequestExecution execution) throws IOException {
  	final URI originalUri = request.getURI();
  	String serviceName = originalUri.getHost();
  	Assert.state(serviceName != null, "Request URI does not contain a valid hostname: " + originalUri);
  	return this.loadBalancer.execute(serviceName, requestFactory.createRequest(request, body, execution));
  }
  ```

- **负载均衡策略**

  Ribbon的负载均衡策略是一个叫做IRule的接口来定义的，每一种子接口都是一种规则

  ![[(img-LneKI92V-1623824544221)(https://s3-us-west-2.amazonaws.com/secure.notion-static.com/092b6cbe-bdee-4762-8286-86c37ced48c5/Untitled.png)]](https://img-blog.csdnimg.cn/202106161422453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lhbmcxMzFwZW5n,size_16,color_FFFFFF,t_70)

  **调用负载均衡策略**

  1. 代码方式

     在order-service中OrderApplication类中，定义一个新的IRule

     ```java
     @Bean
     public IRule randomRule() {
     	return new RandomRule();
     }
     ```

  2. 配置文件方式

     在application.yml中，添加新的配置

     ```yml
     userservice:
     	ribbon:
     		NFLoadBalanceRuleClassName: com.netflix.loadbalancer.RandomRule
     ```

  **有哪些负载均衡策略**

  1.轮询策略：RoundRobinRule，按照一定的顺序依次调用服务实例。比如一共有 3 个服务，第一次调用服务 1，第二次调用服务 2，第三次调用服务3，依次类推。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule #设置负载均衡
  复制代码
  ```

  2.权重策略

  权重策略：WeightedResponseTimeRule，根据每个服务提供者的响应时间分配一个权重，响应时间越长，权重越小，被选中的可能性也就越低。 它的实现原理是，刚开始使用轮询策略并开启一个计时器，每一段时间收集一次所有服务提供者的平均响应时间，然后再给每个服务提供者附上一个权重，权重越高被选中的概率也越大。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.WeightedResponseTimeRule
  复制代码
  ```

  3.随机策略

  随机策略：RandomRule，从服务提供者的列表中随机选择一个服务实例。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #设置负载均衡
  复制代码
  ```

  4.最小连接数策略

  最小连接数策略：BestAvailableRule，也叫最小并发数策略，它是遍历服务提供者列表，选取连接数最小的⼀个服务实例。如果有相同的最小连接数，那么会调用轮询策略进行选取。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.BestAvailableRule #设置负载均衡
  复制代码
  ```

  5.重试策略

  重试策略：RetryRule，按照轮询策略来获取服务，如果获取的服务实例为 null 或已经失效，则在指定的时间之内不断地进行重试来获取服务，如果超过指定时间依然没获取到服务实例则返回 null。 此策略的配置设置如下：

  ```yaml
  ribbon:
    ConnectTimeout: 2000 # 请求连接的超时时间
    ReadTimeout: 5000 # 请求处理的超时时间
  springcloud-nacos-provider: # nacos 中的服务 id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #设置负载均衡
  复制代码
  ```

  6.可用性敏感策略

  可用敏感性策略：AvailabilityFilteringRule，先过滤掉非健康的服务实例，然后再选择连接数较小的服务实例。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.AvailabilityFilteringRule
  复制代码
  ```

  7.区域敏感策略

  区域敏感策略：ZoneAvoidanceRule，根据服务所在区域（zone）的性能和服务的可用性来选择服务实例，在没有区域的环境下，该策略和轮询策略类似。 此策略的配置设置如下：

  ```yaml
  springcloud-nacos-provider: # nacos中的服务id
    ribbon:
      NFLoadBalancerRuleClassName: com.netflix.loadbalancer.ZoneAvoidanceRule
  ```

- **懒加载**

  Ribbon默认采用懒加载，第一次访问才会创建LoadBalancer，所以第一次加载会耗费较长时间。

  **如何修改加载策略**

  ```yml
  ribbon:
  	eager-load:
  		enabled: true	# 开启饥饿加载
  		clients: userservice	# 指定对userservice这个服务饥饿加载
  ```

### 1.5 nacos 注册中心

- **认使安装Nacos**

  比Eureka功能更加丰富

  1. 下载Nacos发行版本，配置好端口号并运行 GitHub的Release下载页：https://github.com/alibaba/nacos/releases

     ```sh
     startup.cmd -m standalone # 单体非集群
     ```

  2. 项目中配置Nacos依赖

     父工程：

     ```xml
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-alibaba-dependencies</artifactId>
         <version>2.2.5.RELEASE</version>
         <type>pom</type>
         <scope>import</scope>
     </dependency>
     ```

     客户端：

     ```xml
     <!-- nacos客户端依赖包 -->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>
     ```

- **Nacos服务分级存储模型**

  把同在一个机房的多个实例称为一个集群

  ```
  		    服务
  	   /          \
  	集群1         集群2 ...
  	/  \         /   \
  实例1.1 实例1.2 实例2.1 实例2.2 
  ```

  **服务跨集群调用问题**

  ```yml
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
      discovery:
        cluster-name: SH # 集群名称
      config:
        file-extension: yaml # 文件后缀名
  ```

  添加discovery属性，设置集群名称

  yml文件中添加规则

  ```yml
  userservice:
    ribbon:
      NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule  # 优先本地集群负载均衡规则
  ```

  **集群负载均衡**

  - 不同服务设备性能有差异，性能好的机器权重设置大一点
  - Nacos控制台可以设置权重，0~1之间，权重设置为0不会被访问

- **Nacos环境隔离-namespace**

  Nacos中服务存储和数据存储的最外层是一个名为namespace的东西，用来做外层隔离

  ![img](https://cdn.nlark.com/yuque/0/2019/png/333810/1559699207043-bff71a91-b187-489e-a3c4-79322913fd54.png#alt=undefined)

  **配置namespace**

  1. 在Nacos控制台中添加命名空间，会自动生成命名空间id

  2. 在项目配置中添加命名空间id

     ```yml
     cloud:
       nacos:
         server-addr: localhost:8848 # nacos服务地址
         discovery:
           cluster-name: HZ # 集群名称
           namespace: 6185f2c8-23df-409b-a58b-76000989482f # dev环境
     ```

  3. 不同命名空间内的服务，无法访问

     ```shell
     No instances available for userservice
     ```

### 1.6 Eureka和Nacos比较

- **Nacos和Eureka的共同点**
  1. 都支持服务注册和服务拉取
  2. 都支持服务提供者心跳方式做健康监测
- **Nacos和Eureka的区别**
  1. Nacos支持服务端主动监测提供者的状态；临时实例会通过心跳监测告诉注册中心，自己还活着；非临时实例，Nacos会主动询问是否健康
  2. 临时实例心跳不正常回被剔除，非临时实例不会
  3. Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  4. Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式，Eureka采用AP方式

## 2 Nacos配置管理

### 2.1 统一配置管理

- **配置更改热更新**

  方法：提供一个管理配置的**配置管理服务**，当配置更新时，配置管理服务会通知对应的服务

  Nacos提供的方法：在nacos终端新增配置，按照服务名来对应配置名

- **获取配置的步骤**

  1. 项目启动
  2. 读取Nacos中的配置文件
  3. 读取本地配置文件application.yml
  4. 创建Spring容器
  5. 加载bean

  **以上步骤就会产生一个问题，那就是我们的Nacos服务地址是写在application.yml中的，但是读取Nacos中的配置文件是在读取application.yml之前，所以我们需要在读取Nacos之前配置好Nacos地址**

  1. 项目启动
  2. 读取bootstrap.yml中的Nacos地址
  3. 读取Nacos中的配置文件
  4. 读取本地配置文件application.yml
  5. 创建Spring容器
  6. 加载bean

- **Nacos配置管理客户端的配置**

  1. pom.xml中添加依赖

     ```xml
     <!--nacos的配置管理依赖-->
     <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
     </dependency>
     ```

  2. 添加bootstrap文件

     ```yml
     spring:
       application:
         name: userservice
       profiles:
         active: dev # 环境
       cloud:
         nacos:
           server-addr: localhost:8848 # nacos地址
           discovery:
             cluster-name: SH # 集群名称
           config:
             file-extension: yaml # 文件后缀名
     ```

### 2.2 配置热更新

- **第一种方法：添加服务的刷新注解**

  ```java
  @RefreshScope
  public class UserController
  ```

- **第二种方法：手动获取属性**

  ```java
  // 配置类 自动装配对应值
  @Data
  @Component
  @ConfigurationProperties(prefix = "pattern")
  public class PatternProperties {
      private String dateformat;
      private String envSharedValue;
      private String name;
  }
  ```

  ```java
  // Controller类
  public class UserController {
  
      @Autowired
      private UserService userService;
  
      // 注入配置类
      @Autowired
      private PatternProperties properties;
  
      @GetMapping("now")
      public String now(){
          return LocalDateTime.now().format(DateTimeFormatter.ofPattern(properties.getDateformat()));
      }
  }
  ```

### 2.4 配置共享

- **多环境配置共享**

  微服务在启动时会在Nacos读取多个配置文件：

  - (spring.application.name)-(spring.profiles.active).yaml 例如 userservice-dev.yaml
  - (spring.application.name).yaml,例如: userservice.yaml

  (spring.application.name).yaml可以做到多环境共享

  当本地和远端共享配置同时配置了一个属性时，以多环境共享文件为准

  当本地和远端单环境配置和多环境配置同时配置了一个属性时，以远端单环境配置为准

### 2.5 搭建Nacos集群

包含3个nacos节点，然后一个负载均衡器代理3个Nacos。这里负载均衡器可以使用nginx

搭建集群的基本步骤：

- **搭建数据库，初始化数据库表结构**

  ```sql
  CREATE TABLE `config_info` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `data_id` varchar(255) NOT NULL COMMENT 'data_id',
    `group_id` varchar(255) DEFAULT NULL,
    `content` longtext NOT NULL COMMENT 'content',
    `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `src_user` text COMMENT 'source user',
    `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
    `app_name` varchar(128) DEFAULT NULL,
    `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
    `c_desc` varchar(256) DEFAULT NULL,
    `c_use` varchar(64) DEFAULT NULL,
    `effect` varchar(64) DEFAULT NULL,
    `type` varchar(64) DEFAULT NULL,
    `c_schema` text,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_configinfo_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info';
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = config_info_aggr   */
  /******************************************/
  CREATE TABLE `config_info_aggr` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `data_id` varchar(255) NOT NULL COMMENT 'data_id',
    `group_id` varchar(255) NOT NULL COMMENT 'group_id',
    `datum_id` varchar(255) NOT NULL COMMENT 'datum_id',
    `content` longtext NOT NULL COMMENT '内容',
    `gmt_modified` datetime NOT NULL COMMENT '修改时间',
    `app_name` varchar(128) DEFAULT NULL,
    `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_configinfoaggr_datagrouptenantdatum` (`data_id`,`group_id`,`tenant_id`,`datum_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='增加租户字段';
  
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = config_info_beta   */
  /******************************************/
  CREATE TABLE `config_info_beta` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `data_id` varchar(255) NOT NULL COMMENT 'data_id',
    `group_id` varchar(128) NOT NULL COMMENT 'group_id',
    `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
    `content` longtext NOT NULL COMMENT 'content',
    `beta_ips` varchar(1024) DEFAULT NULL COMMENT 'betaIps',
    `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `src_user` text COMMENT 'source user',
    `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
    `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_configinfobeta_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_beta';
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = config_info_tag   */
  /******************************************/
  CREATE TABLE `config_info_tag` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `data_id` varchar(255) NOT NULL COMMENT 'data_id',
    `group_id` varchar(128) NOT NULL COMMENT 'group_id',
    `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
    `tag_id` varchar(128) NOT NULL COMMENT 'tag_id',
    `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
    `content` longtext NOT NULL COMMENT 'content',
    `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `src_user` text COMMENT 'source user',
    `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_configinfotag_datagrouptenanttag` (`data_id`,`group_id`,`tenant_id`,`tag_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_tag';
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = config_tags_relation   */
  /******************************************/
  CREATE TABLE `config_tags_relation` (
    `id` bigint(20) NOT NULL COMMENT 'id',
    `tag_name` varchar(128) NOT NULL COMMENT 'tag_name',
    `tag_type` varchar(64) DEFAULT NULL COMMENT 'tag_type',
    `data_id` varchar(255) NOT NULL COMMENT 'data_id',
    `group_id` varchar(128) NOT NULL COMMENT 'group_id',
    `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
    `nid` bigint(20) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`nid`),
    UNIQUE KEY `uk_configtagrelation_configidtag` (`id`,`tag_name`,`tag_type`),
    KEY `idx_tenant_id` (`tenant_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_tag_relation';
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = group_capacity   */
  /******************************************/
  CREATE TABLE `group_capacity` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `group_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Group ID，空字符表示整个集群',
    `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
    `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
    `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
    `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数，，0表示使用默认值',
    `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
    `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_group_id` (`group_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='集群、各Group容量信息表';
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = his_config_info   */
  /******************************************/
  CREATE TABLE `his_config_info` (
    `id` bigint(64) unsigned NOT NULL,
    `nid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `data_id` varchar(255) NOT NULL,
    `group_id` varchar(128) NOT NULL,
    `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
    `content` longtext NOT NULL,
    `md5` varchar(32) DEFAULT NULL,
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `src_user` text,
    `src_ip` varchar(50) DEFAULT NULL,
    `op_type` char(10) DEFAULT NULL,
    `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
    PRIMARY KEY (`nid`),
    KEY `idx_gmt_create` (`gmt_create`),
    KEY `idx_gmt_modified` (`gmt_modified`),
    KEY `idx_did` (`data_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='多租户改造';
  
  
  /******************************************/
  /*   数据库全名 = nacos_config   */
  /*   表名称 = tenant_capacity   */
  /******************************************/
  CREATE TABLE `tenant_capacity` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `tenant_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Tenant ID',
    `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
    `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
    `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
    `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数',
    `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
    `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
    `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_tenant_id` (`tenant_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='租户容量信息表';
  
  
  CREATE TABLE `tenant_info` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
    `kp` varchar(128) NOT NULL COMMENT 'kp',
    `tenant_id` varchar(128) default '' COMMENT 'tenant_id',
    `tenant_name` varchar(128) default '' COMMENT 'tenant_name',
    `tenant_desc` varchar(256) DEFAULT NULL COMMENT 'tenant_desc',
    `create_source` varchar(32) DEFAULT NULL COMMENT 'create_source',
    `gmt_create` bigint(20) NOT NULL COMMENT '创建时间',
    `gmt_modified` bigint(20) NOT NULL COMMENT '修改时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_tenant_info_kptenantid` (`kp`,`tenant_id`),
    KEY `idx_tenant_id` (`tenant_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='tenant_info';
  
  CREATE TABLE `users` (
  	`username` varchar(50) NOT NULL PRIMARY KEY,
  	`password` varchar(500) NOT NULL,
  	`enabled` boolean NOT NULL
  );
  
  CREATE TABLE `roles` (
  	`username` varchar(50) NOT NULL,
  	`role` varchar(50) NOT NULL,
  	UNIQUE INDEX `idx_user_role` (`username` ASC, `role` ASC) USING BTREE
  );
  
  CREATE TABLE `permissions` (
      `role` varchar(50) NOT NULL,
      `resource` varchar(255) NOT NULL,
      `action` varchar(8) NOT NULL,
      UNIQUE INDEX `uk_role_permission` (`role`,`resource`,`action`) USING BTREE
  );
  
  INSERT INTO users (username, password, enabled) VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', TRUE);
  
  INSERT INTO roles (username, role) VALUES ('nacos', 'ROLE_ADMIN');
  ```

- **下载nacos安装包**

- **配置nacos**

  进入nacos的conf目录，修改配置文件cluster.conf.example，重命名为cluster.conf：然后添加内容：

  ```sh
  127.0.0.1:8845
  127.0.0.1.8846
  127.0.0.1.8847
  ```

  然后修改application.properties文件，添加数据库配置

  ```properties
  spring.datasource.platform=mysql
  
  db.num=1
  
  db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
  db.user.0={用户名}
  db.password.0={密码}
  ```

- **启动nacos集群**

  将nacos文件夹复制三份，分别命名为：nacos1、nacos2、nacos3

  然后分别修改三个文件夹中的application.properties，

  nacos1:

  ```properties
  server.port=8845
  ```

  nacos2:

  ```properties
  server.port=8846
  ```

  nacos3:

  ```properties
  server.port=8847
  ```

  然后分别启动三个nacos节点：

  ```
  startup.cmd
  ```

- **nginx反向代理**

  解压nginx安装包

  修改conf/nginx.conf文件，配置如下：

  ```nginx
  upstream nacos-cluster {
      server 127.0.0.1:8845;
  	server 127.0.0.1:8846;
  	server 127.0.0.1:8847;
  }
  
  server {
      listen       80;
      server_name  localhost;
  
      location /nacos {
          proxy_pass http://nacos-cluster;
      }
  }
  ```

  而后在浏览器访问：http://localhost/nacos即可。

  

  代码中application.yml文件配置如下：

  ```yaml
  spring:
    cloud:
      nacos:
        server-addr: localhost:80 # Nacos地址
  ```


### 2.6 Http客户端Feign

Feign 的核心原理是基于接口注解和动态代理实现远程调用，可以将应用程序需要的远程 HTTP API 伪装成本地的接口进行调用，降低了使用者开发和维护服务的成本。

**简单来说就是Http请求动态代理**

- **使用Feign客户端**

  1. 引入依赖

     ```xml
     <!--feign客户端依赖-->
     <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-openfeign</artifactId>
     </dependency>
     ```

  2. orderservice启动类添加注解开启Feign功能

     ```java
     @EnableFeignClients
     ```

  3. 定义远程接口：创建一个接口，并通过@FeignClient注解来指定远程服务地址和协议。

     ```java
     @FeignClient("userservice")
     public interface UserClient {
     
         @GetMapping("/user/{id}")
         User findById(@PathVariable("id") Long id);
     }
     ```

     **原来远程调用userservice的请求为**

     ```java
     // 2.1.url路径
     String url = "http://userservice/user/" + order.getUserId();
     // 2.2.发送http请求，实现远程调用
     User user = restTemplate.getForObject(url, User.class);
     ```

  4. 创建接口代理：根据定义的接口信息，通过动态代理创建一个代理实例。

  5. 发送请求：当代理实例方法被调用时，根据注解中的地址、请求方式等信息，发送 HTTP 请求到远程服务并获取响应结果。

  6. 解析响应：将返回的 HTTP 响应转换成需要的响应对象，并返回给调用方。

- **Feign自定义配置**

  1. java代码配置

     先声明一个Bean

     ```java
     public class FeignClientConfig {
         @Bean
         public Logger.Level feignLogLevel() {
             return Logger.Level.BASIC;
         }
     }
     ```

     如果是局部配置

     ```java
     @FeignClient(value = "userservice", configuration = FeignClientConfig.class)
     ```

     如果是全局配置

     ```java
     @EnableFeignClients(clients = UserClient.class,defaultConfiguration = DefaultFeignConfiguration.class)
     ```
  
- **Feign性能优化**

  1. 底层实现：Feign的作用是把我们的请求转换为HTTP请求，发送HTTP请求的客户端还是通过调用其他包来实现的，以下几种
     - URLConnection：默认，不支持连接池
     - Apache HttpClient：支持连接池
     - OKHttp：支持连接池

  2. 因此优化Feign性能的步骤主要包括
     - 使用连接池代替默认的URLConnection
     - 日志级别，最好用basic或none（打印日志越多越影响性能）

  3. 连接池配置

     - 引入依赖

       ```xml
       <!--引入HttpClient依赖-->
       dependency>
         <groupId>io.github.openfeign</groupId>
         <artifactId>feign-httpclient</artifactId>
       </dependency>
       ```

     - 配置连接池

       ```yml
       feign:
         httpclient:
           enabled: true # 支持HttpClient的开关
           max-connections: 200 # 最大连接数
           max-connections-per-route: 50 # 单个路径的最大连接数
       ```


### 2.7 统一网关Gateway

- **为什么需要网关**

  网关功能

  - 身份认证和权限校验
  - 服务路由、负载均衡
  - 请求限流

- **网关技术实现**

  网关的实现包括两种

  - gateway
  - zuul

  zuul是基于Servlet实现，属于阻塞式编程，而SpringCloudGateway是基于Spring5中提供的WebFlux，属于响应式编程的实现，具备更好的性能

- **配置网关**

  ```yml
  server:
    port: 10010
  logging:
    level:
      cn.itcast: debug
    pattern:
      dateformat: MM-dd HH:mm:ss:SSS
  spring:
    application:
      name: gateway
    cloud:
      nacos:
        server-addr: nacos:8848 # nacos地址
      gateway:
        routes:
          - id: user-service # 路由标示，必须唯一
            uri: lb://userservice # 路由的目标地址
            predicates: # 路由断言，判断请求是否符合规则
              - Path=/user/** # 路径断言，判断路径是否是以/user开头，如果是则符合
          - id: order-service
            uri: lb://orderservice
            predicates:
              - Path=/order/**
        default-filters:
          - AddRequestHeader=Truth,Itcast is freaking awesome!
  ```

- **路由断言工厂**

  - 我们在配置文件中写的断言规则只是字符串，这些字符串会被Predicate Factory读取并处理，转变为路由判断的条件

  - 例如Path=/user/**是按照路径匹配，这个规则是由org.springframework.cloud.gateway.handler.predicate.PathRoutePredicateFactory类来处理的

  - 这种断言工厂有10多个

    springcloud gateway有11种断言工厂。下面是它们的简要说明:

    1. `after`: 确认请求是否在某个时间之后。
    2. `before`: 确认请求是否在某个时间之前。
    3. `between`: 确认请求是否在两个指定的时间之间。
    4. `cookie`: 确认请求中是否包含指定cookie或cookie值。
    5. `header`: 确认请求中是否包含指定header或header值。
    6. `host`: 确认请求的host匹配指定的模式。
    7. `method`: 确认请求的http方法与指定的方法匹配。
    8. `path`: 确认请求的路径符合指定的模式。
    9. `query`: 确认请求的查询参数中是否包含指定的参数或参数值。
    10. `remoteaddr`: 确认请求的远程地址匹配指定的模式。
    11. `weight`: 在多个路由规则中指定给定的路由权重。

- **路由过滤器**

  可以对进入网关的请求和微服务返回的响应做处理

  Filter 通常被用来对接入的HTTP请求/响应中的各个属性进行处理，比如添加头信息、请求参数转换等，从而实现对请求的过滤和改造

- **全局过滤器**

  与上面的过滤器的区别在于，GatewayFilter通过配置文件定义，功能都是固定的。而GlobalFilter的逻辑需要自己写代码实现

  下面是一个鉴权的全局过滤器功能实现

  ```java
  @Component
  public class AuthorizeFilter implements GlobalFilter, Ordered {
      @Override
      public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
          // 1.获取请求参数
          ServerHttpRequest request = exchange.getRequest();
          MultiValueMap<String, String> params = request.getQueryParams();
          // 2.获取参数中的 authorization 参数
          String auth = params.getFirst("authorization");
          // 3.判断参数值是否等于 admin
          if ("admin".equals(auth)) {
              // 4.是，放行
              return chain.filter(exchange);
          }
          // 5.否，拦截
          // 5.1.设置状态码
          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
          // 5.2.拦截请求
          return exchange.getResponse().setComplete();
      }
  
      @Override
      public int getOrder() {
          return -1;
      }
  }
  ```

- **过滤器链执行顺序**

  默认过滤器 -> 路由过滤器 -> 全局过滤器

  - 每一个过滤器都必须指定一 个int类型的order值，order值越小，优先级越高，执行顺序越靠前。
  - GlobalFilter通过实现Ordered接口，或者添加@Order注解来指定order值，由我们自己指定
  - 路由过滤器和defaultFilter的order由Spring指定，默认是按照声明顺序从1递增。
  - 当过滤器的order值一样时，会按照defaultFilter >路由过滤器> GlobalFilter的顺序执行。

- **跨域Cros设置**

  跨域:域名不-致就是跨域,主要包括:

  1. 域名不同: www.taobao.com 和www.taobao.org和www.jd.com和miaosha.jd.com
  2. 域名相同，端口不同: localhost:8080和localhost8081

  跨域问题:浏览器禁止请求的发起者与服务端发生跨域ajax请求,请求被浏览器拦截的问题

  ```yml
  spring:
    cloud:
      gateway:
        globalcors:
          corsConfigurations:
            '[/**]':
              allowedOrigins: "*"	# 允许哪些网站的跨域请求
              allowedMethods:		# 允许的跨域请求方式
              - GET
              allowedHeaders:		# 允许在请求中携带的头信息
              - Authorization
              - Content-Type
              - X-Requested-With
              allowCredentials: true	# 是否允许携带cookie
              exposeHeaders:
              - X-Total-Count
              maxAge: 1800	# 跨域检测有效期
  ```

  
