// Interview Quest - Cloud & AI Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'cloud-ai',
  name: 'Cloud & AI',
  icon: '☁️',
  color: '#06B6D4',
  topics: [
    {
      id: 'aws',
      name: 'AWS Cloud',
      icon: '☁️',
      notes: {
        title: 'AWS Cloud',
        points: [
          '<strong>Core Compute Services:</strong> <code>EC2</code> provides resizable virtual servers with instance types optimized for compute (C-series), memory (R-series), storage (I-series), and general purpose (T/M-series). <code>Lambda</code> enables serverless functions that run code in response to events with automatic scaling and pay-per-invocation pricing.',
          '<strong>Storage Services:</strong> <code>S3</code> offers object storage with tiers: Standard (frequent access), Intelligent-Tiering (auto-optimized), Standard-IA (infrequent), Glacier (archive), and Deep Archive (long-term). Lifecycle policies automatically transition objects between tiers based on age.',
          '<strong>Database Services:</strong> <code>RDS</code> provides managed relational databases (MySQL, PostgreSQL, Oracle). <code>DynamoDB</code> is a serverless NoSQL key-value/document store with single-digit millisecond latency. <code>ElastiCache</code> offers managed Redis/Memcached for in-memory caching.',
          '<strong>Messaging & Events:</strong> <code>SQS</code> is a fully managed message queue (Standard: at-least-once, FIFO: exactly-once). <code>SNS</code> is a pub/sub notification service for fan-out messaging. Both decouple microservices and enable event-driven architectures.',
          '<strong>Containers & Orchestration:</strong> <code>ECS</code> is AWS-native container orchestration. <code>EKS</code> is managed Kubernetes. <code>Fargate</code> is a serverless compute engine for containers — no EC2 instances to manage. Choose EKS for Kubernetes portability, ECS for AWS-native simplicity.',
          '<strong>Networking & Security:</strong> <code>VPC</code> provides isolated virtual networks with subnets (public/private), route tables, NAT gateways, and internet gateways. <code>IAM</code> manages users, roles, and policies. Security groups are stateful firewalls; NACLs are stateless network-level filters.',
          '<strong>CI/CD & Infrastructure as Code:</strong> <code>CodePipeline</code> orchestrates CI/CD workflows. <code>CodeBuild</code> compiles, tests, and packages code. <code>CloudFormation</code> (YAML/JSON templates) and <code>CDK</code> (imperative code like Java/TypeScript) define infrastructure as code.',
          '<strong>Deployment Strategies:</strong> <strong>Blue-Green</strong>: maintain two identical environments, switch traffic instantly via load balancer. <strong>Canary</strong>: route a small percentage of traffic to the new version, gradually increasing. <strong>Rolling</strong>: update instances in batches. Auto Scaling Groups adjust capacity based on demand.'
        ],
        codeExamples: [
          {
            title: 'AWS Lambda Handler with DynamoDB (Java)',
            code: 'public class OrderHandler implements\n        RequestHandler<APIGatewayProxyRequestEvent,\n                       APIGatewayProxyResponseEvent> {\n\n    private final DynamoDbClient dynamoDb =\n        DynamoDbClient.create();\n\n    @Override\n    public APIGatewayProxyResponseEvent handleRequest(\n            APIGatewayProxyRequestEvent event, Context context) {\n\n        Order order = new Gson().fromJson(\n            event.getBody(), Order.class);\n\n        Map<String, AttributeValue> item = Map.of(\n            "orderId", AttributeValue.builder()\n                .s(UUID.randomUUID().toString()).build(),\n            "product", AttributeValue.builder()\n                .s(order.getProduct()).build(),\n            "quantity", AttributeValue.builder()\n                .n(String.valueOf(order.getQuantity())).build(),\n            "status", AttributeValue.builder()\n                .s("CREATED").build()\n        );\n\n        dynamoDb.putItem(PutItemRequest.builder()\n            .tableName("Orders")\n            .item(item)\n            .build());\n\n        return new APIGatewayProxyResponseEvent()\n            .withStatusCode(201)\n            .withBody("{\\\"message\\\":\\\"Order created\\\"}");\n    }\n}',
            language: 'java'
          },
          {
            title: 'S3 File Operations with AWS SDK v2',
            code: 'public class S3Service {\n\n    private final S3Client s3 = S3Client.builder()\n        .region(Region.US_EAST_1)\n        .build();\n\n    public void uploadFile(String bucket, String key,\n                           Path filePath) {\n        s3.putObject(\n            PutObjectRequest.builder()\n                .bucket(bucket)\n                .key(key)\n                .storageClass(StorageClass.STANDARD_IA)\n                .build(),\n            RequestBody.fromFile(filePath));\n    }\n\n    public String generatePresignedUrl(String bucket,\n                                        String key) {\n        S3Presigner presigner = S3Presigner.create();\n        GetObjectRequest getRequest = GetObjectRequest.builder()\n            .bucket(bucket)\n            .key(key)\n            .build();\n\n        GetObjectPresignRequest presignRequest =\n            GetObjectPresignRequest.builder()\n                .signatureDuration(Duration.ofMinutes(15))\n                .getObjectRequest(getRequest)\n                .build();\n\n        return presigner.presignGetObject(presignRequest)\n            .url().toString();\n    }\n}',
            language: 'java'
          },
          {
            title: 'CloudFormation Template (YAML) for Lambda + API Gateway',
            code: 'AWSTemplateFormatVersion: "2010-09-09"\nTransform: AWS::Serverless-2016-10-31\nDescription: Serverless Order API\n\nResources:\n  OrderFunction:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: com.example.OrderHandler::handleRequest\n      Runtime: java21\n      MemorySize: 512\n      Timeout: 30\n      Policies:\n        - DynamoDBCrudPolicy:\n            TableName: !Ref OrdersTable\n      Events:\n        CreateOrder:\n          Type: Api\n          Properties:\n            Path: /orders\n            Method: POST\n\n  OrdersTable:\n    Type: AWS::DynamoDB::Table\n    Properties:\n      TableName: Orders\n      BillingMode: PAY_PER_REQUEST\n      AttributeDefinitions:\n        - AttributeName: orderId\n          AttributeType: S\n      KeySchema:\n        - AttributeName: orderId\n          KeyType: HASH',
            language: 'yaml'
          }
        ],
        interviewTips: [
          'Know the difference between RDS, DynamoDB, and ElastiCache — interviewers often ask you to choose the right database for a given scenario and justify your decision.',
          'Be prepared to design a VPC architecture with public and private subnets, NAT gateway, and security groups — this is a common whiteboard question.',
          'Understand the pricing models (on-demand, reserved, spot for EC2; pay-per-request vs provisioned for DynamoDB) — cost optimization is a frequent topic in cloud interviews.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between SQS Standard and SQS FIFO?', back: 'SQS Standard offers at-least-once delivery with best-effort ordering and nearly unlimited throughput. SQS FIFO guarantees exactly-once processing and strict first-in-first-out ordering, but is limited to 300 messages/second (3,000 with batching). Use FIFO when message order and deduplication matter.' },
        { front: 'What are the S3 storage classes and when would you use each?', back: 'Standard (frequent access), Intelligent-Tiering (auto-optimizes between frequent/infrequent), Standard-IA (infrequent but immediate access), One Zone-IA (same but single AZ), Glacier Instant Retrieval (archive, milliseconds), Glacier Flexible (minutes-hours), and Deep Archive (12-48 hours). Use lifecycle policies to auto-transition.' },
        { front: 'What is the difference between Security Groups and NACLs?', back: 'Security Groups are stateful (return traffic auto-allowed), operate at the instance level, and only have ALLOW rules. NACLs (Network Access Control Lists) are stateless (must define both inbound and outbound rules), operate at the subnet level, and support both ALLOW and DENY rules. Security Groups are evaluated before NACLs.' },
        { front: 'What is the difference between ECS, EKS, and Fargate?', back: 'ECS is AWS-native container orchestration. EKS is managed Kubernetes (portable across clouds). Fargate is a serverless compute engine that works with both ECS and EKS — it removes the need to provision or manage EC2 instances for containers. Choose ECS for simplicity, EKS for K8s ecosystem, Fargate to go serverless.' },
        { front: 'How does an Auto Scaling Group (ASG) work?', back: 'An ASG automatically adjusts the number of EC2 instances based on scaling policies. It uses a launch template to define instance configuration. Scaling can be target-tracking (maintain a metric like CPU at 50%), step-based (scale by N when metric crosses threshold), or scheduled (time-based). ASG also replaces unhealthy instances automatically.' },
        { front: 'What is AWS IAM and what are its core components?', back: 'IAM (Identity and Access Management) controls who (authentication) can do what (authorization) on AWS resources. Core components: Users (people/apps), Groups (collections of users), Roles (assumed by services/users temporarily), and Policies (JSON documents defining permissions with Effect, Action, and Resource).' },
        { front: 'What is a Blue-Green deployment strategy?', back: 'Blue-Green maintains two identical production environments. "Blue" runs the current version; "Green" runs the new version. After testing Green, traffic is switched from Blue to Green via the load balancer or Route 53 DNS. If issues arise, you instantly roll back by switching traffic back to Blue. Zero-downtime deployment.' },
        { front: 'What is CloudFormation and how does it differ from CDK?', back: 'CloudFormation is AWS Infrastructure as Code using declarative YAML/JSON templates. CDK (Cloud Development Kit) lets you define infrastructure using imperative programming languages (Java, TypeScript, Python) that synthesize into CloudFormation templates. CDK offers higher abstraction, type safety, and code reuse through constructs.' }
      ],
      quiz: [
        {
          question: 'Which AWS service provides a fully managed, serverless NoSQL database with single-digit millisecond latency?',
          options: ['Amazon RDS', 'Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon Redshift'],
          correct: 1,
          explanation: 'DynamoDB is a fully managed, serverless NoSQL key-value and document database designed for single-digit millisecond performance at any scale. RDS is for relational databases (SQL). ElastiCache is for in-memory caching (Redis/Memcached). Redshift is a data warehouse for analytics.',
          difficulty: 'easy'
        },
        {
          question: 'In a VPC, what is the purpose of a NAT Gateway?',
          options: ['To allow inbound internet traffic to reach private subnets', 'To allow instances in private subnets to access the internet for outbound traffic without being directly reachable from the internet', 'To route traffic between two VPCs in different regions', 'To provide DNS resolution for instances within the VPC'],
          correct: 1,
          explanation: 'A NAT Gateway enables instances in private subnets to initiate outbound connections to the internet (e.g., for software updates) while preventing inbound connections from the internet. An Internet Gateway handles public subnet internet access. VPC Peering connects VPCs. Route 53 provides DNS.',
          difficulty: 'easy'
        },
        {
          question: 'Which deployment strategy routes a small percentage of production traffic to the new version before gradually increasing it?',
          options: ['Blue-Green Deployment', 'Rolling Deployment', 'Canary Deployment', 'Recreate Deployment'],
          correct: 2,
          explanation: 'Canary deployment sends a small percentage (e.g., 5%) of traffic to the new version, monitors for errors, and gradually shifts more traffic if healthy. Blue-Green switches all traffic at once between two environments. Rolling updates instances in batches. Recreate stops the old version entirely before starting the new one.',
          difficulty: 'medium'
        },
        {
          question: 'What is the key difference between AWS Lambda and AWS Fargate?',
          options: ['Lambda runs containers while Fargate runs functions', 'Lambda is event-driven with short execution limits while Fargate runs long-lived containerized workloads', 'Lambda is only for Python while Fargate supports all languages', 'Lambda requires provisioning servers while Fargate is serverless'],
          correct: 1,
          explanation: 'Lambda is serverless functions triggered by events with a 15-minute execution limit, ideal for short-lived tasks. Fargate is serverless containers for long-running workloads without managing EC2 instances. Both are serverless (no server provisioning). Lambda supports multiple languages. Fargate runs containers, not functions.',
          difficulty: 'medium'
        },
        {
          question: 'An application needs to process messages exactly once and in strict order. Which SQS queue type and configuration should you use?',
          options: ['Standard Queue with visibility timeout set to maximum', 'FIFO Queue with message group ID for ordered processing', 'Standard Queue with dead letter queue enabled', 'FIFO Queue with long polling disabled'],
          correct: 1,
          explanation: 'FIFO (First-In-First-Out) queues guarantee exactly-once processing and strict ordering within a message group ID. Standard queues offer at-least-once delivery with best-effort ordering, making them unsuitable. Visibility timeout and DLQ do not change ordering guarantees. Long polling is about efficient message retrieval, not ordering.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'How would you design a scalable, serverless REST API on AWS?',
          hint: 'Think about API Gateway, Lambda, DynamoDB, and related services.',
          answer: 'I would use Amazon API Gateway as the front door to expose REST endpoints with built-in throttling, authentication (Cognito or Lambda authorizers), and request validation. Each endpoint would be backed by an AWS Lambda function written in Java, handling business logic with a 15-minute execution limit. For data persistence, I would use DynamoDB in on-demand (pay-per-request) mode for automatic scaling. For asynchronous processing (like sending notifications after order creation), Lambda would publish events to SQS or SNS, which would trigger downstream Lambda functions. CloudWatch would handle logging and monitoring with alarms for error rates. The entire infrastructure would be defined using AWS SAM (Serverless Application Model) or CDK for repeatable deployments. This architecture scales automatically from zero to millions of requests with no server management.',
          difficulty: 'medium',
          followUp: 'How would you handle cold starts in Lambda functions, especially with Java runtime?'
        },
        {
          question: 'When would you choose DynamoDB over RDS, and vice versa?',
          hint: 'Consider data model, access patterns, scaling, and consistency requirements.',
          answer: 'I would choose DynamoDB for applications with known access patterns, high throughput requirements, and flexible schema needs — such as user sessions, shopping carts, gaming leaderboards, or IoT data. DynamoDB excels at key-value lookups and scales horizontally with no practical limit. I would choose RDS when the application requires complex queries with JOINs, ACID transactions across multiple tables, or has a highly relational data model — such as financial systems, inventory management, or traditional CRUD applications. Key tradeoffs: DynamoDB has single-digit millisecond latency but requires careful partition key design; RDS supports SQL and complex queries but has vertical scaling limits. For caching frequently accessed data from either, I would add ElastiCache (Redis) as a read-through or write-behind cache layer.',
          difficulty: 'medium',
          followUp: 'How would you handle the need for complex queries in a DynamoDB-based application?'
        },
        {
          question: 'Explain how you would set up a VPC architecture for a multi-tier web application.',
          hint: 'Think about public/private subnets, security layers, and high availability.',
          answer: 'I would create a VPC spanning at least two Availability Zones for high availability. The architecture would have three tiers of subnets: public subnets hosting an Application Load Balancer (ALB) with an Internet Gateway for external traffic; private subnets for application servers (EC2 or ECS/Fargate) that receive traffic only from the ALB; and isolated private subnets for databases (RDS Multi-AZ) with no internet access. A NAT Gateway in the public subnet would allow private instances to make outbound calls (for updates/API calls) without being directly accessible. Security groups would enforce least-privilege access: ALB accepts only ports 80/443, app servers accept traffic only from the ALB security group, and database accepts connections only from the app server security group. NACLs would provide an additional subnet-level defense layer. All resources would be monitored via CloudWatch, and VPC Flow Logs would capture network traffic for security auditing.',
          difficulty: 'hard',
          followUp: 'How would you handle cross-region disaster recovery for this architecture?'
        },
        {
          question: 'What are IAM roles and how do they differ from IAM users? When would you use each?',
          hint: 'Think about temporary credentials, EC2 instance roles, and the principle of least privilege.',
          answer: 'IAM Users are permanent identities with long-term credentials (access keys or passwords) intended for individual people or applications that need persistent access. IAM Roles are identities with temporary security credentials that can be assumed by AWS services, applications, or users. The key difference is that roles use temporary credentials from AWS STS (Security Token Service) that automatically expire, making them more secure. I would use IAM Users for individual developers needing console or CLI access, and IAM Roles for everything else: EC2 instances accessing S3 or DynamoDB (instance profiles), Lambda functions accessing other AWS services, cross-account access, and federated users from external identity providers. The principle of least privilege applies to both — policies should grant only the minimum permissions required. In practice, I minimize IAM Users and maximize the use of Roles to reduce the risk of credential exposure.',
          difficulty: 'easy',
          followUp: 'How would you implement cross-account access using IAM roles?'
        }
      ]
    },
    {
      id: 'ai-knowledge',
      name: 'AI & ML Basics',
      icon: '🤖',
      notes: {
        title: 'AI & ML Basics',
        points: [
          '<strong>ML Types:</strong> <strong>Supervised</strong>: learns from labeled data (classification, regression). <strong>Unsupervised</strong>: finds patterns in unlabeled data (clustering, dimensionality reduction). <strong>Reinforcement</strong>: learns through rewards and penalties by interacting with an environment.',
          '<strong>Common Algorithms:</strong> Linear/Logistic Regression, Decision Trees, Random Forest, SVM, k-Nearest Neighbors, k-Means Clustering, Naive Bayes. Choose based on data type, size, interpretability needs, and whether the problem is classification or regression.',
          '<strong>Neural Networks & Deep Learning:</strong> Neural networks consist of input, hidden, and output layers with weighted connections. Deep learning uses many hidden layers. CNNs excel at image data; RNNs/LSTMs handle sequential data; Transformers (attention mechanism) power modern NLP.',
          '<strong>NLP & Large Language Models:</strong> NLP enables machines to understand human language. LLMs (GPT, Gemini, LLaMA) are transformer-based models trained on massive text corpora. They use tokenization, embeddings, and self-attention to generate contextually relevant text.',
          '<strong>Prompt Engineering:</strong> The art of crafting effective prompts for LLMs. Techniques include zero-shot, few-shot (providing examples), chain-of-thought (step-by-step reasoning), system prompts for role-setting, and temperature control for creativity vs determinism.',
          '<strong>AI in Java:</strong> <code>Spring AI</code> provides a Spring-friendly abstraction for AI model integration with support for multiple providers (OpenAI, Google, Ollama). <code>LangChain4j</code> offers a Java port of LangChain with chains, agents, memory, and tool integration.',
          '<strong>RAG & Vector Databases:</strong> Retrieval-Augmented Generation (RAG) enhances LLM responses by retrieving relevant context from a knowledge base before generation. Vector databases (Pinecone, Weaviate, pgvector) store embeddings for semantic similarity search using cosine similarity or dot product.',
          '<strong>AI Ethics & Responsible AI:</strong> Key concerns include bias in training data, hallucination (generating plausible but incorrect information), privacy (data used in training), transparency/explainability, and the environmental cost of training large models. Always validate AI outputs in critical applications.'
        ],
        codeExamples: [
          {
            title: 'Spring AI - Chat with OpenAI',
            code: '@RestController\n@RequestMapping("/api/ai")\npublic class AiController {\n\n    private final ChatClient chatClient;\n\n    public AiController(ChatClient.Builder builder) {\n        this.chatClient = builder\n            .defaultSystem("You are a helpful Java expert.")\n            .build();\n    }\n\n    @GetMapping("/chat")\n    public String chat(\n            @RequestParam String question) {\n        return chatClient.prompt()\n            .user(question)\n            .call()\n            .content();\n    }\n\n    @GetMapping("/structured")\n    public CodeReview reviewCode(\n            @RequestParam String code) {\n        return chatClient.prompt()\n            .user("Review this Java code: " + code)\n            .call()\n            .entity(CodeReview.class);\n    }\n}',
            language: 'java'
          },
          {
            title: 'RAG Implementation with Spring AI',
            code: '@Service\npublic class RagService {\n\n    private final ChatClient chatClient;\n    private final VectorStore vectorStore;\n\n    public RagService(ChatClient.Builder builder,\n                      VectorStore vectorStore) {\n        this.chatClient = builder.build();\n        this.vectorStore = vectorStore;\n    }\n\n    public String askWithContext(String question) {\n        // 1. Retrieve relevant documents\n        List<Document> relevantDocs = vectorStore\n            .similaritySearch(\n                SearchRequest.query(question)\n                    .withTopK(5)\n                    .withSimilarityThreshold(0.7));\n\n        // 2. Build context from retrieved documents\n        String context = relevantDocs.stream()\n            .map(Document::getContent)\n            .collect(Collectors.joining("\\n\\n"));\n\n        // 3. Augment prompt with context\n        String augmentedPrompt = String.format(\n            "Answer based on this context:\\n%s\\n\\n"\n            + "Question: %s", context, question);\n\n        // 4. Generate response\n        return chatClient.prompt()\n            .user(augmentedPrompt)\n            .call()\n            .content();\n    }\n\n    public void ingestDocuments(List<Document> documents) {\n        vectorStore.add(documents);\n    }\n}',
            language: 'java'
          },
          {
            title: 'LangChain4j - AI Agent with Tools',
            code: 'public class LangChain4jDemo {\n\n    // Define a tool the AI agent can use\n    static class InventoryTool {\n        @Tool("Check product inventory by product ID")\n        public String checkInventory(\n                @P("The product ID") String productId) {\n            // Simulate inventory lookup\n            Map<String, Integer> stock = Map.of(\n                "PROD-001", 42, "PROD-002", 0);\n            int qty = stock.getOrDefault(productId, -1);\n            return qty >= 0\n                ? "Product " + productId + " has "\n                  + qty + " units in stock"\n                : "Product not found";\n        }\n    }\n\n    public static void main(String[] args) {\n        ChatLanguageModel model = OpenAiChatModel.builder()\n            .apiKey(System.getenv("OPENAI_API_KEY"))\n            .modelName("gpt-4o")\n            .build();\n\n        Assistant assistant = AiServices.builder(Assistant.class)\n            .chatLanguageModel(model)\n            .tools(new InventoryTool())\n            .chatMemory(MessageWindowChatMemory\n                .withMaxMessages(20))\n            .build();\n\n        String response = assistant.chat(\n            "Do we have PROD-001 in stock?");\n        System.out.println(response);\n    }\n\n    interface Assistant {\n        String chat(String message);\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'You do not need to be an ML expert for a Java interview, but you should understand the fundamentals (supervised vs unsupervised, what embeddings are, how RAG works) and how to integrate AI into Java applications using Spring AI or LangChain4j.',
          'Focus on practical integration skills — demonstrate you can build an AI-powered feature using Spring AI, call external LLM APIs, implement RAG for domain-specific knowledge, and handle prompt engineering effectively.',
          'Be honest about AI limitations — mention hallucinations, the importance of validating AI outputs, data privacy concerns with sending data to external APIs, and how you would mitigate these risks in a production system.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between supervised and unsupervised learning?', back: 'Supervised learning uses labeled data (input-output pairs) to learn a mapping function — used for classification and regression. Unsupervised learning finds hidden patterns in unlabeled data — used for clustering (k-Means), dimensionality reduction (PCA), and anomaly detection. Semi-supervised combines both approaches.' },
        { front: 'What is Retrieval-Augmented Generation (RAG)?', back: 'RAG enhances LLM responses by first retrieving relevant documents from a knowledge base (using vector similarity search) and then including them as context in the prompt. This grounds the LLM\'s response in factual, domain-specific data, reducing hallucinations and keeping information up-to-date without retraining.' },
        { front: 'What is a vector database and why is it important for AI?', back: 'A vector database stores data as high-dimensional numerical vectors (embeddings) and supports efficient similarity search using algorithms like cosine similarity, dot product, or Euclidean distance. They are essential for RAG, recommendation systems, and semantic search. Examples: Pinecone, Weaviate, Milvus, pgvector (PostgreSQL extension).' },
        { front: 'What is prompt engineering and what are common techniques?', back: 'Prompt engineering is the practice of designing effective inputs to get desired outputs from LLMs. Techniques include: zero-shot (direct question), few-shot (providing examples), chain-of-thought (step-by-step reasoning), system prompts (setting role/persona), and ReAct (reasoning + acting with tools). Temperature controls randomness (0 = deterministic, 1 = creative).' },
        { front: 'What is Spring AI and how does it simplify AI integration in Java?', back: 'Spring AI is a Spring framework module that provides a portable abstraction over AI model providers (OpenAI, Google Gemini, Ollama, etc.). It offers ChatClient for conversations, structured output parsing to Java objects, vector store integration for RAG, function/tool calling, and automatic prompt template management — all with familiar Spring conventions.' },
        { front: 'What is the Transformer architecture and why is it important?', back: 'The Transformer is a neural network architecture based on the self-attention mechanism, which allows it to process all tokens in parallel and capture long-range dependencies. It replaced RNNs/LSTMs as the foundation for NLP. GPT (decoder-only), BERT (encoder-only), and T5 (encoder-decoder) are all Transformer variants that power modern LLMs.' },
        { front: 'What are AI hallucinations and how can you mitigate them?', back: 'Hallucinations occur when an LLM generates plausible-sounding but factually incorrect information. Mitigation strategies: use RAG to ground responses in real data, lower temperature for more deterministic output, implement fact-checking pipelines, add human-in-the-loop review for critical applications, use system prompts instructing the model to say "I don\'t know" when uncertain.' },
        { front: 'What is the difference between LangChain4j and Spring AI?', back: 'Both integrate LLMs into Java applications. Spring AI follows Spring conventions with auto-configuration, dependency injection, and Spring Boot starters — ideal for Spring-based projects. LangChain4j is a standalone library inspired by Python\'s LangChain, offering chains, agents, memory, RAG, and tool-use patterns. LangChain4j has more advanced agent capabilities; Spring AI has better Spring ecosystem integration.' }
      ],
      quiz: [
        {
          question: 'Which type of machine learning uses labeled training data to learn a mapping from inputs to outputs?',
          options: ['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Transfer Learning'],
          correct: 1,
          explanation: 'Supervised learning uses labeled data (input-output pairs) to learn a function that maps inputs to correct outputs, used for classification and regression. Unsupervised uses unlabeled data. Reinforcement learns through rewards. Transfer learning reuses a pre-trained model on a new task.',
          difficulty: 'easy'
        },
        {
          question: 'What is the primary purpose of Retrieval-Augmented Generation (RAG)?',
          options: ['To train LLMs faster on smaller datasets', 'To reduce the number of parameters in a neural network', 'To ground LLM responses in relevant external knowledge, reducing hallucinations', 'To convert text into vector embeddings'],
          correct: 2,
          explanation: 'RAG retrieves relevant documents from a knowledge base and includes them as context in the LLM prompt, grounding responses in factual data and reducing hallucinations. It does not train the model, reduce parameters, or create embeddings (though it uses embeddings for retrieval).',
          difficulty: 'easy'
        },
        {
          question: 'In Spring AI, which component is used to store and retrieve document embeddings for semantic similarity search?',
          options: ['ChatClient', 'PromptTemplate', 'VectorStore', 'OutputParser'],
          correct: 2,
          explanation: 'VectorStore is the Spring AI abstraction for storing document embeddings and performing similarity search (e.g., backed by Pinecone, pgvector, or Chroma). ChatClient handles conversation with the LLM. PromptTemplate constructs prompts. OutputParser converts LLM output to structured Java objects.',
          difficulty: 'medium'
        },
        {
          question: 'Which prompt engineering technique provides the LLM with example input-output pairs to guide its response format?',
          options: ['Zero-shot prompting', 'Few-shot prompting', 'Chain-of-thought prompting', 'System prompt engineering'],
          correct: 1,
          explanation: 'Few-shot prompting provides several example input-output pairs in the prompt so the LLM learns the expected format and behavior. Zero-shot gives no examples. Chain-of-thought asks for step-by-step reasoning. System prompts set the role or persona of the AI assistant.',
          difficulty: 'medium'
        },
        {
          question: 'A Java developer wants to build an AI agent that can call external Java methods (tools) based on natural language instructions. Which approach best supports this?',
          options: ['Using Spring AI ChatClient with simple prompt calls', 'Using LangChain4j\'s @Tool annotation with AiServices to define callable methods', 'Calling the OpenAI REST API directly with HttpClient', 'Using JDBC to store prompts in a database'],
          correct: 1,
          explanation: 'LangChain4j\'s @Tool annotation allows developers to define Java methods that an AI agent can discover and invoke based on their descriptions. AiServices wires these tools to the LLM for function calling. Simple ChatClient calls don\'t support tool use. Direct REST API calls require manual function-calling protocol implementation. JDBC is unrelated to AI agent capabilities.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'How would you integrate an LLM into a Spring Boot application to provide AI-powered features?',
          hint: 'Think about Spring AI, ChatClient, structured outputs, and error handling.',
          answer: 'I would use Spring AI with the appropriate starter dependency (e.g., spring-ai-openai-spring-boot-starter) which auto-configures the connection to the AI provider. I would inject a ChatClient.Builder and configure it with a system prompt that defines the AI\'s role and constraints. For simple Q&A features, I would use the ChatClient\'s prompt().user(question).call().content() pattern. For structured responses (e.g., extracting data into Java objects), I would use .entity(MyClass.class) for automatic JSON parsing. I would implement proper error handling for API failures, rate limits, and timeouts. For production, I would add caching of common responses with Spring Cache, implement rate limiting on the API endpoint, and configure fallback behavior when the AI service is unavailable.',
          difficulty: 'medium',
          followUp: 'How would you handle sensitive data that should not be sent to an external LLM API?'
        },
        {
          question: 'Explain what RAG is and how you would implement it for a company\'s internal knowledge base.',
          hint: 'Think about document ingestion, embeddings, vector storage, and retrieval.',
          answer: 'RAG (Retrieval-Augmented Generation) combines information retrieval with LLM generation to provide accurate, context-grounded answers. Implementation involves four stages: First, document ingestion — I would parse internal documents (PDFs, wikis, Confluence pages) into text chunks using Spring AI\'s document readers and text splitters. Second, embedding generation — each chunk is converted into a vector embedding using an embedding model (e.g., OpenAI\'s text-embedding-ada-002). Third, vector storage — embeddings are stored in a vector database like pgvector (PostgreSQL extension) or Pinecone via Spring AI\'s VectorStore abstraction. Fourth, retrieval and generation — when a user asks a question, the system converts the query to an embedding, performs similarity search to find the top-K relevant chunks, includes them as context in the LLM prompt, and generates a grounded response. This approach keeps answers accurate and up-to-date without retraining the model.',
          difficulty: 'hard',
          followUp: 'How would you evaluate the quality of your RAG system\'s responses?'
        },
        {
          question: 'What are the main types of machine learning, and when would you use each?',
          hint: 'Think about supervised, unsupervised, and reinforcement learning with practical examples.',
          answer: 'There are three main types. Supervised learning uses labeled data to learn input-output mappings — I would use it for classification tasks like spam detection or sentiment analysis, and regression tasks like price prediction. The key requirement is having historical labeled data. Unsupervised learning finds hidden patterns in unlabeled data — I would use it for customer segmentation (k-Means clustering), anomaly detection in logs or transactions, and dimensionality reduction for data visualization. No labels are needed but results require domain expertise to interpret. Reinforcement learning trains an agent to make decisions by maximizing rewards through trial and error — used in robotics, game playing, and recommendation systems. For most enterprise Java applications, supervised learning (for prediction) and integrating pre-trained LLMs (for NLP tasks) are the most relevant applications.',
          difficulty: 'easy',
          followUp: 'Can you give an example of how you might use supervised learning in a Java backend application?'
        },
        {
          question: 'What are AI hallucinations and how would you handle them in a production system?',
          hint: 'Think about RAG, validation, guardrails, and human oversight.',
          answer: 'AI hallucinations occur when an LLM generates text that is plausible-sounding but factually incorrect, made up, or inconsistent. This happens because LLMs are statistical models predicting the next likely token, not retrieving verified facts. In a production system, I would implement multiple safeguards: use RAG to ground responses in verified company data rather than relying solely on the model\'s training knowledge; lower the temperature parameter (closer to 0) for more deterministic, factual responses; implement output validation by cross-referencing AI responses against known data sources; add guardrails through system prompts instructing the model to say "I don\'t know" rather than guessing; set up human-in-the-loop review for high-stakes decisions (financial, medical, legal); and maintain logging and monitoring to track response quality metrics over time. For critical applications, I would never let AI make autonomous decisions without validation.',
          difficulty: 'medium',
          followUp: 'How would you measure and track the hallucination rate of your AI system over time?'
        }
      ]
    }
  ]
});
