// Interview Quest - Spring Ecosystem Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'spring',
  name: 'Spring Ecosystem',
  icon: '🌱',
  color: '#16A34A',
  topics: [
    {
      id: 'spring-core',
      name: 'Spring Core',
      icon: '🏛️',
      notes: {
        title: 'Spring Framework Core Concepts',
        points: [
          '<strong>IoC & DI:</strong> <code>Inversion of Control (IoC)</code> transfers object lifecycle management to the framework. <code>Dependency Injection (DI)</code> is the design pattern that implements IoC, injecting dependencies into a class at runtime. Types of DI: Constructor Injection (recommended: immutability, testability), Setter Injection, and Field Injection (not recommended).',
          '<strong>ApplicationContext:</strong> The Spring IoC container (inherits from BeanFactory). It loads bean definitions, wires beans together, and manages their lifecycle. It also provides internationalization, event publishing, and application-layer contexts.',
          '<strong>Spring Beans:</strong> Objects managed by the Spring IoC container. <strong>Bean Scopes:</strong> <code>singleton</code> (default: one instance per container), <code>prototype</code> (new instance every request), <code>request</code> (one per HTTP request), <code>session</code> (one per HTTP session), and <code>application</code>.',
          '<strong>Bean Lifecycle:</strong> Instantiation → Populate Properties → BeanNameAware / BeanFactoryAware → Pre-Initialization (BeanPostProcessor) → InitializingBean.afterPropertiesSet() / @PostConstruct → Custom init-method → Ready to use → Pre-Destroy (DisposableBean / @PreDestroy) → Custom destroy-method.',
          '<strong>AOP (Aspect-Oriented Programming):</strong> Decouples cross-cutting concerns (logging, security, transactions) from business logic. Terms: <strong>Aspect</strong> (concern module), <strong>JoinPoint</strong> (execution point), <strong>Advice</strong> (action taken: Before, After, Around, etc.), <strong>Pointcut</strong> (expression matching join points), and <strong>AOP Proxy</strong>.'
        ],
        codeExamples: [
          {
            title: 'Constructor Dependency Injection',
            code: '@Component\npublic class UserService {\n    private final UserRepository userRepository;\n\n    // Constructor injection (no @Autowired needed in Spring 4.3+)\n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n}',
            language: 'java'
          },
          {
            title: 'Customizing Bean Lifecycle and Scope',
            code: '@Component\n@Scope("prototype")\npublic class TokenGenerator {\n\n    @PostConstruct\n    public void init() {\n        System.out.println("TokenGenerator bean initialized");\n    }\n\n    @PreDestroy\n    public void cleanup() {\n        System.out.println("TokenGenerator bean about to be destroyed");\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Always explain why Constructor Injection is preferred over Field Injection: it enables immutability (final fields), prevents NullPointerExceptions (requires dependencies at creation), and facilitates writing unit tests without needing Spring reflection.',
          'Understand how prototype-scoped beans interact with singleton-scoped beans (they are only injected once. To get fresh prototype instances, use method injection, ApplicationContext lookup, or ObjectFactory).'
        ]
      },
      flashcards: [
        { front: 'What is Inversion of Control (IoC)?', back: 'IoC is a design principle where the control of object creation, configuration, and lifecycle management is transferred from the application code to an external container or framework (like Spring).' },
        { front: 'What are the main Spring Bean scopes?', back: 'singleton (default, one per IoC container), prototype (new instance every request), request (one per HTTP request), session (one per HTTP session), and application (one per ServletContext).' },
        { front: 'What is the difference between BeanFactory and ApplicationContext?', back: 'BeanFactory is the basic IoC container providing lazy loading of beans. ApplicationContext inherits from BeanFactory and adds advanced features: eager loading, event publishing, AOP integration, and internationalization. Always use ApplicationContext unless resource-constrained.' },
        { front: 'What happens when you inject a Prototype bean into a Singleton bean?', back: 'The prototype bean is injected only once when the singleton bean is instantiated. Subsequent requests to the singleton will return the same original prototype instance. To get a new prototype instance every time, use @Lookup method injection or ObjectFactory.' }
      ],
      quiz: [
        {
          question: 'Which injection type is recommended for Spring Beans to ensure immutability and ease of unit testing?',
          options: ['Field Injection', 'Setter Injection', 'Constructor Injection', 'Interface Injection'],
          correct: 2,
          explanation: 'Constructor injection is recommended because it allows dependencies to be declared as final (immutability) and ensures required dependencies are provided, simplifying testing without Spring runners.',
          difficulty: 'easy'
        },
        {
          question: 'Which annotation is used to run a custom initialization method after all bean properties are set by the IoC container?',
          options: ['@BeforeEach', '@PostConstruct', '@OnInit', '@PreDestroy'],
          correct: 1,
          explanation: '@PostConstruct is a standard Jakarta annotation that Spring respects, running the annotated method immediately after bean initialization and dependency injection are complete.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'Explain how Spring AOP works and the difference between JDK Dynamic Proxies and CGLIB Proxies.',
          hint: 'Think about interfaces vs. subclassing.',
          answer: 'Spring AOP uses proxies to intercept method calls and apply advice. By default, if the target class implements at least one interface, Spring uses a JDK Dynamic Proxy to create a proxy implementing that interface. If the target class does not implement any interface, Spring uses CGLIB to dynamically subclass the target class. CGLIB cannot proxy final classes or final methods.'
        }
      ]
    },
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      icon: '⚡',
      notes: {
        title: 'Spring Boot Key Features',
        points: [
          '<strong>Purpose:</strong> Spring Boot simplifies Spring application development by providing auto-configuration, starter dependencies, and embedded servlet containers, reducing boilerplate XML and Java configuration.',
          '<strong>Auto-Configuration:</strong> Boot scans classpath dependencies and automatically configures beans based on what it finds (e.g., if <code>h2.jar</code> is present, it auto-configures an H2 in-memory database bean). Driven by <code>@EnableAutoConfiguration</code>.',
          '<strong>Starters:</strong> Dependency descriptors (e.g., <code>spring-boot-starter-web</code>) that group common libraries into a single dependency, avoiding version conflicts.',
          '<strong>@SpringBootApplication:</strong> A combination of three annotations: <code>@SpringBootConfiguration</code> (declares configuration class), <code>@EnableAutoConfiguration</code>, and <code>@ComponentScan</code> (scans components in the current package and sub-packages).',
          '<strong>Profiles:</strong> Allow segregation of configuration files for different environments (e.g., <code>application-dev.yml</code>, <code>application-prod.yml</code>). Active profiles are specified via <code>spring.profiles.active</code>.'
        ],
        codeExamples: [
          {
            title: 'Spring Boot Entry Point and Profile Configuration',
            code: '@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}',
            language: 'java'
          },
          {
            title: 'Custom Auto-Configuration Condition',
            code: '@Configuration\n@ConditionalOnClass(DataSource.class)\npublic class DatabaseConfig {\n\n    @Bean\n    @ConditionalOnMissingBean\n    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {\n        // Configures default JPA Entity Manager if not already defined\n        return new LocalContainerEntityManagerFactoryBean();\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Explain how Spring Boot starts: SpringApplication.run() initializes the ApplicationContext, detects the environment (Web or Standard), starts the embedded server (Tomcat/Jetty), and performs auto-configuration.',
          'Be ready to explain how to exclude specific auto-configurations (using @SpringBootApplication(exclude = DataSourceAutoConfiguration.class)).'
        ]
      },
      flashcards: [
        { front: 'What three annotations make up @SpringBootApplication?', back: '1) @SpringBootConfiguration (a specialized @Configuration), 2) @EnableAutoConfiguration (enables Boot\'s auto-config mechanism), and 3) @ComponentScan (scans for @Component, @Service, @Controller, etc.).' },
        { front: 'What is Spring Boot Auto-Configuration?', back: 'Auto-configuration is a feature where Spring Boot automatically attempts to configure your application based on the jar dependencies added on the classpath. For example, finding mysql-connector-java adds a DataSource bean automatically.' },
        { front: 'How can you override properties in Spring Boot?', back: 'Properties can be overridden via: Command-line arguments (highest priority), OS environment variables, application.properties/yaml (profile-specific, then default), and default configuration values.' },
        { front: 'What is the role of Spring Boot Actuator?', back: 'Spring Boot Actuator provides production-ready features for monitoring and managing the application, exposing HTTP endpoints for health checking (/actuator/health), metrics (/metrics), thread dumps, and info.' }
      ],
      quiz: [
        {
          question: 'Which embedded servlet container is run by default in a spring-boot-starter-web application?',
          options: ['Jetty', 'Tomcat', 'Undertow', 'GlassFish'],
          correct: 1,
          explanation: 'Apache Tomcat is the default embedded container provided by spring-boot-starter-web. Developers can switch to Jetty or Undertow by excluding Tomcat.',
          difficulty: 'easy'
        },
        {
          question: 'Under which directory does Spring Boot look for static assets by default?',
          options: ['/src/main/resources/templates', '/src/main/resources/static', '/src/main/webapp', '/src/static'],
          correct: 1,
          explanation: 'Spring Boot serves static resources from /static, /public, /resources, or /META-INF/resources directories in the classpath.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'How does Spring Boot Auto-Configuration work under the hood?',
          hint: 'Mention @EnableAutoConfiguration, spring.factories/AutoConfiguration.imports, and @Conditional annotations.',
          answer: '@EnableAutoConfiguration imports AutoConfigurationImportSelector, which reads lists of auto-configuration classes from spring-boot-autoconfigure.jar (located in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports in newer versions, or spring.factories). It filters these configurations using @Conditional annotations (like @ConditionalOnClass, @ConditionalOnMissingBean) to instantiate only those whose dependencies are present on the classpath and not overridden by the user.'
        }
      ]
    },
    {
      id: 'jpa',
      name: 'Spring Data JPA & Hibernate',
      icon: '💾',
      notes: {
        title: 'Spring Data JPA and Hibernate Internals',
        points: [
          '<strong>JPA vs. Hibernate:</strong> <code>JPA (Jakarta Persistence API)</code> is a specification defining ORM guidelines using interfaces and annotations. <code>Hibernate</code> is the default provider (implementation) of JPA.',
          '<strong>Persistence Context & Entity Lifecycle:</strong> The persistence context manages entity states inside a transaction. <strong>States:</strong> 1) <code>New/Transient</code> (not in DB, not managed), 2) <code>Managed/Persistent</code> (associated with context, changes tracked), 3) <code>Detached</code> (existed in DB, context closed), 4) <code>Removed</code> (scheduled for deletion).',
          '<strong>N+1 Query Problem:</strong> Occurs when fetching a parent entity causes N separate queries to fetch its child entities (e.g., retrieving N users and fetching their addresses individually). **Solutions**: Use <code>JOIN FETCH</code> in JPQL, <code>@EntityGraph</code>, or configure fetch strategies appropriately.',
          '<strong>Caching in Hibernate:</strong> <strong>First-Level Cache</strong> (Session-scoped, transactional, default enabled). <strong>Second-Level Cache</strong> (SessionFactory-scoped, shared across sessions, requires provider like Ehcache). <strong>Query Cache</strong> (caches query results).',
          '<strong>Transaction Management:</strong> <code>@Transactional</code> configures declarative transaction boundaries. **Propagation behaviors**: <code>REQUIRED</code> (default: joins current, creates if none), <code>REQUIRES_NEW</code> (suspends current, creates new), <code>MANDATORY</code>, etc.'
        ],
        codeExamples: [
          {
            title: 'Preventing N+1 Problem and Custom Queries',
            code: 'public interface UserRepository extends JpaRepository<User, Long> {\n\n    // Using JOIN FETCH to resolve N+1 queries\n    @Query("SELECT u FROM User u JOIN FETCH u.addresses")\n    List<User> findAllUsersWithAddresses();\n\n    // Using EntityGraph to load association eagerly dynamically\n    @EntityGraph(attributePaths = {"addresses"})\n    Optional<User> findByName(String name);\n}',
            language: 'java'
          },
          {
            title: 'Transaction Propagation Configuration',
            code: '@Service\npublic class OrderService {\n\n    @Transactional(propagation = Propagation.REQUIRED)\n    public void placeOrder(Order order) {\n        // Main transaction\n        paymentService.processPayment(order.getPayment());\n    }\n}\n\n@Service\npublic class PaymentService {\n    // Creates a separate transaction that commits/rolls back independently\n    @Transactional(propagation = Propagation.REQUIRES_NEW)\n    public void processPayment(Payment payment) {\n        // Payment logic\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Be prepared to explain how Hibernate Dirty Checking works: when a transaction commits, Hibernate compares the state of managed entities against their initial loaded state. If there are changes, it generates SQL UPDATE statements automatically.',
          'Explain transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and concurrency issues (Dirty Read, Non-Repeatable Read, Phantom Read).'
        ]
      },
      flashcards: [
        { front: 'What is the N+1 query problem and how do you solve it?', back: 'The N+1 query problem occurs when JPA loads a parent entity (1 query) and then executes N separate queries to fetch lazy child associations for each of the N parents. Solve it using "JOIN FETCH" in JPQL, @EntityGraph, or setting fetch profiles.' },
        { front: 'What are the 4 states of an Entity in JPA?', back: '1) New/Transient (no DB identity, not managed), 2) Managed/Persistent (linked to DB, tracked by persistence context), 3) Detached (has DB identity, but session is closed/detached), and 4) Removed (marked for deletion at commit).' },
        { front: 'What is the difference between First-Level Cache and Second-Level Cache in Hibernate?', back: 'First-level cache is session-scoped, enabled by default, and cannot be disabled. Second-level cache is session-factory-scoped (application-wide), disabled by default, and caches data across multiple sessions (needs external provider like Ehcache).' },
        { front: 'Explain @Transactional propagation REQUIRES_NEW.', back: 'REQUIRES_NEW suspends the outer transaction (if it exists) and starts a new, independent inner transaction. If the inner transaction rolls back, it does not automatically roll back the outer transaction (unless the exception is propagated).' }
      ],
      quiz: [
        {
          question: 'Which entity state transition occurs when you call entityManager.merge(entity) on a detached entity?',
          options: ['Detached to Transient', 'Detached to Managed', 'Managed to Removed', 'Transient to Detached'],
          correct: 1,
          explanation: 'merge() copies the state of the detached entity into a managed instance retrieved from or created in the persistence context, transitioning the state to Managed.',
          difficulty: 'medium'
        },
        {
          question: 'Which database concurrency problem is prevented by the Repeatable Read isolation level but allowed by Read Committed?',
          options: ['Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'None of the above'],
          correct: 1,
          explanation: 'Repeatable Read guarantees that a transaction reading the same row twice will get the same values, preventing Non-Repeatable Reads. Phantom Reads are only prevented by Serializable.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain the difference between save() and saveAndFlush() in Spring Data JPA.',
          hint: 'Think about database writes, caching, and SQL execution timing.',
          answer: 'save() does not write to the database immediately; it updates the persistence context. Hibernate decides when to push changes to the DB (usually at transaction commit or during query execution). saveAndFlush() writes changes to the database immediately, executing the insert/update SQL statements right away. However, these changes are still not visible to other database transactions until the current transaction commits.'
        }
      ]
    },
    {
      id: 'rest-api',
      name: 'REST API',
      icon: '🌐',
      notes: {
        title: 'RESTful API Design and Best Practices',
        points: [
          '<strong>REST Principles:</strong> Statelessness, Client-Server architecture, Cacheability, Uniform Interface, Layered System, and Code on Demand (optional).',
          '<strong>HTTP Methods:</strong> <code>GET</code> (retrieve, idempotent/safe), <code>POST</code> (create, non-idempotent), <code>PUT</code> (replace resource entirely, idempotent), <code>PATCH</code> (partial update, idempotent/non-idempotent depending on design), <code>DELETE</code> (remove, idempotent).',
          '<strong>HTTP Status Codes:</strong> <strong>2xx</strong> (Success: 200 OK, 201 Created), <strong>3xx</strong> (Redirection), <strong>4xx</strong> (Client Error: 400 Bad Request, 401 Unauthorized - authentication needed, 403 Forbidden - permission denied, 404 Not Found), <strong>5xx</strong> (Server Error: 500 Internal Server Error, 503 Service Unavailable).',
          '<strong>Content Negotiation:</strong> The mechanism by which the client and server agree on the response media type. Driven by HTTP headers: <code>Accept</code> (client requests format) and <code>Content-Type</code> (indicates actual payload format).'
        ],
        codeExamples: [
          {
            title: 'Spring Boot REST Controller with Exception Handling',
            code: '@RestController\n@RequestMapping("/api/v1/users")\npublic class UserController {\n\n    @GetMapping("/{id}")\n    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {\n        UserDto user = userService.findById(id);\n        return ResponseEntity.ok(user);\n    }\n\n    @PostMapping\n    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto dto) {\n        UserDto created = userService.create(dto);\n        URI location = ServletUriComponentsBuilder.fromCurrentRequest()\n            .path("/{id}").buildAndExpand(created.getId()).toUri();\n        return ResponseEntity.created(location).body(created);\n    }\n}\n\n// Global Exception Handler\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(UserNotFoundException.class)\n    public ResponseEntity<ErrorDetails> handleNotFound(UserNotFoundException ex) {\n        ErrorDetails err = new ErrorDetails(LocalDateTime.now(), ex.getMessage());\n        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know the difference between 401 (Unauthorized - identity unknown) and 403 (Forbidden - identity known but lacks permission).',
          'Be prepared to explain why PUT should replace a resource completely, while PATCH is used for partial updates.',
          'Explain how Content Negotiation works in Spring MVC using HttpMessageConverters.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between PUT and PATCH?', back: 'PUT is used to replace the entire resource payload with new data (idempotent). PATCH is used for partial modifications of a resource (can be non-idempotent, though usually designed as idempotent).' },
        { front: 'What does Idempotency mean in HTTP?', back: 'Idempotency means that making multiple identical HTTP requests has the same effect on the server state as making a single request. GET, PUT, and DELETE are idempotent; POST is not.' },
        { front: 'What is the difference between HTTP Status 401 and 403?', back: '401 Unauthorized means the request lacks valid authentication credentials. 403 Forbidden means the client is authenticated but does not have permission to access the requested resource.' },
        { front: 'How does Content Negotiation work?', back: 'The client sends an "Accept" header specifying media types it supports (e.g., application/json). The server reads this header, checks its available HttpMessageConverters, and formats the response payload accordingly, setting the "Content-Type" header.' }
      ],
      quiz: [
        {
          question: 'Which HTTP status code should be returned when a resource is successfully created via a POST request?',
          options: ['200 OK', '201 Created', '202 Accepted', '204 No Content'],
          correct: 1,
          explanation: 'Status code 201 Created indicates the request succeeded and a new resource was created, typically containing a Location header pointing to the new resource.',
          difficulty: 'easy'
        },
        {
          question: 'Which of the following HTTP methods is NOT considered idempotent by design?',
          options: ['GET', 'PUT', 'POST', 'DELETE'],
          correct: 2,
          explanation: 'POST is used to create resources. Sending multiple identical POST requests will result in multiple resource creations (not idempotent). GET, PUT, and DELETE are idempotent.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'Design a REST API endpoint structure for a shopping cart, showing URLs and HTTP methods.',
          hint: 'Keep URLs nouns-based and use plural forms.',
          answer: 'URLs should use plural nouns: GET /api/carts/{cartId} (Retrieve cart), POST /api/carts (Create cart), POST /api/carts/{cartId}/items (Add item to cart), PATCH /api/carts/{cartId}/items/{itemId} (Update item quantity), DELETE /api/carts/{cartId}/items/{itemId} (Remove item from cart), and DELETE /api/carts/{cartId} (Empty/Delete cart).'
        }
      ]
    },
    {
      id: 'spring-security',
      name: 'Spring Security',
      icon: '🛡️',
      notes: {
        title: 'Spring Security Authentication and Authorization',
        points: [
          '<strong>Security Filter Chain:</strong> Spring Security is based on a chain of Servlet Filters (delegated via <code>DelegatingFilterProxy</code> to <code>FilterChainProxy</code>). Requests must pass through filters like <code>UsernamePasswordAuthenticationFilter</code> and <code>FilterSecurityInterceptor</code>.',
          '<strong>Authentication vs. Authorization:</strong> <strong>Authentication</strong> is verifying identity (who you are, managed by <code>AuthenticationManager</code> and <code>AuthenticationProvider</code>). <strong>Authorization</strong> is verifying permissions (what you are allowed to do, managed by <code>AuthorizationManager</code>).',
          '<strong>JWT (JSON Web Token):</strong> A stateless token format consisting of Header, Payload, and Signature. It stores user claims and is signed by the server, allowing the backend to remain stateless.',
          '<strong>CSRF (Cross-Site Request Forgery):</strong> An exploit where an unauthorized command is transmitted from a trusted user. Spring Security provides CSRF tokens to validate state-changing requests (disabled for stateless APIs using JWTs).',
          '<strong>Method Security:</strong> Enabling security annotations at the method layer using <code>@EnableMethodSecurity</code>. Annotations: <code>@PreAuthorize("hasRole('ADMIN')")</code>, <code>@PostAuthorize</code>, <code>@Secured</code>.'
        ],
        codeExamples: [
          {
            title: 'Configuring SecurityFilterChain (Spring Security 6.x)',
            code: '@Configuration\n@EnableWebSecurity\n@EnableMethodSecurity\npublic class SecurityConfig {\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs\n            .sessionManagement(session -> session\n                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/auth/**").permitAll()\n                .anyRequest().authenticated())\n            .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);\n\n        return http.build();\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Explain the core objects in SecurityContext: SecurityContextHolder holds SecurityContext, which contains the Authentication object representing the currently logged-in user (Principal, Credentials, Authorities).',
          'Explain why we disable CSRF in REST APIs using JWT: JWTs are typically stored in localStorage or custom headers rather than cookies, which automatically protects them from browser-based CSRF attacks.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between Authentication and Authorization?', back: 'Authentication is the process of verifying who a user is (credentials check). Authorization is the process of verifying what resources or actions an authenticated user has permission to access.' },
        { front: 'What is the role of the SecurityContextHolder?', back: 'SecurityContextHolder is a helper class providing access to the current SecurityContext, which stores details of the authenticated user (Authentication object). By default, it uses ThreadLocal to store user data per thread.' },
        { front: 'How does DelegatingFilterProxy work?', back: 'DelegatingFilterProxy is a standard Servlet Filter registered in web.xml/servlet context. It intercepts requests but delegates actual filtering work to a Spring Bean implementing Filter (typically FilterChainProxy).' },
        { front: 'What is a JWT and what are its three parts?', back: 'JWT is a stateless token representing user claims. Its parts are: 1) Header (specifies token type and signing algorithm), 2) Payload (contains claims like username, roles, expiration), and 3) Signature (verifies integrity using a secret key).' }
      ],
      quiz: [
        {
          question: 'Which class holds the details of the currently authenticated principal in Spring Security?',
          options: ['SecurityContextHolder', 'AuthenticationManager', 'UserDetailsService', 'ProviderManager'],
          correct: 0,
          explanation: 'SecurityContextHolder stores the SecurityContext, which contains the Authentication object representing the current user principal.',
          difficulty: 'easy'
        },
        {
          question: 'Which Spring Security annotation is used to authorize method access using SpEL before the method executes?',
          options: ['@Secured', '@PreAuthorize', '@RolesAllowed', '@PostAuthorize'],
          correct: 1,
          explanation: '@PreAuthorize allows evaluating Spring Expression Language (SpEL) expressions to verify user authorities before invoking a method.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'How would you implement stateless JWT authentication in a Spring Boot application?',
          hint: 'Describe custom filter, authentication manager, and filter chain configuration.',
          answer: 'Create a JwtTokenProvider to generate and validate JWTs. Create a JwtAuthenticationFilter that extends OncePerRequestFilter, extracts the JWT from the Authorization header, validates it, loads user details, and sets the Authentication object in SecurityContextHolder. In the SecurityFilterChain configuration, disable sessions (SessionCreationPolicy.STATELESS), disable CSRF, and insert the JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter.'
        }
      ]
    }
  ]
});
