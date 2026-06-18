// Interview Quest - Best Practices Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'best-practices',
  name: 'Best Practices',
  icon: '✨',
  color: '#10B981',
  topics: [
    {
      id: 'clean-code',
      name: 'Clean Code',
      icon: '🧹',
      notes: {
        title: 'Clean Code',
        points: [
          '<strong>Meaningful Names:</strong> Use intention-revealing names. Variable names like <code>elapsedTimeInDays</code> are far better than <code>d</code>. Class names should be nouns, method names should be verbs.',
          '<strong>Small Functions with Single Responsibility:</strong> Functions should do one thing, do it well, and do it only. Aim for 20 lines or fewer. Extract helper methods aggressively to improve readability.',
          '<strong>DRY (Don\'t Repeat Yourself):</strong> Every piece of knowledge must have a single, unambiguous, authoritative representation. Duplicated logic should be extracted into reusable methods or utility classes.',
          '<strong>KISS (Keep It Simple, Stupid):</strong> Prefer the simplest solution that works. Avoid premature optimization and over-engineering. Complex code is harder to maintain and more prone to bugs.',
          '<strong>YAGNI (You Aren\'t Gonna Need It):</strong> Don\'t implement functionality until it is actually needed. Speculative features add complexity without immediate value and often go unused.',
          '<strong>Guard Clauses and Early Returns:</strong> Handle edge cases and invalid inputs at the top of a method. This reduces nesting, improves readability, and makes the happy path clearer.',
          '<strong>Avoid Magic Numbers and Strings:</strong> Replace literal values with named constants. <code>static final int MAX_RETRIES = 3;</code> is self-documenting compared to a raw <code>3</code> scattered throughout the code.',
          '<strong>Code Smells and Refactoring:</strong> Watch for long methods, large classes, feature envy, data clumps, and primitive obsession. Apply refactoring techniques like Extract Method, Rename Variable, and Replace Conditional with Polymorphism.'
        ],
        codeExamples: [
          {
            title: 'Guard Clauses and Early Returns',
            code: '// Bad: deeply nested\npublic double calculateDiscount(Order order) {\n    double discount = 0;\n    if (order != null) {\n        if (order.getCustomer() != null) {\n            if (order.getCustomer().isPremium()) {\n                discount = order.getTotal() * 0.2;\n            } else {\n                discount = order.getTotal() * 0.1;\n            }\n        }\n    }\n    return discount;\n}\n\n// Good: guard clauses with early returns\npublic double calculateDiscount(Order order) {\n    if (order == null || order.getCustomer() == null) {\n        return 0;\n    }\n    if (order.getCustomer().isPremium()) {\n        return order.getTotal() * PREMIUM_DISCOUNT_RATE;\n    }\n    return order.getTotal() * STANDARD_DISCOUNT_RATE;\n}',
            language: 'java'
          },
          {
            title: 'Extract Method and Meaningful Names',
            code: '// Bad: long method with unclear intent\npublic void process(List<Employee> emps) {\n    for (Employee e : emps) {\n        if (e.getAge() > 65 && e.getYears() > 25) {\n            double b = e.getSalary() * e.getYears() * 0.02;\n            System.out.println(e.getName() + \": \" + b);\n        }\n    }\n}\n\n// Good: extracted methods with clear names\npublic void processRetirementBenefits(List<Employee> employees) {\n    employees.stream()\n        .filter(this::isEligibleForRetirement)\n        .forEach(this::printRetirementBenefit);\n}\n\nprivate boolean isEligibleForRetirement(Employee employee) {\n    return employee.getAge() > RETIREMENT_AGE\n        && employee.getYearsOfService() > MIN_SERVICE_YEARS;\n}\n\nprivate void printRetirementBenefit(Employee employee) {\n    double benefit = calculateBenefit(employee);\n    System.out.println(employee.getName() + \": \" + benefit);\n}\n\nprivate double calculateBenefit(Employee employee) {\n    return employee.getSalary() * employee.getYearsOfService()\n        * BENEFIT_MULTIPLIER;\n}',
            language: 'java'
          },
          {
            title: 'Replacing Magic Numbers with Constants',
            code: '// Bad: magic numbers everywhere\npublic String classifyBMI(double bmi) {\n    if (bmi < 18.5) return \"Underweight\";\n    if (bmi < 25.0) return \"Normal\";\n    if (bmi < 30.0) return \"Overweight\";\n    return \"Obese\";\n}\n\n// Good: named constants with clear meaning\nprivate static final double BMI_UNDERWEIGHT_THRESHOLD = 18.5;\nprivate static final double BMI_NORMAL_THRESHOLD = 25.0;\nprivate static final double BMI_OVERWEIGHT_THRESHOLD = 30.0;\n\npublic String classifyBMI(double bmi) {\n    if (bmi < BMI_UNDERWEIGHT_THRESHOLD) return \"Underweight\";\n    if (bmi < BMI_NORMAL_THRESHOLD) return \"Normal\";\n    if (bmi < BMI_OVERWEIGHT_THRESHOLD) return \"Overweight\";\n    return \"Obese\";\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'When discussing clean code, always connect principles to real-world benefits like maintainability, reduced bug count, and team productivity.',
          'Be ready to refactor a given code snippet live — interviewers love seeing you apply Extract Method and Rename Variable on the spot.',
          'Mention Robert C. Martin\'s "Clean Code" book and Martin Fowler\'s "Refactoring" as sources you follow for best practices.'
        ]
      },
      flashcards: [
        { front: 'What does the DRY principle stand for and why is it important?', back: 'DRY stands for "Don\'t Repeat Yourself." Every piece of knowledge should have a single, authoritative representation. It reduces bugs because changes only need to be made in one place, and it improves maintainability by eliminating redundant code.' },
        { front: 'What is the difference between KISS and YAGNI?', back: 'KISS (Keep It Simple, Stupid) says prefer the simplest solution that works. YAGNI (You Aren\'t Gonna Need It) says don\'t build features until they are actually needed. KISS is about implementation simplicity; YAGNI is about scope restraint.' },
        { front: 'What is a guard clause and why should you use it?', back: 'A guard clause is an early return at the top of a method that handles edge cases or invalid input. It reduces nesting depth, makes the main logic clearer, and improves readability by eliminating deeply nested if-else chains.' },
        { front: 'Name five common code smells.', back: '1) Long Method — methods doing too much. 2) Large Class — class with too many responsibilities. 3) Feature Envy — method uses another class\'s data excessively. 4) Primitive Obsession — using primitives instead of small objects. 5) Duplicated Code — same logic in multiple places.' },
        { front: 'What makes a good function according to Clean Code principles?', back: 'A good function should: do one thing (Single Responsibility), be small (ideally under 20 lines), have a descriptive verb-phrase name, take few parameters (ideally 0-2), have no side effects, and operate at a single level of abstraction.' },
        { front: 'Why are magic numbers considered a code smell?', back: 'Magic numbers are unexplained literal values in code. They are a code smell because they lack context, make code harder to understand, and are error-prone when the same value appears in multiple places. Replace them with named constants for clarity and maintainability.' },
        { front: 'What is the Extract Method refactoring technique?', back: 'Extract Method takes a code fragment from an existing method and moves it into a new, well-named method. It improves readability by replacing implementation details with a descriptive method name, reduces method length, and enables code reuse.' },
        { front: 'When should you write comments in clean code?', back: 'Comments should explain WHY, not WHAT. Good uses: legal comments, explaining intent or consequences, TODO notes, and Javadoc for public APIs. Bad comments: redundant comments that restate the code, misleading comments, and commented-out code. Prefer self-documenting code with clear names.' }
      ],
      quiz: [
        {
          question: 'Which principle states that you should not implement features until they are actually needed?',
          options: ['DRY', 'YAGNI', 'KISS', 'SRP'],
          correct: 1,
          explanation: 'YAGNI (You Aren\'t Gonna Need It) advises against implementing speculative features. DRY is about avoiding duplication, KISS is about simplicity, and SRP is about single responsibility for classes/methods.',
          difficulty: 'easy'
        },
        {
          question: 'What is the primary benefit of using guard clauses in a method?',
          options: ['Improved runtime performance', 'Reduced nesting and improved readability', 'Better memory management', 'Enforcing type safety'],
          correct: 1,
          explanation: 'Guard clauses handle edge cases with early returns at the top of a method, which reduces nesting depth and makes the main logic path clearer. They don\'t directly affect performance, memory, or type safety.',
          difficulty: 'easy'
        },
        {
          question: 'Which code smell occurs when a method in one class excessively uses data or methods from another class?',
          options: ['Data Clumps', 'Feature Envy', 'Primitive Obsession', 'Shotgun Surgery'],
          correct: 1,
          explanation: 'Feature Envy occurs when a method seems more interested in another class than the one it belongs to. Data Clumps are groups of data that appear together. Primitive Obsession overuses primitives. Shotgun Surgery means one change requires modifications in many classes.',
          difficulty: 'medium'
        },
        {
          question: 'According to Clean Code principles, what is the ideal maximum number of parameters for a function?',
          options: ['0 (niladic)', '2 (dyadic)', '3 (triadic)', '5 (polyadic)'],
          correct: 1,
          explanation: 'Robert C. Martin recommends at most 2 parameters (dyadic). Zero is ideal (niladic), one is good (monadic). Three or more parameters make functions harder to understand and test. Use parameter objects for multiple related values.',
          difficulty: 'medium'
        },
        {
          question: 'Which refactoring technique is most appropriate when you have a long method containing several blocks of code each preceded by a comment explaining what it does?',
          options: ['Inline Method', 'Extract Method', 'Replace Temp with Query', 'Introduce Parameter Object'],
          correct: 1,
          explanation: 'Extract Method replaces each commented block with a well-named method call, making the comments unnecessary. Inline Method does the opposite (removes a method). Replace Temp with Query replaces temporary variables. Introduce Parameter Object groups related parameters.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'What are the key principles of writing clean code, and how do you apply them in your daily work?',
          hint: 'Think about naming, function size, DRY, and readability.',
          answer: 'Clean code follows several key principles. First, I use meaningful and intention-revealing names for variables, methods, and classes — a name like calculateMonthlyRevenue() is far better than calc(). Second, I keep functions small and focused on a single responsibility, typically under 20 lines, extracting helper methods when they grow. Third, I follow DRY by eliminating duplicated logic through shared utility methods or base classes. I also apply KISS by choosing the simplest solution and avoid YAGNI by not building speculative features. In practice, I regularly refactor code during development, use guard clauses to reduce nesting, and replace magic numbers with named constants.',
          difficulty: 'easy',
          followUp: 'Can you walk me through how you would refactor a 100-line method?'
        },
        {
          question: 'What are code smells? Give examples and explain how you would address them.',
          hint: 'Think about patterns that indicate deeper problems in the code.',
          answer: 'Code smells are surface indicators of deeper design problems in the codebase. They are not bugs, but they suggest the code could benefit from refactoring. Common examples include: Long Methods that try to do too much and should be broken down using Extract Method; Large Classes that violate SRP and should be split; Feature Envy where a method uses another class\'s data excessively and should be moved to that class; Primitive Obsession where raw types are used instead of domain objects (e.g., using a String for an email instead of an Email class); and Duplicated Code that should be extracted into shared methods. I address code smells through systematic refactoring, always backed by unit tests to ensure behavior is preserved.',
          difficulty: 'medium',
          followUp: 'How do you balance refactoring with delivering new features under tight deadlines?'
        },
        {
          question: 'Explain the difference between DRY, KISS, and YAGNI. When might these principles conflict?',
          hint: 'Consider scenarios where following one principle strictly might violate another.',
          answer: 'DRY (Don\'t Repeat Yourself) means every piece of knowledge should have a single representation — avoid duplicated logic. KISS (Keep It Simple, Stupid) advocates for the simplest possible solution. YAGNI (You Aren\'t Gonna Need It) says don\'t implement features until they\'re needed. These can conflict: DRY might lead you to create complex abstractions to eliminate duplication, violating KISS. For example, two methods with similar but not identical logic — forcing them into one generic method with flags can be more complex than having slight duplication. YAGNI might conflict with DRY when building a reusable framework \'just in case\' other teams need it. The key is pragmatic balance — I prefer slight duplication over the wrong abstraction, and I wait until I see a pattern three times before abstracting (Rule of Three).',
          difficulty: 'medium',
          followUp: 'What is the Rule of Three, and how does it help decide when to abstract?'
        },
        {
          question: 'How do you approach commenting code? When are comments helpful vs harmful?',
          hint: 'Think about the distinction between explaining "what" vs "why."',
          answer: 'My general philosophy is that code should be self-documenting through clear naming and structure, but comments have their place. Helpful comments include: Javadoc for public APIs that other teams consume, explaining WHY a non-obvious business rule exists (e.g., "// FCC regulation requires 30-day retention"), TODO notes for known technical debt, and legal/copyright headers. Harmful comments include: redundant comments that restate what the code already says (e.g., "// increment counter" above i++), misleading or outdated comments that no longer match the code, and commented-out code that should be deleted since version control preserves history. When I find myself writing a comment to explain WHAT code does, I treat it as a signal to refactor — extract a well-named method instead.',
          difficulty: 'easy',
          followUp: 'Do you use any tools to enforce documentation standards on your team?'
        }
      ]
    },
    {
      id: 'design-principles',
      name: 'Design Principles (SOLID)',
      icon: '📐',
      notes: {
        title: 'Design Principles (SOLID)',
        points: [
          '<strong>Single Responsibility Principle (SRP):</strong> A class should have only one reason to change. Separate concerns so each class handles one aspect — e.g., separate <code>UserValidator</code> from <code>UserRepository</code> from <code>EmailService</code>.',
          '<strong>Open/Closed Principle (OCP):</strong> Software entities should be open for extension but closed for modification. Use abstraction and polymorphism — add new behavior by creating new implementations, not by modifying existing code.',
          '<strong>Liskov Substitution Principle (LSP):</strong> Subtypes must be substitutable for their base types without altering program correctness. A <code>Square</code> extending <code>Rectangle</code> that overrides setWidth/setHeight to keep sides equal violates LSP.',
          '<strong>Interface Segregation Principle (ISP):</strong> Clients should not be forced to depend on interfaces they don\'t use. Prefer many small, specific interfaces (e.g., <code>Readable</code>, <code>Writable</code>) over one large interface (<code>ReadWriteExecute</code>).',
          '<strong>Dependency Inversion Principle (DIP):</strong> High-level modules should not depend on low-level modules; both should depend on abstractions. Inject dependencies via constructors. Spring\'s <code>@Autowired</code> is a practical implementation of DIP.',
          '<strong>Composition Over Inheritance:</strong> Favor composing objects with well-defined interfaces over extending classes. Inheritance creates tight coupling and fragile base class problems. Composition provides flexibility to change behavior at runtime.',
          '<strong>Program to an Interface:</strong> Declare variables and parameters as interface types (<code>List</code> not <code>ArrayList</code>). This decouples code from specific implementations and makes it easier to swap implementations.',
          '<strong>Coupling vs Cohesion:</strong> Aim for <strong>low coupling</strong> (minimal dependencies between classes) and <strong>high cohesion</strong> (related functionality grouped together). High cohesion + low coupling produces maintainable, testable modules.'
        ],
        codeExamples: [
          {
            title: 'Single Responsibility Principle',
            code: '// Bad: One class doing too many things\npublic class UserService {\n    public void saveUser(User user) { /* DB logic */ }\n    public void sendEmail(User user) { /* Email logic */ }\n    public boolean validateUser(User user) { /* Validation */ }\n    public String generateReport(List<User> users) { /* Reporting */ }\n}\n\n// Good: Each class has one responsibility\npublic class UserRepository {\n    public void save(User user) {\n        entityManager.persist(user);\n    }\n}\n\npublic class UserValidator {\n    public boolean isValid(User user) {\n        return user.getName() != null\n            && user.getEmail().contains(\"@\");\n    }\n}\n\npublic class EmailService {\n    public void sendWelcomeEmail(User user) {\n        mailSender.send(buildWelcomeMessage(user));\n    }\n}',
            language: 'java'
          },
          {
            title: 'Open/Closed Principle with Strategy Pattern',
            code: '// Define abstraction\npublic interface DiscountStrategy {\n    double applyDiscount(double price);\n}\n\n// Extend via new implementations (open for extension)\npublic class SeasonalDiscount implements DiscountStrategy {\n    @Override\n    public double applyDiscount(double price) {\n        return price * 0.8; // 20% off\n    }\n}\n\npublic class LoyaltyDiscount implements DiscountStrategy {\n    @Override\n    public double applyDiscount(double price) {\n        return price * 0.85; // 15% off\n    }\n}\n\n// Closed for modification — no need to change this class\npublic class PriceCalculator {\n    private final DiscountStrategy discountStrategy;\n\n    public PriceCalculator(DiscountStrategy discountStrategy) {\n        this.discountStrategy = discountStrategy;\n    }\n\n    public double calculateFinalPrice(double originalPrice) {\n        return discountStrategy.applyDiscount(originalPrice);\n    }\n}',
            language: 'java'
          },
          {
            title: 'Dependency Inversion Principle',
            code: '// Bad: High-level depends on low-level directly\npublic class OrderService {\n    private MySQLOrderRepository repo = new MySQLOrderRepository();\n\n    public void placeOrder(Order order) {\n        repo.save(order);\n    }\n}\n\n// Good: Both depend on abstraction\npublic interface OrderRepository {\n    void save(Order order);\n    Optional<Order> findById(Long id);\n}\n\n@Repository\npublic class MySQLOrderRepository implements OrderRepository {\n    @Override\n    public void save(Order order) { /* MySQL logic */ }\n\n    @Override\n    public Optional<Order> findById(Long id) { /* MySQL logic */ }\n}\n\n@Service\npublic class OrderService {\n    private final OrderRepository orderRepository;\n\n    @Autowired\n    public OrderService(OrderRepository orderRepository) {\n        this.orderRepository = orderRepository;\n    }\n\n    public void placeOrder(Order order) {\n        orderRepository.save(order);\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'When explaining SOLID, always give concrete Java examples from real projects — interviewers want to see practical application, not textbook definitions.',
          'Be ready to identify SOLID violations in a code sample and explain step-by-step how you would refactor it.',
          'Connect SOLID principles to testability — SRP and DIP in particular make unit testing much easier because you can isolate and mock dependencies.'
        ]
      },
      flashcards: [
        { front: 'What does the Single Responsibility Principle (SRP) state?', back: 'A class should have only one reason to change, meaning it should have only one job or responsibility. For example, a UserService should not handle emailing, validation, and persistence — each should be a separate class.' },
        { front: 'Explain the Open/Closed Principle (OCP) with an example.', back: 'Software entities should be open for extension but closed for modification. Instead of adding if-else branches for new behavior, define an interface (e.g., DiscountStrategy) and add new implementations. The core class (PriceCalculator) never changes.' },
        { front: 'What is the Liskov Substitution Principle (LSP) and give a classic violation?', back: 'Subtypes must be substitutable for their base types. Classic violation: Square extends Rectangle but overrides setWidth() to also set height. Code expecting a Rectangle (where width and height are independent) breaks with a Square.' },
        { front: 'What is the Interface Segregation Principle (ISP)?', back: 'Clients should not be forced to depend on interfaces they don\'t use. Instead of one large interface with many methods, create several small, focused interfaces. For example, split Worker into Workable and Feedable so robots don\'t need to implement eat().' },
        { front: 'Explain the Dependency Inversion Principle (DIP).', back: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Instead of OrderService creating new MySQLRepository(), it should accept an OrderRepository interface via constructor injection, allowing any implementation.' },
        { front: 'Why is composition preferred over inheritance?', back: 'Composition provides greater flexibility and avoids the fragile base class problem. With inheritance, changes to the parent class can break all subclasses. Composition lets you swap behaviors at runtime by combining objects with different interfaces, achieving code reuse without tight coupling.' },
        { front: 'What is the difference between coupling and cohesion?', back: 'Coupling is the degree of interdependence between modules — low coupling is desired. Cohesion is how closely related the responsibilities within a module are — high cohesion is desired. Good design has low coupling and high cohesion.' },
        { front: 'What does "Program to an Interface" mean?', back: 'Declare variables, parameters, and return types as interface types rather than concrete implementations. For example, use List<String> instead of ArrayList<String>. This decouples your code from specific implementations and makes it easier to swap them.' }
      ],
      quiz: [
        {
          question: 'Which SOLID principle is violated when a class handles database access, email sending, and PDF generation?',
          options: ['Open/Closed Principle', 'Single Responsibility Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle'],
          correct: 1,
          explanation: 'This violates SRP because the class has multiple reasons to change (database schema changes, email format changes, PDF layout changes). OCP is about extension without modification. LSP is about subtype substitutability. ISP is about interface design.',
          difficulty: 'easy'
        },
        {
          question: 'Which principle is best demonstrated by using constructor injection with an interface type instead of instantiating a concrete class?',
          options: ['Single Responsibility Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle', 'Open/Closed Principle'],
          correct: 2,
          explanation: 'DIP states both high-level and low-level modules should depend on abstractions. Constructor injection with an interface is a direct implementation of DIP. SRP is about single responsibility. LSP is about subtype behavior. OCP is about extension.',
          difficulty: 'easy'
        },
        {
          question: 'A Robot class implements a Worker interface that has methods work(), eat(), and sleep(). Which principle is violated?',
          options: ['Single Responsibility Principle', 'Open/Closed Principle', 'Interface Segregation Principle', 'Dependency Inversion Principle'],
          correct: 2,
          explanation: 'ISP is violated because Robot is forced to implement eat() and sleep() methods it doesn\'t need. The Worker interface should be split into smaller interfaces like Workable, Feedable, and Sleepable. SRP applies to classes, not interfaces. OCP is about extension. DIP is about abstractions.',
          difficulty: 'medium'
        },
        {
          question: 'What problem does the "Fragile Base Class" anti-pattern describe?',
          options: ['An interface with too many methods', 'Changes to a parent class unexpectedly break subclasses', 'A class with too many responsibilities', 'Circular dependencies between modules'],
          correct: 1,
          explanation: 'The Fragile Base Class problem occurs when modifications to a base class cause unexpected failures in derived classes. This is a key argument for composition over inheritance. Too many interface methods relates to ISP, too many responsibilities to SRP, and circular dependencies to coupling.',
          difficulty: 'medium'
        },
        {
          question: 'In GRASP, which pattern suggests that a class that has the most information to fulfill a responsibility should be the one to do it?',
          options: ['Creator', 'Information Expert', 'Controller', 'Pure Fabrication'],
          correct: 1,
          explanation: 'Information Expert assigns responsibility to the class with the most data needed to fulfill it. Creator determines which class should create instances. Controller handles system events. Pure Fabrication is an artificial class created to achieve low coupling and high cohesion.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain the SOLID principles and give a real-world example of each.',
          hint: 'Walk through each letter with a concrete Java example from a project scenario.',
          answer: 'SOLID is five design principles for maintainable OOP code. SRP: A UserService handles only user business logic, not email sending — that belongs in an EmailService. OCP: A PriceCalculator uses a DiscountStrategy interface, so adding a new BulkDiscount doesn\'t require modifying the calculator. LSP: All PaymentProcessor implementations (CreditCard, PayPal, BankTransfer) must honor the same contract — process() should always either succeed or throw PaymentException. ISP: Instead of one large DataAccess interface, we split into Readable, Writable, and Deletable so read-only services don\'t implement write methods. DIP: Our OrderService depends on an OrderRepository interface, not MySQLOrderRepository directly, so we can swap to PostgreSQL without changing business logic.',
          difficulty: 'medium',
          followUp: 'Which SOLID principle do you find most frequently violated in production code?'
        },
        {
          question: 'When would you choose composition over inheritance? Give an example.',
          hint: 'Think about flexibility, the diamond problem, and runtime behavior changes.',
          answer: 'I choose composition over inheritance in most cases because it provides greater flexibility and avoids tight coupling. For example, consider a notification system. With inheritance, you might have EmailNotifier, SMSNotifier, and PushNotifier. But what if you need a notifier that sends both email and SMS? Multiple inheritance isn\'t supported in Java, leading to awkward workarounds. With composition, I create a NotificationService that holds a List<NotificationChannel> where each channel (EmailChannel, SMSChannel, PushChannel) implements a common interface. The service iterates and sends through all configured channels. This allows runtime configuration — I can add or remove channels without creating new classes. I use inheritance only for genuine "is-a" relationships with shallow hierarchies, like a clear domain model.',
          difficulty: 'medium',
          followUp: 'Can you explain the diamond problem and how Java handles it with interfaces?'
        },
        {
          question: 'How do SOLID principles improve testability?',
          hint: 'Think about mocking, isolation, and dependency injection.',
          answer: 'SOLID principles dramatically improve testability. SRP ensures each class has a focused set of behaviors to test, keeping test suites small and fast. OCP means new features are added via new classes with their own tests, rather than modifying existing tested code. LSP ensures that tests written for a base type apply to all subtypes, so you can use test suites as conformance checks. ISP means mock objects only need to implement small, focused interfaces rather than large ones with many irrelevant methods. DIP is perhaps the most impactful — by depending on abstractions and injecting dependencies, you can replace real implementations with mocks in unit tests. For example, injecting a PaymentGateway interface lets you use a MockPaymentGateway in tests instead of hitting a real payment provider. Without DIP, classes that directly instantiate dependencies are nearly impossible to unit test in isolation.',
          difficulty: 'hard',
          followUp: 'How does Spring\'s dependency injection framework help with testability?'
        },
        {
          question: 'What is the difference between coupling and cohesion? How do you achieve the right balance?',
          hint: 'Think about module boundaries, interface design, and package structure.',
          answer: 'Coupling measures how much one module depends on another — low coupling means modules can change independently. Cohesion measures how strongly related the responsibilities within a module are — high cohesion means a class does one thing well. The ideal is low coupling with high cohesion. I achieve this by: designing clear module boundaries with well-defined interfaces, applying SRP so each class is cohesive, using DIP so modules communicate through abstractions, grouping related classes into packages by feature (not by layer), and minimizing public APIs. For example, an order module exposes an OrderService interface but keeps OrderRepository, OrderValidator, and OrderMapper package-private. Other modules interact only through OrderService, reducing coupling while the internal classes remain highly cohesive around order processing.',
          difficulty: 'medium',
          followUp: 'How do you organize packages in a large Java project — by layer or by feature?'
        }
      ]
    },
    {
      id: 'design-patterns',
      name: 'Design Patterns',
      icon: '🎨',
      notes: {
        title: 'Design Patterns',
        points: [
          '<strong>Creational — Singleton:</strong> Ensures a class has only one instance. Implementations: eager initialization, lazy with <code>synchronized</code>, double-checked locking, Bill Pugh (inner static class), and enum singleton (recommended by Joshua Bloch as it handles serialization and reflection).',
          '<strong>Creational — Factory & Builder:</strong> Factory Method delegates object creation to subclasses. Abstract Factory creates families of related objects. Builder separates complex object construction from representation — ideal for objects with many optional parameters (e.g., <code>User.builder().name("John").email("j@e.com").build()</code>).',
          '<strong>Structural — Adapter & Decorator:</strong> Adapter converts an incompatible interface to one the client expects (e.g., wrapping a legacy XML service to expose JSON). Decorator adds behavior dynamically without modifying the original class (e.g., <code>BufferedInputStream</code> decorating <code>FileInputStream</code>).',
          '<strong>Structural — Proxy & Facade:</strong> Proxy controls access to an object (e.g., lazy loading, security checks, caching). Facade provides a simplified interface to a complex subsystem — Spring\'s <code>JdbcTemplate</code> is a facade over raw JDBC.',
          '<strong>Behavioral — Observer & Strategy:</strong> Observer defines a one-to-many dependency so when one object changes state, all dependents are notified (e.g., event listeners). Strategy encapsulates interchangeable algorithms behind a common interface (e.g., sorting strategies, payment methods).',
          '<strong>Behavioral — Template Method & Command:</strong> Template Method defines the skeleton of an algorithm in a base class, letting subclasses override specific steps. Command encapsulates a request as an object, enabling undo/redo, queuing, and logging of operations.',
          '<strong>Behavioral — State & Iterator:</strong> State allows an object to change its behavior when its internal state changes (e.g., order states: PENDING → PAID → SHIPPED). Iterator provides sequential access to elements without exposing the underlying collection structure.',
          '<strong>Spring Framework Patterns:</strong> Spring uses Singleton (bean scope), Factory (BeanFactory), Proxy (AOP, @Transactional), Template Method (JdbcTemplate, RestTemplate), Observer (ApplicationEvent), and Front Controller (DispatcherServlet) extensively.'
        ],
        codeExamples: [
          {
            title: 'Singleton Implementations',
            code: '// 1. Enum Singleton (Recommended)\npublic enum DatabaseConnection {\n    INSTANCE;\n\n    private Connection connection;\n\n    DatabaseConnection() {\n        // initialize connection\n    }\n\n    public Connection getConnection() {\n        return connection;\n    }\n}\n\n// 2. Bill Pugh Singleton (Lazy, Thread-safe)\npublic class ConfigManager {\n    private ConfigManager() {}\n\n    private static class Holder {\n        private static final ConfigManager INSTANCE = new ConfigManager();\n    }\n\n    public static ConfigManager getInstance() {\n        return Holder.INSTANCE;\n    }\n}\n\n// 3. Double-Checked Locking\npublic class CacheManager {\n    private static volatile CacheManager instance;\n\n    private CacheManager() {}\n\n    public static CacheManager getInstance() {\n        if (instance == null) {\n            synchronized (CacheManager.class) {\n                if (instance == null) {\n                    instance = new CacheManager();\n                }\n            }\n        }\n        return instance;\n    }\n}',
            language: 'java'
          },
          {
            title: 'Builder Pattern',
            code: 'public class HttpRequest {\n    private final String url;\n    private final String method;\n    private final Map<String, String> headers;\n    private final String body;\n    private final int timeout;\n\n    private HttpRequest(Builder builder) {\n        this.url = builder.url;\n        this.method = builder.method;\n        this.headers = builder.headers;\n        this.body = builder.body;\n        this.timeout = builder.timeout;\n    }\n\n    public static class Builder {\n        private final String url;    // required\n        private String method = \"GET\";\n        private Map<String, String> headers = new HashMap<>();\n        private String body;\n        private int timeout = 30000;\n\n        public Builder(String url) {\n            this.url = url;\n        }\n\n        public Builder method(String method) {\n            this.method = method;\n            return this;\n        }\n\n        public Builder header(String key, String value) {\n            this.headers.put(key, value);\n            return this;\n        }\n\n        public Builder body(String body) {\n            this.body = body;\n            return this;\n        }\n\n        public Builder timeout(int timeout) {\n            this.timeout = timeout;\n            return this;\n        }\n\n        public HttpRequest build() {\n            return new HttpRequest(this);\n        }\n    }\n}\n\n// Usage\nHttpRequest request = new HttpRequest.Builder(\"https://api.example.com\")\n    .method(\"POST\")\n    .header(\"Content-Type\", \"application/json\")\n    .body(\"{\\\"name\\\": \\\"test\\\"}\")\n    .timeout(5000)\n    .build();',
            language: 'java'
          },
          {
            title: 'Strategy Pattern',
            code: '// Strategy interface\npublic interface PaymentStrategy {\n    void pay(double amount);\n    boolean validate();\n}\n\n// Concrete strategies\npublic class CreditCardPayment implements PaymentStrategy {\n    private String cardNumber;\n    private String cvv;\n\n    public CreditCardPayment(String cardNumber, String cvv) {\n        this.cardNumber = cardNumber;\n        this.cvv = cvv;\n    }\n\n    @Override\n    public void pay(double amount) {\n        System.out.println(\"Paid \" + amount + \" via Credit Card\");\n    }\n\n    @Override\n    public boolean validate() {\n        return cardNumber != null && cardNumber.length() == 16;\n    }\n}\n\npublic class PayPalPayment implements PaymentStrategy {\n    private String email;\n\n    public PayPalPayment(String email) {\n        this.email = email;\n    }\n\n    @Override\n    public void pay(double amount) {\n        System.out.println(\"Paid \" + amount + \" via PayPal: \" + email);\n    }\n\n    @Override\n    public boolean validate() {\n        return email != null && email.contains(\"@\");\n    }\n}\n\n// Context\npublic class ShoppingCart {\n    private PaymentStrategy paymentStrategy;\n\n    public void setPaymentStrategy(PaymentStrategy strategy) {\n        this.paymentStrategy = strategy;\n    }\n\n    public void checkout(double total) {\n        if (paymentStrategy.validate()) {\n            paymentStrategy.pay(total);\n        }\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know at least 2-3 patterns from each category (Creational, Structural, Behavioral) deeply. Interviewers often ask you to design a system and expect you to identify applicable patterns.',
          'For Singleton, be prepared to discuss thread safety, serialization, reflection attacks, and why enum singleton is the best approach in Java.',
          'Connect patterns to real frameworks — mention that Spring uses Factory (BeanFactory), Proxy (@Transactional AOP), Template Method (JdbcTemplate), and Observer (ApplicationEvent). This shows practical understanding.'
        ]
      },
      flashcards: [
        { front: 'Why is enum the recommended Singleton implementation in Java?', back: 'Enum singletons are thread-safe by the JVM, prevent reflection attacks (you cannot instantiate an enum via reflection), handle serialization automatically (no readResolve() needed), and are concise. Joshua Bloch recommends this in Effective Java as the best approach.' },
        { front: 'What is the difference between Factory Method and Abstract Factory?', back: 'Factory Method uses a single method (often in a base class) to create one type of object, delegating to subclasses. Abstract Factory provides an interface for creating families of related objects (e.g., UIFactory creating Button, TextField, Checkbox for different OS themes) without specifying concrete classes.' },
        { front: 'When should you use the Builder pattern?', back: 'Use Builder when a class has many constructor parameters (especially optional ones), when you want immutable objects with a readable construction API, or when construction involves multiple steps. It eliminates telescoping constructors and makes the code self-documenting via named methods.' },
        { front: 'What is the difference between Adapter and Decorator patterns?', back: 'Adapter converts an incompatible interface to one the client expects (structural adaptation, no new behavior). Decorator adds new responsibilities to an object dynamically while keeping the same interface. Adapter changes the interface; Decorator enhances the behavior.' },
        { front: 'How does the Proxy pattern differ from Decorator?', back: 'Both wrap an object, but Proxy controls access (lazy loading, security, caching, remote proxy) while Decorator adds behavior. Proxy typically manages the object\'s lifecycle and the client may not know it\'s there. Decorator is explicitly about enhancing functionality.' },
        { front: 'Explain the Observer pattern and a real-world use case.', back: 'Observer defines a one-to-many relationship: when one object (Subject) changes state, all registered observers are notified and updated automatically. Real-world: Spring\'s ApplicationEvent system, UI event listeners, pub/sub messaging, and reactive streams (RxJava, Project Reactor).' },
        { front: 'What is the Template Method pattern?', back: 'Template Method defines the skeleton of an algorithm in a base class method, with some steps deferred to subclasses via abstract methods. Example: Spring\'s JdbcTemplate defines the workflow (get connection, execute, handle results, close) while subclasses provide the specific SQL and result mapping.' },
        { front: 'Name three design patterns used by the Spring Framework.', back: '1) Singleton — default bean scope, one instance per container. 2) Proxy — AOP proxies for @Transactional and @Cacheable. 3) Factory — BeanFactory and ApplicationContext create and manage beans. Also: Template Method (JdbcTemplate), Observer (ApplicationEvent), Front Controller (DispatcherServlet).' }
      ],
      quiz: [
        {
          question: 'Which Singleton implementation is vulnerable to breaking via Java reflection?',
          options: ['Enum Singleton', 'Bill Pugh (static inner class)', 'Double-checked locking', 'Both B and C but not A'],
          correct: 3,
          explanation: 'Both Bill Pugh and double-checked locking use private constructors that can be accessed via reflection to create additional instances. Enum Singleton is immune because the JVM prevents instantiation of enum types through reflection.',
          difficulty: 'medium'
        },
        {
          question: 'Which design pattern would you use to convert a legacy SOAP web service interface to a REST-compatible interface?',
          options: ['Decorator', 'Adapter', 'Proxy', 'Bridge'],
          correct: 1,
          explanation: 'Adapter converts an incompatible interface to one the client expects. Converting SOAP to REST is an interface conversion problem. Decorator adds behavior without changing the interface. Proxy controls access. Bridge separates abstraction from implementation.',
          difficulty: 'easy'
        },
        {
          question: 'In Java I/O, BufferedInputStream wrapping FileInputStream is an example of which pattern?',
          options: ['Proxy', 'Adapter', 'Decorator', 'Facade'],
          correct: 2,
          explanation: 'Decorator adds buffering behavior to FileInputStream while maintaining the same InputStream interface. It\'s not Proxy (no access control), not Adapter (no interface conversion), and not Facade (no simplification of a complex subsystem).',
          difficulty: 'easy'
        },
        {
          question: 'Which pattern encapsulates a request as an object, allowing you to parameterize clients, queue requests, and support undo operations?',
          options: ['Strategy', 'Command', 'Observer', 'State'],
          correct: 1,
          explanation: 'Command encapsulates a request as an object with execute() and undo() methods. Strategy encapsulates interchangeable algorithms. Observer handles event notification. State changes behavior based on internal state. Command uniquely supports undo/redo and request queuing.',
          difficulty: 'medium'
        },
        {
          question: 'You need to process a collection of composite objects where individual items and groups of items should be treated uniformly. Which pattern is most appropriate?',
          options: ['Iterator', 'Composite', 'Visitor', 'Flyweight'],
          correct: 1,
          explanation: 'Composite lets you treat individual objects and compositions of objects uniformly through a common interface. This is ideal for tree structures like file systems or UI components. Iterator provides sequential access. Visitor separates algorithms from object structure. Flyweight shares state to reduce memory.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Compare the different ways to implement Singleton in Java. Which do you recommend and why?',
          hint: 'Discuss thread safety, reflection, serialization, and lazy initialization.',
          answer: 'There are several Singleton implementations in Java. Eager initialization is simple but wastes resources if the instance is never used. Lazy initialization with synchronized is thread-safe but has performance overhead on every access. Double-checked locking uses a volatile variable and synchronizes only during creation, offering good performance. Bill Pugh (static inner class holder) achieves lazy loading and thread safety through the class loading mechanism. However, I recommend enum Singleton, as advocated by Joshua Bloch in Effective Java. Enum singletons are inherently thread-safe, prevent reflection attacks (the JVM prohibits reflective instantiation of enums), handle serialization automatically without needing readResolve(), and are the most concise implementation.',
          difficulty: 'medium',
          followUp: 'How does Spring manage singletons, and how does it differ from the GoF Singleton pattern?'
        },
        {
          question: 'Explain the Strategy pattern and give an example of when you\'ve used it.',
          hint: 'Think about interchangeable algorithms and runtime behavior selection.',
          answer: 'The Strategy pattern defines a family of algorithms, encapsulates each one in its own class, and makes them interchangeable through a common interface. The client selects the strategy at runtime. I used this in a payment processing system where we needed to support credit card, PayPal, bank transfer, and cryptocurrency payments. Instead of a large if-else chain in the checkout service, each payment method implemented a PaymentStrategy interface with validate() and pay() methods. The ShoppingCart accepted a PaymentStrategy and delegated payment processing to it. Adding a new payment method (e.g., Apple Pay) only required creating a new class implementing the interface — no modification to existing code. This also followed OCP and made unit testing easy since each strategy could be tested independently.',
          difficulty: 'easy',
          followUp: 'How does the Strategy pattern relate to the Open/Closed Principle?'
        },
        {
          question: 'What is the difference between Adapter, Decorator, and Proxy patterns? They all wrap objects — how do you decide which to use?',
          hint: 'Focus on the intent of each pattern, not just the structure.',
          answer: 'While all three patterns involve wrapping an object, they have distinct intents. Adapter converts an incompatible interface to one the client expects — use it when integrating third-party libraries or legacy code (e.g., wrapping a SOAP service to expose a REST API). Decorator adds new responsibilities dynamically while keeping the same interface — use it when you need to augment behavior without subclassing (e.g., BufferedInputStream adding buffering to FileInputStream). Proxy controls access to an object — use it for lazy loading (virtual proxy), security checks (protection proxy), caching, or remote access (RMI). The key decision factor is intent: if you\'re changing the interface, use Adapter; if you\'re adding behavior, use Decorator; if you\'re controlling access, use Proxy. In Spring, @Transactional creates a Proxy, Java I/O uses Decorators extensively, and integration adapters are common in Spring Integration.',
          difficulty: 'hard',
          followUp: 'Can you give an example where you might chain multiple Decorators together?'
        },
        {
          question: 'What design patterns does the Spring Framework use internally?',
          hint: 'Think about bean creation, AOP, event handling, and MVC.',
          answer: 'Spring extensively uses design patterns throughout its architecture. Singleton is the default bean scope — ApplicationContext maintains a single instance of each bean. Factory pattern is used by BeanFactory and ApplicationContext to create and manage beans. Proxy pattern is fundamental to Spring AOP — @Transactional, @Cacheable, and @Async all work through JDK dynamic proxies or CGLIB proxies that intercept method calls. Template Method is used in JdbcTemplate, RestTemplate, and JmsTemplate, defining algorithm skeletons while letting users provide specific implementations. Observer pattern powers Spring\'s event system — publishers emit ApplicationEvents and @EventListener methods subscribe to them. Front Controller pattern is implemented by DispatcherServlet, which receives all HTTP requests and delegates to appropriate controllers. Understanding these patterns helps you use Spring more effectively and debug framework behavior.',
          difficulty: 'medium',
          followUp: 'How does Spring decide whether to use JDK dynamic proxy or CGLIB proxy?'
        },
        {
          question: 'When would you use the Builder pattern over a constructor or factory?',
          hint: 'Think about objects with many parameters, immutability, and readability.',
          answer: 'I use the Builder pattern when an object has many constructor parameters, especially when several are optional. With a constructor approach, you end up with telescoping constructors (multiple overloaded constructors with increasing parameters), which is error-prone — imagine calling new User(name, null, null, true, null, 30) where parameter positions are easily confused. Builder solves this with a fluent API: User.builder().name("John").age(30).active(true).build(). I also use Builder when the object should be immutable (all fields are final, set only during construction). Builder is preferred over Factory when the focus is on constructing a single complex object step by step, while Factory is better when you need to select between different types of objects. Common examples include HTTP request builders, query builders, and configuration objects.',
          difficulty: 'easy',
          followUp: 'How does Lombok\'s @Builder annotation simplify this pattern?'
        }
      ]
    }
  ]
});
