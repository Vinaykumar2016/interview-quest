// Interview Quest - Architecture Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'architecture',
  name: 'Architecture',
  icon: '🏗️',
  color: '#3B82F6',
  topics: [
    {
      id: 'microservices',
      name: 'Microservices',
      icon: '🔲',
      notes: {
        title: 'Microservices',
        points: [
          '<strong>Monolith vs Microservices:</strong> A monolith is a single deployable unit; microservices decompose an application into small, independently deployable services, each owning its own data and communicating via APIs or messaging.',
          '<strong>12-Factor App:</strong> A methodology for building SaaS apps covering codebase, dependencies, config, backing services, build/release/run, processes, port binding, concurrency, disposability, dev/prod parity, logs, and admin processes.',
          '<strong>Service Discovery & API Gateway:</strong> <code>Eureka</code> enables services to register and discover each other dynamically. <code>Spring Cloud Gateway</code> acts as a single entry point, handling routing, rate limiting, and cross-cutting concerns.',
          '<strong>Resilience Patterns:</strong> <code>Resilience4j</code> provides circuit breaker, retry, rate limiter, and bulkhead patterns. Circuit breaker prevents cascading failures by stopping calls to unhealthy services (states: CLOSED → OPEN → HALF_OPEN).',
          '<strong>Distributed Tracing & Config:</strong> <code>Zipkin</code> with <code>Spring Cloud Sleuth</code> traces requests across services using trace IDs and span IDs. <code>Spring Cloud Config Server</code> centralizes configuration for all microservices.',
          '<strong>Event-Driven Architecture & Saga Pattern:</strong> Services communicate asynchronously via events (Kafka, RabbitMQ). The Saga pattern manages distributed transactions using choreography (events) or orchestration (central coordinator).',
          '<strong>CQRS & Eventual Consistency:</strong> Command Query Responsibility Segregation separates read and write models for scalability. With database-per-service, strong consistency is traded for eventual consistency using event sourcing.',
          '<strong>Containerization & Orchestration:</strong> <code>Docker</code> packages services into portable containers. <code>Kubernetes</code> orchestrates containers with features like auto-scaling, self-healing, service discovery, and rolling deployments.'
        ],
        codeExamples: [
          {
            title: 'Spring Cloud Gateway Route Configuration',
            code: '@Configuration\npublic class GatewayConfig {\n\n    @Bean\n    public RouteLocator customRoutes(RouteLocatorBuilder builder) {\n        return builder.routes()\n            .route("order-service", r -> r\n                .path("/api/orders/**")\n                .filters(f -> f\n                    .circuitBreaker(c -> c\n                        .setName("orderCB")\n                        .setFallbackUri("forward:/fallback/orders"))\n                    .retry(retryConfig -> retryConfig\n                        .setRetries(3)\n                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE)))\n                .uri("lb://ORDER-SERVICE"))\n            .route("product-service", r -> r\n                .path("/api/products/**")\n                .uri("lb://PRODUCT-SERVICE"))\n            .build();\n    }\n}',
            language: 'java'
          },
          {
            title: 'Resilience4j Circuit Breaker with Fallback',
            code: '@Service\npublic class OrderService {\n\n    private final RestTemplate restTemplate;\n\n    @CircuitBreaker(name = "inventoryService",\n                    fallbackMethod = "inventoryFallback")\n    @Retry(name = "inventoryService", fallbackMethod = "inventoryFallback")\n    public InventoryResponse checkInventory(String productId) {\n        return restTemplate.getForObject(\n            "http://inventory-service/api/inventory/" + productId,\n            InventoryResponse.class);\n    }\n\n    private InventoryResponse inventoryFallback(String productId,\n                                                 Throwable t) {\n        log.warn("Fallback triggered for product {}: {}",\n                 productId, t.getMessage());\n        return InventoryResponse.builder()\n            .productId(productId)\n            .available(false)\n            .message("Inventory service unavailable")\n            .build();\n    }\n}',
            language: 'java'
          },
          {
            title: 'Event-Driven Communication with Kafka',
            code: '// Producer - Order Service\n@Service\npublic class OrderEventPublisher {\n\n    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;\n\n    public void publishOrderCreated(Order order) {\n        OrderEvent event = new OrderEvent(\n            order.getId(), OrderStatus.CREATED,\n            order.getItems(), LocalDateTime.now());\n        kafkaTemplate.send("order-events", order.getId(), event);\n    }\n}\n\n// Consumer - Inventory Service\n@Service\npublic class OrderEventConsumer {\n\n    @KafkaListener(topics = "order-events",\n                   groupId = "inventory-group")\n    public void handleOrderEvent(OrderEvent event) {\n        if (event.getStatus() == OrderStatus.CREATED) {\n            inventoryService.reserveItems(event.getItems());\n        }\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Be ready to explain WHY you chose microservices over a monolith in your project — mention scalability, team autonomy, and independent deployment.',
          'Draw a high-level architecture diagram showing API Gateway, service registry, config server, and inter-service communication when asked about your microservices experience.',
          'Know the tradeoffs: microservices add operational complexity (distributed tracing, eventual consistency, network latency) — interviewers love candidates who acknowledge real-world challenges.'
        ]
      },
      flashcards: [
        { front: 'What are the three states of a Circuit Breaker?', back: 'CLOSED (requests flow normally), OPEN (requests are blocked and fallback is used), and HALF_OPEN (a limited number of test requests are allowed to check if the service has recovered).' },
        { front: 'What is the difference between Saga Choreography and Saga Orchestration?', back: 'Choreography: each service publishes events and reacts to other services\' events with no central coordinator. Orchestration: a central saga orchestrator tells each service what to do and handles compensating transactions on failure.' },
        { front: 'What does the 12-Factor App say about configuration?', back: 'Configuration should be stored in the environment (environment variables), not in code. This ensures strict separation of config from code and allows the same codebase to be deployed across multiple environments.' },
        { front: 'How does Eureka service discovery work?', back: 'Services register themselves with the Eureka server on startup and send periodic heartbeats. Clients query Eureka to discover available instances of a service and use client-side load balancing (Ribbon/Spring Cloud LoadBalancer) to route requests.' },
        { front: 'What is CQRS and when would you use it?', back: 'Command Query Responsibility Segregation separates read (query) and write (command) models. Use it when read and write workloads have very different scaling requirements, or when you need optimized read models (e.g., denormalized views) separate from the write model.' },
        { front: 'What is the Database Per Service pattern?', back: 'Each microservice owns its private database (or schema) that only it can access directly. Other services must go through the service\'s API. This ensures loose coupling but introduces challenges with distributed queries and transactions.' },
        { front: 'How does distributed tracing work with Zipkin and Sleuth?', back: 'Spring Cloud Sleuth automatically adds a trace ID (shared across all services for one request) and a span ID (unique per service hop) to log entries and HTTP headers. Zipkin collects and visualizes these traces to show request flow and latency across services.' },
        { front: 'What is an API Gateway and what cross-cutting concerns does it handle?', back: 'An API Gateway (e.g., Spring Cloud Gateway) is a single entry point for all client requests. It handles routing, load balancing, authentication, rate limiting, circuit breaking, request/response transformation, and SSL termination.' }
      ],
      quiz: [
        {
          question: 'Which pattern prevents cascading failures in a microservices architecture by stopping calls to an unhealthy downstream service?',
          options: ['Saga Pattern', 'Circuit Breaker Pattern', 'API Gateway Pattern', 'Strangler Fig Pattern'],
          correct: 1,
          explanation: 'The Circuit Breaker pattern (e.g., Resilience4j) monitors failures and "opens" the circuit to prevent further calls to a failing service, using a fallback instead. The Saga pattern handles distributed transactions. The API Gateway is a routing entry point. The Strangler Fig is a migration pattern.',
          difficulty: 'easy'
        },
        {
          question: 'In a 12-Factor App, where should application configuration (like database URLs) be stored?',
          options: ['In a properties file bundled with the application', 'In environment variables', 'Hardcoded in the source code', 'In a shared database table'],
          correct: 1,
          explanation: 'The 12-Factor methodology requires configuration to be stored in environment variables to ensure strict separation of config from code. Properties files bundled with the app violate this principle. Hardcoding and shared DB tables are anti-patterns.',
          difficulty: 'easy'
        },
        {
          question: 'When using the Saga pattern with choreography, how do services coordinate a distributed transaction?',
          options: ['A central orchestrator sends commands to each service in sequence', 'Services publish domain events and other services react to those events', 'All services participate in a two-phase commit protocol', 'Services share a single distributed database with ACID transactions'],
          correct: 1,
          explanation: 'In choreography-based Saga, each service publishes events and subscribes to other services\' events — there is no central coordinator. Orchestration uses a central orchestrator. Two-phase commit is avoided in microservices due to tight coupling. Shared databases violate service autonomy.',
          difficulty: 'medium'
        },
        {
          question: 'What is the primary benefit of the Database Per Service pattern in microservices?',
          options: ['It simplifies cross-service JOIN queries', 'It ensures loose coupling and independent deployability of services', 'It guarantees strong consistency across all services', 'It reduces the total number of database instances needed'],
          correct: 1,
          explanation: 'Database Per Service ensures each service can evolve its schema independently and be deployed without coordinating with other teams. Cross-service JOINs become harder (not simpler). Strong consistency is traded for eventual consistency. More databases are needed, not fewer.',
          difficulty: 'medium'
        },
        {
          question: 'In a Kubernetes deployment, which resource is responsible for maintaining a desired number of pod replicas and performing rolling updates?',
          options: ['Service', 'ConfigMap', 'Deployment', 'Ingress'],
          correct: 2,
          explanation: 'A Kubernetes Deployment manages ReplicaSets, ensures the desired number of pod replicas are running, and handles rolling updates and rollbacks. A Service provides network access to pods. ConfigMap stores configuration data. Ingress manages external HTTP routing.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'How would you decompose a monolithic application into microservices?',
          hint: 'Think about domain-driven design, bounded contexts, and migration strategy.',
          answer: 'I would start by identifying bounded contexts using Domain-Driven Design (DDD) to define clear service boundaries around business capabilities. Each bounded context becomes a candidate microservice with its own data store. I would use the Strangler Fig pattern for gradual migration — routing new features to microservices while incrementally extracting modules from the monolith. API Gateway would serve as the single entry point, routing requests to either the monolith or the new services. Communication between services would use synchronous REST for queries and asynchronous messaging (Kafka/RabbitMQ) for events. I would prioritize extracting services with the highest rate of change or distinct scaling needs first.',
          difficulty: 'hard',
          followUp: 'How would you handle shared data between the old monolith and the new microservices during the migration?'
        },
        {
          question: 'Explain how you would implement resilience in a microservices system.',
          hint: 'Consider circuit breakers, retries, timeouts, fallbacks, and bulkheads.',
          answer: 'I would implement multiple layers of resilience using Resilience4j. First, circuit breakers on all inter-service calls to prevent cascading failures — configured with failure rate thresholds (e.g., 50% over 10 calls) and automatic recovery in HALF_OPEN state. Second, retry mechanisms with exponential backoff for transient failures. Third, timeouts on all outgoing calls to avoid thread exhaustion. Fourth, bulkhead pattern to isolate thread pools per downstream service so one slow service cannot consume all threads. Finally, fallback methods that return cached data or degraded responses. All these patterns would be monitored via metrics exported to Prometheus and visualized in Grafana dashboards.',
          difficulty: 'medium',
          followUp: 'How would you test your circuit breaker configuration before deploying to production?'
        },
        {
          question: 'What is event-driven architecture and how does it relate to eventual consistency?',
          hint: 'Think about async communication, event sourcing, and the CAP theorem.',
          answer: 'Event-driven architecture is a design pattern where services communicate by producing and consuming events asynchronously, typically through a message broker like Apache Kafka or RabbitMQ. When a service performs an action (e.g., creating an order), it publishes a domain event that other interested services can consume and react to. This naturally leads to eventual consistency — after an event is published, consuming services will update their own state asynchronously, meaning the system may be temporarily inconsistent but will converge to a consistent state. This is a deliberate tradeoff aligned with the CAP theorem, favoring availability and partition tolerance over strong consistency. Patterns like event sourcing (storing all state changes as events) and CQRS (separate read/write models) complement this approach.',
          difficulty: 'medium',
          followUp: 'How would you handle a situation where a consuming service misses an event?'
        },
        {
          question: 'Describe the role of an API Gateway in a microservices architecture.',
          hint: 'Think about cross-cutting concerns, routing, security, and rate limiting.',
          answer: 'An API Gateway like Spring Cloud Gateway serves as the single entry point for all client requests in a microservices architecture. It handles several critical cross-cutting concerns: request routing (directing requests to the appropriate downstream service based on path, headers, or other predicates), load balancing across service instances using service discovery (Eureka), authentication and authorization (validating JWT tokens before forwarding requests), rate limiting to protect services from abuse, circuit breaking to handle downstream failures gracefully, and request/response transformation. It also enables API composition where a single client request can be fanned out to multiple microservices and the results aggregated. This eliminates the need for clients to know about individual service locations and simplifies the client-side code significantly.',
          difficulty: 'easy',
          followUp: 'What are the risks of having a single API Gateway, and how would you mitigate them?'
        }
      ]
    },
    {
      id: 'multithreading',
      name: 'Multi-threading',
      icon: '🔀',
      notes: {
        title: 'Multi-threading',
        points: [
          '<strong>Thread Creation:</strong> Threads can be created by extending <code>Thread</code>, implementing <code>Runnable</code> (no return value), or implementing <code>Callable&lt;V&gt;</code> (returns a value via <code>Future&lt;V&gt;</code>). Prefer <code>Runnable</code>/<code>Callable</code> since Java allows only single inheritance.',
          '<strong>Thread Lifecycle:</strong> A thread transitions through states: NEW → RUNNABLE → (BLOCKED | WAITING | TIMED_WAITING) → TERMINATED. Use <code>Thread.getState()</code> to inspect the current state.',
          '<strong>Synchronization Mechanisms:</strong> <code>synchronized</code> keyword provides intrinsic locking. <code>ReentrantLock</code> offers explicit locking with tryLock, fairness, and interruptible waits. <code>volatile</code> ensures visibility of variable changes across threads but does not guarantee atomicity.',
          '<strong>Atomic Classes & Concurrent Collections:</strong> <code>AtomicInteger</code>, <code>AtomicLong</code>, <code>AtomicReference</code> use CAS (Compare-And-Swap) for lock-free thread safety. <code>ConcurrentHashMap</code> uses bucket-level locking; <code>CopyOnWriteArrayList</code> creates a new array on every write.',
          '<strong>Thread Pools (ExecutorService):</strong> <code>Executors.newFixedThreadPool(n)</code> creates a fixed pool. <code>Executors.newCachedThreadPool()</code> creates threads on demand. <code>Executors.newSingleThreadExecutor()</code> ensures sequential execution. Always shut down executors to avoid resource leaks.',
          '<strong>CompletableFuture:</strong> Enables non-blocking, composable asynchronous programming. Chain operations with <code>thenApply()</code>, <code>thenCompose()</code>, <code>thenCombine()</code>. Handle exceptions with <code>exceptionally()</code> or <code>handle()</code>.',
          '<strong>Concurrency Problems:</strong> <strong>Deadlock</strong>: two threads waiting for each other\'s locks. <strong>Livelock</strong>: threads keep changing state in response to each other without progressing. <strong>Starvation</strong>: a thread is perpetually denied access to resources. <strong>Race condition</strong>: outcome depends on thread scheduling order.',
          '<strong>Coordination Utilities:</strong> <code>CountDownLatch</code>: one-time barrier — threads wait until a counter reaches zero. <code>CyclicBarrier</code>: reusable barrier — threads wait for each other. <code>Semaphore</code>: controls access to a resource with a fixed number of permits. <code>Fork/Join</code>: divide-and-conquer parallelism for recursive tasks.'
        ],
        codeExamples: [
          {
            title: 'CompletableFuture Composition',
            code: 'public class AsyncOrderProcessor {\n\n    private final ExecutorService executor =\n        Executors.newFixedThreadPool(4);\n\n    public CompletableFuture<OrderResult> processOrder(Order order) {\n        CompletableFuture<Inventory> inventoryFuture =\n            CompletableFuture.supplyAsync(\n                () -> checkInventory(order), executor);\n\n        CompletableFuture<PaymentResult> paymentFuture =\n            CompletableFuture.supplyAsync(\n                () -> processPayment(order), executor);\n\n        return inventoryFuture\n            .thenCombine(paymentFuture, (inventory, payment) -> {\n                if (inventory.isAvailable() && payment.isSuccess()) {\n                    return new OrderResult(Status.CONFIRMED);\n                }\n                return new OrderResult(Status.FAILED);\n            })\n            .exceptionally(ex -> {\n                log.error("Order processing failed", ex);\n                return new OrderResult(Status.ERROR);\n            });\n    }\n}',
            language: 'java'
          },
          {
            title: 'Producer-Consumer with BlockingQueue',
            code: 'public class ProducerConsumerExample {\n\n    private static final BlockingQueue<String> queue =\n        new LinkedBlockingQueue<>(10);\n\n    public static void main(String[] args) {\n        Thread producer = new Thread(() -> {\n            try {\n                for (int i = 0; i < 20; i++) {\n                    String item = "Item-" + i;\n                    queue.put(item); // blocks if queue is full\n                    System.out.println("Produced: " + item);\n                }\n                queue.put("DONE"); // poison pill\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        });\n\n        Thread consumer = new Thread(() -> {\n            try {\n                while (true) {\n                    String item = queue.take(); // blocks if empty\n                    if ("DONE".equals(item)) break;\n                    System.out.println("Consumed: " + item);\n                }\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        });\n\n        producer.start();\n        consumer.start();\n    }\n}',
            language: 'java'
          },
          {
            title: 'Virtual Threads (Java 21)',
            code: 'public class VirtualThreadDemo {\n\n    public static void main(String[] args) throws Exception {\n        // Create a single virtual thread\n        Thread vThread = Thread.ofVirtual()\n            .name("virtual-1")\n            .start(() -> {\n                System.out.println("Running on: "\n                    + Thread.currentThread());\n            });\n        vThread.join();\n\n        // Virtual thread executor for high-throughput I/O\n        try (var executor =\n                 Executors.newVirtualThreadPerTaskExecutor()) {\n            List<Future<String>> futures = new ArrayList<>();\n            for (int i = 0; i < 10_000; i++) {\n                final int taskId = i;\n                futures.add(executor.submit(() -> {\n                    Thread.sleep(Duration.ofMillis(100));\n                    return "Result-" + taskId;\n                }));\n            }\n            // 10,000 concurrent tasks with minimal resources\n            for (Future<String> f : futures) {\n                f.get(); // process results\n            }\n        }\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Always mention that you prefer Runnable/Callable over extending Thread — it shows you understand composition over inheritance and allows implementing other interfaces.',
          'When discussing thread safety, mention the spectrum: volatile (visibility only) → AtomicXxx (single variable atomicity via CAS) → synchronized/Lock (mutual exclusion for compound actions).',
          'Be prepared to write code for classic problems like producer-consumer and demonstrate knowledge of Java 21 virtual threads — it shows you stay current with the language.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between Runnable and Callable?', back: 'Runnable\'s run() method returns void and cannot throw checked exceptions. Callable\'s call() method returns a value of type V and can throw checked exceptions. Callable is used with ExecutorService.submit() which returns a Future<V>.' },
        { front: 'What is the difference between synchronized and ReentrantLock?', back: 'synchronized is an implicit lock (auto-released when block exits). ReentrantLock is explicit (manual lock/unlock), supports tryLock() with timeout, fairness ordering, multiple Condition objects, and interruptible lock waits. ReentrantLock must be unlocked in a finally block.' },
        { front: 'What does the volatile keyword guarantee?', back: 'volatile guarantees visibility — a write to a volatile variable is immediately visible to all threads. It also prevents instruction reordering around the variable. However, it does NOT guarantee atomicity for compound operations like i++ (use AtomicInteger instead).' },
        { front: 'How does ConcurrentHashMap achieve thread safety?', back: 'In Java 8+, ConcurrentHashMap uses bucket-level (node-level) synchronization with CAS operations for non-contended cases and synchronized blocks per bucket for contended cases. This allows high concurrency compared to Hashtable which locks the entire map.' },
        { front: 'What is the difference between CountDownLatch and CyclicBarrier?', back: 'CountDownLatch is a one-time barrier: threads call countDown() and one or more threads await() until count reaches zero. It cannot be reused. CyclicBarrier is reusable: N threads call await() and all are released when N threads arrive. It resets automatically.' },
        { front: 'What causes a deadlock and how can you prevent it?', back: 'Deadlock occurs when two or more threads hold locks and wait for each other\'s locks (circular wait). Prevention strategies: always acquire locks in a consistent global order, use tryLock() with timeouts, avoid holding multiple locks, or use lock-free data structures.' },
        { front: 'What are Virtual Threads in Java 21?', back: 'Virtual threads are lightweight threads managed by the JVM (not the OS). They are cheap to create (millions possible) and are ideal for I/O-bound workloads. They use carrier (platform) threads under the hood and automatically unmount during blocking operations like Thread.sleep() or I/O.' },
        { front: 'What is the Fork/Join framework?', back: 'Fork/Join is a framework for divide-and-conquer parallelism. Tasks extend RecursiveTask<V> (returns value) or RecursiveAction (void). Large tasks fork() into subtasks and join() their results. It uses a work-stealing algorithm where idle threads steal tasks from busy threads\' deques.' }
      ],
      quiz: [
        {
          question: 'Which of the following is true about the volatile keyword in Java?',
          options: ['It guarantees both visibility and atomicity of operations', 'It guarantees visibility but not atomicity of compound operations', 'It is equivalent to using synchronized on every access', 'It can only be applied to primitive types'],
          correct: 1,
          explanation: 'volatile guarantees that changes to a variable are immediately visible to all threads (visibility), but it does NOT guarantee atomicity for compound operations like i++ (which is read-modify-write). It is not equivalent to synchronized (which provides both visibility and atomicity). It can be applied to both primitives and object references.',
          difficulty: 'easy'
        },
        {
          question: 'What is the key advantage of using Executors.newFixedThreadPool() over creating threads manually?',
          options: ['It creates daemon threads that stop when the main thread exits', 'It reuses a fixed number of threads, reducing thread creation overhead and controlling resource usage', 'It automatically makes all tasks thread-safe', 'It provides built-in deadlock detection'],
          correct: 1,
          explanation: 'A fixed thread pool reuses a set number of threads from a queue, avoiding the overhead of creating and destroying threads for each task and preventing resource exhaustion. It does not create daemon threads by default, does not make tasks thread-safe, and does not detect deadlocks.',
          difficulty: 'easy'
        },
        {
          question: 'In a CompletableFuture chain, which method is used to combine the results of two independent asynchronous operations?',
          options: ['thenApply()', 'thenCompose()', 'thenCombine()', 'thenAccept()'],
          correct: 2,
          explanation: 'thenCombine() waits for two independent CompletableFutures to complete and combines their results with a BiFunction. thenApply() transforms a single result (like map). thenCompose() chains dependent futures (like flatMap). thenAccept() consumes a result without returning a value.',
          difficulty: 'medium'
        },
        {
          question: 'Which concurrency utility allows a fixed number of threads to access a shared resource simultaneously?',
          options: ['CountDownLatch', 'CyclicBarrier', 'Semaphore', 'ReentrantLock'],
          correct: 2,
          explanation: 'Semaphore maintains a set of permits — threads acquire a permit before accessing the resource and release it after. This controls how many threads can access a resource concurrently. CountDownLatch and CyclicBarrier are for thread coordination/synchronization. ReentrantLock allows only one thread (mutual exclusion).',
          difficulty: 'medium'
        },
        {
          question: 'What is the primary benefit of virtual threads (Java 21) over platform threads for I/O-bound applications?',
          options: ['Virtual threads execute faster because they bypass the JVM', 'Virtual threads are managed by the OS kernel for better scheduling', 'Virtual threads are extremely lightweight, allowing millions of concurrent threads without proportional OS thread overhead', 'Virtual threads automatically parallelize CPU-bound computations'],
          correct: 2,
          explanation: 'Virtual threads are JVM-managed (not OS-managed) and are extremely lightweight (~1KB stack vs ~1MB for platform threads). This allows creating millions of concurrent threads for I/O-bound tasks without exhausting system resources. They do not bypass the JVM, are not kernel-managed, and do not offer advantages for CPU-bound work over platform threads.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain the difference between Thread, Runnable, and Callable. When would you use each?',
          hint: 'Think about return values, checked exceptions, and inheritance limitations.',
          answer: 'Thread is a class you can extend, but this prevents extending other classes since Java has single inheritance. Runnable is a functional interface with a run() method that returns void and cannot throw checked exceptions — ideal for fire-and-forget tasks. Callable<V> is a functional interface with a call() method that returns a value and can throw checked exceptions — use it when you need a result from an asynchronous computation. In modern Java, I prefer Runnable or Callable with ExecutorService over extending Thread, as it separates the task definition from the threading mechanism and enables thread pool reuse.',
          difficulty: 'easy',
          followUp: 'How does a Future relate to Callable, and what are its limitations that CompletableFuture addresses?'
        },
        {
          question: 'What is a deadlock? How would you detect and prevent it in a Java application?',
          hint: 'Think about lock ordering, the four Coffman conditions, and diagnostic tools.',
          answer: 'A deadlock occurs when two or more threads are permanently blocked, each waiting for a lock held by the other — forming a circular dependency. The four Coffman conditions are: mutual exclusion, hold and wait, no preemption, and circular wait. To prevent deadlocks, I ensure consistent lock ordering across all threads (eliminating circular wait), use tryLock() with timeouts from ReentrantLock to avoid indefinite blocking, minimize the scope and duration of locks, and prefer lock-free alternatives like ConcurrentHashMap or atomic variables where possible. For detection, I use thread dumps (jstack), JMX ThreadMXBean.findDeadlockedThreads(), or profiling tools like VisualVM. In production, setting timeouts and circuit breakers on lock acquisition helps fail fast rather than hang indefinitely.',
          difficulty: 'medium',
          followUp: 'Can you explain the difference between deadlock and livelock with examples?'
        },
        {
          question: 'How does CompletableFuture improve over the traditional Future interface?',
          hint: 'Think about non-blocking composition, exception handling, and combining results.',
          answer: 'Traditional Future only provides a blocking get() method — you cannot chain operations, combine results, or handle exceptions declaratively. CompletableFuture solves this by enabling non-blocking, composable async programming. You can chain transformations with thenApply() (synchronous map), chain dependent async tasks with thenCompose() (flatMap), combine independent results with thenCombine(), and handle errors with exceptionally() or handle(). It also supports allOf() and anyOf() for waiting on multiple futures. This enables building complex async pipelines without callback hell, similar to Promises in JavaScript. CompletableFuture also integrates with custom executors for fine-grained control over the thread pool used for async operations.',
          difficulty: 'medium',
          followUp: 'When would you use thenCompose() vs thenApply()?'
        },
        {
          question: 'Explain virtual threads in Java 21 and when you would choose them over platform threads.',
          hint: 'Think about I/O-bound vs CPU-bound workloads and scalability.',
          answer: 'Virtual threads are lightweight threads managed entirely by the JVM, not the operating system. Unlike platform threads (which map 1:1 to OS threads and consume ~1MB of stack each), virtual threads are extremely cheap (~1KB) and can be created in millions. They are ideal for I/O-bound workloads like HTTP servers, database calls, and microservice communication, where threads spend most of their time waiting. When a virtual thread performs a blocking operation (e.g., Thread.sleep(), socket I/O), it automatically unmounts from its carrier (platform) thread, freeing it for other virtual threads. However, virtual threads are NOT suited for CPU-bound tasks because they still share the same carrier thread pool and do not provide true parallel computation. I would use them with Executors.newVirtualThreadPerTaskExecutor() for high-concurrency I/O workloads while keeping platform threads with fixed pools for CPU-intensive processing.',
          difficulty: 'hard',
          followUp: 'What are the limitations of virtual threads, such as with synchronized blocks and ThreadLocal?'
        },
        {
          question: 'How does ConcurrentHashMap achieve high concurrency compared to Hashtable and Collections.synchronizedMap()?',
          hint: 'Think about lock granularity, CAS operations, and internal structure.',
          answer: 'Hashtable and Collections.synchronizedMap() use a single lock for the entire map — every read and write operation blocks all other threads. ConcurrentHashMap in Java 8+ uses a much finer-grained approach: it employs CAS (Compare-And-Swap) operations for non-contended bucket access and synchronized blocks only on the specific bucket (tree node) being modified. This means concurrent reads are completely lock-free, and writes only block other writes to the same bucket. Additionally, ConcurrentHashMap provides atomic compound operations like putIfAbsent(), compute(), and merge() that avoid the check-then-act race conditions common with regular Maps. The tradeoff is that operations like size() return an approximation rather than an exact count, and iterators are weakly consistent rather than fail-fast.',
          difficulty: 'medium',
          followUp: 'Why should you avoid using ConcurrentHashMap with external synchronization, and what is the risk?'
        }
      ]
    }
  ]
});
