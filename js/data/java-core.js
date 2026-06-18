// Interview Quest - Java Core Content Data

window.CATEGORIES = window.CATEGORIES || [];

window.CATEGORIES.push({
  id: 'java-core',
  name: 'Java Core',
  icon: '☕',
  color: '#3B82F6',
  topics: [
    {
      id: 'git',
      name: 'Git',
      icon: '🔀',
      notes: {
        title: 'Git Version Control',
        points: [
          '<strong>Basic Commands:</strong> <code>git init</code> initializes a repo. <code>git add</code> stages changes. <code>git commit</code> saves staged changes with a message. <code>git push</code> uploads commits to a remote, and <code>git pull</code> fetches and merges changes.',
          '<strong>Branching & Merging:</strong> <code>git branch [name]</code> creates a branch. <code>git checkout -b [name]</code> creates and switches. <code>git merge [branch]</code> combines history. <strong>Fast-forward merge</strong> occurs when the target branch has no new commits. <strong>Three-way merge</strong> creates a new merge commit when histories diverge.',
          '<strong>Rebase vs. Merge:</strong> <code>git rebase</code> reapplies commits on top of another base tip, creating a linear history. <code>git merge</code> preserves historical structure but creates extra merge commits. Never rebase public/shared branches to avoid rewriting shared history.',
          '<strong>Undo Operations:</strong> <code>git reset --soft</code> keeps changes staged. <code>git reset --mixed</code> (default) unstages changes. <code>git reset --hard</code> deletes all local changes. <code>git revert</code> creates a new commit that undoes changes without changing history.',
          '<strong>Stashing & Cherry-pick:</strong> <code>git stash</code> saves uncommitted work temporarily and cleans the working tree. Use <code>git stash pop</code> to restore. <code>git cherry-pick [commit-hash]</code> applies a specific commit from another branch to the current branch.'
        ],
        codeExamples: [
          {
            title: 'Common Git Workflow CLI Commands',
            code: '# Clone a repository and switch to a new branch\ngit clone https://github.com/example/repo.git\ncd repo\ngit checkout -b feature/interview-prep\n\n# Stage specific files and commit\ngit add src/Main.java\ngit commit -m "feat: add user authentication"\n\n# Sync with remote and push branch\ngit fetch origin\ngit rebase origin/main\ngit push -u origin feature/interview-prep',
            language: 'bash'
          },
          {
            title: 'Undoing and Stashing Changes',
            code: '# Temporarily stash changes with a description\ngit stash save "work in progress on UI"\n\n# Switch branches, do work, switch back and pop\ngit checkout main\n# ... do hotfix and commit ...\ngit checkout feature/interview-prep\ngit stash pop\n\n# Undo the last commit but keep changes in working directory\ngit reset --soft HEAD~1',
            language: 'bash'
          }
        ],
        interviewTips: [
          'Be ready to explain when to use Rebase vs. Merge. Rebasing keeps history clean but can confuse collaborators if used on shared branches.',
          'Understand git reset modes: soft, mixed, and hard. Hard reset is destructive, so use it with caution.',
          'Know how conflict resolution works: Git marks conflicts in files, you edit them manually, stage, and commit.'
        ]
      },
      flashcards: [
        { front: 'What does git fetch do compared to git pull?', back: 'git fetch downloads commits, files, and refs from a remote repository but does not merge them into your local branch. git pull is a combination of git fetch followed by git merge (or git rebase if configured).' },
        { front: 'What is the difference between git reset and git revert?', back: 'git reset moves the current branch pointer backward in time, effectively removing commits from history (good for local undo). git revert creates a new commit that reverses the effects of a target commit, preserving history (safe for shared remotes).' },
        { front: 'What is git stash and when do you use it?', back: 'git stash temporarily shelves (stashes) changes you\'ve made to your working copy so you can work on something else, and then come back and re-apply them later. Ideal when you need to switch branches quickly but have unfinished work.' },
        { front: 'What is a merge conflict and how is it resolved?', back: 'A merge conflict happens when Git cannot automatically resolve differences in code between two merging commits (e.g., same line modified differently). It is resolved by manually editing the files containing the conflict markers, staging them (git add), and committing.' }
      ],
      quiz: [
        {
          question: 'Which git reset option unstages files but leaves their content in the working directory modified?',
          options: ['--hard', '--soft', '--mixed', '--keep'],
          correct: 2,
          explanation: '--mixed is the default reset option. It resets the index (unstages the files) but leaves the working tree unchanged. --soft keeps files staged, while --hard discards all changes entirely.',
          difficulty: 'medium'
        },
        {
          question: 'What command would you use to apply a single, specific commit from another branch into your current branch?',
          options: ['git merge', 'git rebase', 'git cherry-pick', 'git apply'],
          correct: 2,
          explanation: 'git cherry-pick [commit-hash] is used to copy a specific commit from one branch and apply it as a new commit on the current branch.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'Explain the difference between Git Rebase and Git Merge, and when you would use each.',
          hint: 'Think about commit history linearity and working in teams.',
          answer: 'Git Merge creates a new commit that joins the histories of both branches, preserving the exact history of when commits occurred. It is safe and does not modify history. Git Rebase moves the entire feature branch commits to begin on the tip of the target branch, rewriting history to be linear. Use merge for public/shared branches to avoid history rewriting conflicts. Use rebase for local, private branches to clean up your history before merging into main.'
        }
      ]
    },
    {
      id: 'oops',
      name: 'Object-Oriented Programming (OOPs)',
      icon: '🧱',
      notes: {
        title: 'OOPs Principles & Java Implementation',
        points: [
          '<strong>Class Types:</strong> <strong>Concrete classes</strong> can be fully instantiated. <strong>Abstract classes</strong> cannot be instantiated, may contain abstract methods, and serve as templates. <strong>Final classes</strong> cannot be subclassed (e.g., <code>String</code>).',
          '<strong>Methods:</strong> <strong>Overloading</strong> (compile-time polymorphism) has the same name but different parameters (type, number, or order) within the same class. <strong>Overriding</strong> (run-time polymorphism) allows a subclass to provide a specific implementation of a method defined in its superclass, with the same signature and return type (or covariant return type).',
          '<strong>Constructors:</strong> Special blocks of code used to initialize objects. If no constructor is defined, the compiler inserts a <strong>default constructor</strong>. <strong>Parameterized constructors</strong> initialize fields with custom values. <strong>Copy constructors</strong> create a new object by copying values from an existing object.',
          '<strong>Object Creation Types:</strong> Objects can be created using: 1) the <code>new</code> keyword, 2) <code>Class.forName().getDeclaredConstructor().newInstance()</code> (Reflection), 3) <code>clone()</code> method, 4) Deserialization, and 5) Dependency injection or Factory design pattern.'
        ],
        codeExamples: [
          {
            title: 'Method Overloading vs. Overriding',
            code: 'class Calculator {\n    // Method Overloading (Compile-time)\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}\n\nclass SmartCalculator extends Calculator {\n    // Method Overriding (Run-time)\n    @Override\n    int add(int a, int b) {\n        System.out.println("Adding integers: " + a + ", " + b);\n        return super.add(a, b);\n    }\n}',
            language: 'java'
          },
          {
            title: 'Object Creation Alternatives',
            code: '// 1. Using new keyword\nMyClass obj1 = new MyClass();\n\n// 2. Using Reflection\nMyClass obj2 = MyClass.class.getDeclaredConstructor().newInstance();\n\n// 3. Using Cloning (requires Cloneable)\nMyClass obj3 = (MyClass) obj1.clone();',
            language: 'java'
          }
        ],
        interviewTips: [
          'Understand that static methods cannot be overridden (they are hidden).',
          'Explain why constructors cannot be inherited or made static/final/abstract.',
          'Know the covariant return type rule: an overriding method can return a subtype of the return type declared in the parent method.'
        ]
      },
      flashcards: [
        { front: 'What is a covariant return type?', back: 'It allows an overriding method in a subclass to return a subclass (subtype) of the return type declared in the parent method, instead of the exact same type.' },
        { front: 'Can we override a private or static method in Java?', back: 'No. Private methods are not visible to subclasses and static methods belong to the class rather than instances. Overwriting static methods is called method hiding, not overriding.' },
        { front: 'What is the purpose of a constructor? Can it return a value?', back: 'A constructor initializes a newly created object. It does not return any value, not even void. However, it implicitly returns the instance of the class.' },
        { front: 'What is the difference between an abstract class and an interface in Java 8+?', back: 'Abstract classes can have state (instance fields), constructors, and non-public methods. Interfaces can have default and static methods, but cannot have instance fields (only public static final constants) or constructors.' }
      ],
      quiz: [
        {
          question: 'Which of the following is NOT a valid way to create an object in Java?',
          options: ['Using the new keyword', 'Using the clone() method', 'Using deserialization', 'Using the super() method'],
          correct: 3,
          explanation: 'super() is used within constructors to call the parent class constructor; it does not instantiate objects directly. new, clone(), and deserialization are valid object creation mechanisms.',
          difficulty: 'easy'
        },
        {
          question: 'If a method in a parent class is declared as final, can it be overloaded and overridden?',
          options: ['It can be neither overloaded nor overridden', 'It can be overloaded, but cannot be overridden', 'It can be overridden, but cannot be overloaded', 'It can be both overloaded and overridden'],
          correct: 1,
          explanation: 'A final method cannot be overridden by subclasses. However, it can still be overloaded within the same class or subclasses because overloading is compile-time name reuse with different signatures.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'Compare Abstract Classes and Interfaces. When would you choose one over the other?',
          hint: 'Think about multiple inheritance, state, and API contracts.',
          answer: 'Use an Interface when you want to define a contract/behavior that can be implemented by any class, regardless of where it is in the class hierarchy, and to support multiple inheritance. Use an Abstract Class when you want to share code/state among closely related subclasses, require constructors, or want to declare non-public fields and methods.'
        }
      ]
    },
    {
      id: 'datatypes',
      name: 'Data Types & Autoboxing',
      icon: '🔢',
      notes: {
        title: 'Java Data Types and Autoboxing / Unboxing',
        points: [
          '<strong>Primitives:</strong> Java has 8 primitive types: <code>byte</code> (1 byte), <code>short</code> (2 bytes), <code>int</code> (4 bytes), <code>long</code> (8 bytes), <code>float</code> (4 bytes), <code>double</code> (8 bytes), <code>char</code> (2 bytes), and <code>boolean</code> (1 bit virtual, 1 byte in arrays).',
          '<strong>Wrapper Classes:</strong> Object representations of primitives (e.g., <code>Integer</code>, <code>Double</code>, <code>Character</code>). They reside on the Heap, allow null values, and are required in Java Collections.',
          '<strong>Autoboxing & Unboxing:</strong> <strong>Autoboxing</strong> is the automatic conversion of primitives to their wrapper types (e.g., <code>int</code> to <code>Integer</code>). <strong>Unboxing</strong> is the reverse conversion. Both are performed by the compiler using methods like <code>Integer.valueOf()</code> and <code>intValue()</code>.',
          '<strong>Caching Pool:</strong> Wrapper classes cache objects in a specific range: <code>Byte</code>, <code>Short</code>, <code>Integer</code>, and <code>Long</code> cache values from <strong>-128 to 127</strong>. <code>Character</code> caches 0 to 127. <code>Boolean</code> caches TRUE/FALSE. Equality tests (<code>==</code>) outside this range on wrappers will compare references and fail!'
        ],
        codeExamples: [
          {
            title: 'Autoboxing, Unboxing, and Wrapper Caching',
            code: '// Autoboxing (compiler uses Integer.valueOf(100))\nInteger a = 100;\nInteger b = 100;\nSystem.out.println(a == b); // true (cached)\n\nInteger c = 200;\nInteger d = 200;\nSystem.out.println(c == d); // false (not cached, separate objects!)\nSystem.out.println(c.equals(d)); // true (value comparison)\n\n// Unboxing (compiler uses c.intValue())\nint primitiveC = c;',
            language: 'java'
          }
        ],
        interviewTips: [
          'Remember the wrapper caching range (-128 to 127). Always use .equals() for comparing wrapper objects instead of ==.',
          'Be aware of NullPointerException during unboxing. If a wrapper object is null and you unbox it to a primitive, Java throws an NPE.'
        ]
      },
      flashcards: [
        { front: 'What is the default value of local variables vs. instance variables?', back: 'Instance variables are initialized to their default values (e.g., 0, false, null). Local variables are NOT initialized automatically; you must initialize them before use, otherwise a compile-time error occurs.' },
        { front: 'What is Autoboxing and when does it occur?', back: 'Autoboxing is the compiler\'s automatic conversion of a primitive to its corresponding wrapper class (e.g., converting int to Integer when adding to an ArrayList<Integer>).' },
        { front: 'Why does Integer a = 127; Integer b = 127; a == b return true, but 128 returns false?', back: 'Java caches Integer objects for values from -128 to 127. For 127, both variables point to the same cached instance. For 128, Java instantiates new, distinct Integer objects, so their reference comparison (==) is false.' }
      ],
      quiz: [
        {
          question: 'What is the result of running: Integer x = null; int y = x;',
          options: ['y is initialized to 0', 'y is initialized to null', 'Throws NullPointerException at runtime', 'Compiler error'],
          correct: 2,
          explanation: 'Java attempts to auto-unbox x by calling x.intValue(). Since x is null, calling a method on it throws a NullPointerException at runtime.',
          difficulty: 'medium'
        },
        {
          question: 'Which primitive data type has a size of exactly 8 bits (1 byte)?',
          options: ['char', 'byte', 'short', 'boolean'],
          correct: 1,
          explanation: 'The byte data type is an 8-bit signed two\'s complement integer. char and short are 16-bit.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'What are the performance implications of Autoboxing and Unboxing in loops?',
          hint: 'Think about memory allocation and garbage collection.',
          answer: 'Using wrapper classes in loops causes frequent autoboxing, which instantiates new wrapper objects on the heap (e.g., Integer sum += i). This wastes memory, increases garbage collection pressure, and degrades performance. You should use primitive types (like int or long) for local loop calculations and convert to wrappers only when necessary.'
        }
      ]
    },
    {
      id: 'jvm',
      name: 'JVM Memory Model',
      icon: '⚙️',
      notes: {
        title: 'JVM Memory Spaces and Garbage Collection',
        points: [
          '<strong>JVM Memory Areas:</strong> Divided into: 1) <strong>Method Area / Metaspace</strong> (stores class structures, static fields; Metaspace is off-heap in Java 8+), 2) <strong>Heap Area</strong> (stores objects and instance variables), 3) <strong>Stack Area</strong> (thread-specific frames for method calls and local variables), 4) <strong>Program Counter (PC) Register</strong> (stores current execution address), and 5) <strong>Native Method Stack</strong>.',
          '<strong>Heap Architecture:</strong> Divided into <strong>Young Generation</strong> (Eden Space, Survivor Spaces S0 & S1) and <strong>Old/Tenured Generation</strong>. Newly created objects go to Eden. Surviving objects migrate to S0/S1, then graduate to Old Gen after reaching an age threshold.',
          '<strong>Garbage Collection (GC) Types:</strong> <strong>Minor GC</strong> cleans the Young Generation. <strong>Major GC</strong> cleans the Old Generation. <strong>Full GC</strong> cleans the entire heap including Metaspace. <strong>Stop-The-World (STW)</strong> pauses application threads during GC phases.',
          '<strong>GC Collectors:</strong> <code>Serial GC</code> (single-threaded), <code>Parallel GC</code> (multi-threaded Young/Old), <code>G1 GC</code> (incremental regional collector for large heaps), <code>ZGC</code> (ultra-low latency concurrent collector, near-zero STW pauses).'
        ],
        codeExamples: [
          {
            title: 'Configuring JVM Memory Limits via CLI Flags',
            code: '# Set initial heap size to 512MB and maximum heap size to 2GB\njava -Xms512m -Xmx2g -jar my-application.jar\n\n# Enable G1 Garbage Collector and set maximum GC pause time target\njava -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -jar my-application.jar\n\n# Print detailed Garbage Collection log information\njava -Xlog:gc*:file=gc.log -jar my-application.jar',
            language: 'bash'
          }
        ],
        interviewTips: [
          'Explain that Stack memory is thread-safe and stored locally per thread, while Heap memory is shared among all threads.',
          'Know what OutOfMemoryError (OOM) and StackOverflowError are, and how they differ: OOM occurs when heap/metaspace runs out of space; StackOverflow occurs when the execution stack depth is exceeded (e.g., deep recursion).'
        ]
      },
      flashcards: [
        { front: 'What is the main difference between Stack and Heap memory?', back: 'Stack memory stores method frames, local variables, and primitive references; it is thread-local and managed automatically (LIFO). Heap memory stores all objects and instance fields; it is shared across all threads and managed by the Garbage Collector.' },
        { front: 'What is Metaspace and where is it located in Java 8+?', back: 'Metaspace stores class metadata, method structures, and constant pools. In Java 8, it replaced PermGen and was moved to native memory (off-heap) to automatically resize and prevent PermGen OutOfMemoryErrors.' },
        { front: 'What causes a StackOverflowError?', back: 'It occurs when the call stack exceeds its configured size limit, typically due to infinite recursion or excessively deep nested method invocations.' },
        { front: 'What is a Stop-the-World (STW) event in Garbage Collection?', back: 'An STW event is a phase in garbage collection where the JVM halts all application threads to safely inspect, move, or reclaim memory objects without their state changing mid-process.' }
      ],
      quiz: [
        {
          question: 'Where are instance variables of an object stored in JVM memory?',
          options: ['In the Stack Area', 'In the Heap Area', 'In the Method Area', 'In the PC Register'],
          correct: 1,
          explanation: 'Instance variables are parts of an object, and all objects reside on the Heap. Local variables inside methods are stored on the Stack.',
          difficulty: 'easy'
        },
        {
          question: 'Which JVM GC collector is designed for large heaps (4GB+) and splits the heap into multiple equal-sized regions?',
          options: ['Serial GC', 'Parallel GC', 'G1 GC', 'ZGC'],
          correct: 2,
          explanation: 'G1 (Garbage-First) GC divides the heap into regions (1MB to 32MB) and performs concurrent, incremental collection prioritising regions containing the most garbage.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'How does Garbage Collection determine if an object is eligible for deletion?',
          hint: 'Think about GC Roots and Reachability Analysis.',
          answer: 'Java uses Reachability Analysis. It starts from a set of active objects called "GC Roots" (like active stack variables, static fields, active threads, JNI references). It traverses references to build a tree of reachable objects. If an object cannot be reached by any path from any GC Root, it is considered unreachable and becomes eligible for garbage collection.'
        }
      ]
    },
    {
      id: 'exceptions',
      name: 'Exception Handling',
      icon: '⚠️',
      notes: {
        title: 'Java Exception Hierarchy & Best Practices',
        points: [
          '<strong>Hierarchy:</strong> The root class is <code>Throwable</code>, which has two main subclasses: <code>Error</code> (serious system problems like <code>OOM</code>, do not catch) and <code>Exception</code> (application issues, can catch).',
          '<strong>Checked vs. Unchecked:</strong> <strong>Checked Exceptions</strong> inherit from <code>Exception</code> (except <code>RuntimeException</code>). They must be declared in <code>throws</code> or handled via <code>try-catch</code> (compiler-enforced, e.g., <code>IOException</code>). <strong>Unchecked/Runtime Exceptions</strong> inherit from <code>RuntimeException</code> (e.g., <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>) and do not require compiler enforcement.',
          '<strong>Try-With-Resources:</strong> Introduced in Java 7, it automatically closes resources (like files or database connections) declared inside the statement. The resource class must implement the <code>AutoCloseable</code> interface.',
          '<strong>Finally Block:</strong> Executes regardless of whether an exception is thrown or caught. Only situations where <code>finally</code> doesn\'t run: <code>System.exit()</code>, JVM crashes, infinite loops, or thread death.'
        ],
        codeExamples: [
          {
            title: 'Try-With-Resources and Custom Exceptions',
            code: 'public class DatabaseService {\n    // Custom checked exception\n    public static class DbConnectionException extends Exception {\n        public DbConnectionException(String msg, Throwable cause) {\n            super(msg, cause);\n        }\n    }\n\n    public void fetchData() throws DbConnectionException {\n        // Try-with-resources auto-closes resource\n        try (Connection conn = DriverManager.getConnection("jdbc:mysql://...")) {\n            // Database operations\n        } catch (SQLException e) {\n            // Exception chaining/wrapping\n            throw new DbConnectionException("Failed to fetch database data", e);\n        }\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Never catch Throwable or Error. Catch specific exceptions instead.',
          'Do not return values from a finally block, as it overrides the return value or exceptions thrown in the try/catch blocks.',
          'Understand Exception Chaining: passing the original cause exception into a new exception constructor to preserve the stack trace.'
        ]
      },
      flashcards: [
        { front: 'What is the difference between throw and throws?', back: 'throw is a keyword used inside methods to explicitly throw a single exception instance. throws is a clause in the method signature declaring that this method may throw the specified exceptions to its caller.' },
        { front: 'Under what conditions does the finally block NOT execute?', back: 'The finally block does not execute if the JVM halts using System.exit(), if the JVM crashes, if the executing thread is killed, or if an infinite loop occurs in the try/catch block.' },
        { front: 'What is AutoCloseable and how is it used?', back: 'AutoCloseable is an interface with a single close() method. Any class implementing it can be used within a try-with-resources block, which guarantees the resource\'s close() method is called automatically when the block exits.' },
        { front: 'Can a subclass method declare broader checked exceptions than its overridden parent method?', back: 'No. An overriding subclass method cannot declare broader, new, or more checked exceptions than the parent method. It can, however, declare fewer exceptions, narrower subtypes, or any unchecked exceptions.' }
      ],
      quiz: [
        {
          question: 'Which exception class is the superclass of all checked exceptions in Java?',
          options: ['Throwable', 'Error', 'Exception (excluding RuntimeException)', 'RuntimeException'],
          correct: 2,
          explanation: 'All exceptions inheriting from java.lang.Exception (except those that inherit from java.lang.RuntimeException) are checked exceptions.',
          difficulty: 'easy'
        },
        {
          question: 'What happens if both try and finally blocks contain return statements?',
          options: ['Compiler error', 'The return statement in try is executed', 'The return statement in finally is executed, discarding the try return', 'Both return statements are executed consecutively'],
          correct: 2,
          explanation: 'The return statement in the finally block will override any return statement or exception thrown in the try or catch blocks.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'What is Exception Chaining and why is it useful?',
          hint: 'Think about layering, abstraction, and maintaining stack traces.',
          answer: 'Exception Chaining is the practice of catching a low-level exception and throwing a higher-level business exception that contains the original exception as its cause (using constructors or initCause()). This is useful because it maintains abstraction layers (e.g., throwing a UserServiceException instead of a raw SQLException to the controller) while preserving the original root cause stack trace for debugging.'
        }
      ]
    },
    {
      id: 'innerclasses',
      name: 'Inner Classes',
      icon: '🪆',
      notes: {
        title: 'Types of Nested Classes in Java',
        points: [
          '<strong>Static Nested Classes:</strong> Declared inside another class with the <code>static</code> keyword. They cannot access non-static members of the outer class directly. They are instantiated without an outer class instance: <code>Outer.Nested obj = new Outer.Nested();</code>.',
          '<strong>Inner Classes (Non-static):</strong> Associated with an instance of the outer class. They have access to all members (including private ones) of the outer class. Instantiated as: <code>Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();</code>.',
          '<strong>Local Inner Classes:</strong> Declared inside a method block. They are only visible within the method and can only access local variables of the method if they are <code>final</code> or <strong>effectively final</strong>.',
          '<strong>Anonymous Inner Classes:</strong> Inner classes without a name, declared and instantiated in a single expression using <code>new</code>. Commonly used for listeners, runnable threads, or quick interface implementations (though lambdas are preferred now).'
        ],
        codeExamples: [
          {
            title: 'Static Nested vs. Non-Static Inner Class',
            code: 'class Outer {\n    private String outerField = "Outer state";\n    private static String outerStaticField = "Outer static state";\n\n    // 1. Static Nested Class\n    static class Nested {\n        void display() {\n            // System.out.println(outerField); // Compiler error!\n            System.out.println(outerStaticField); // OK\n        }\n    }\n\n    // 2. Non-static Inner Class\n    class Inner {\n        void display() {\n            System.out.println(outerField); // OK (direct access)\n        }\n    }\n}',
            language: 'java'
          },
          {
            title: 'Anonymous and Local Inner Classes',
            code: 'public class ThreadDemo {\n    public void startTask(final String taskId) {\n        // Anonymous Inner Class implementing Runnable\n        Runnable r = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println("Running task: " + taskId);\n            }\n        };\n        new Thread(r).start();\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Remember: Static nested classes do not hold an implicit reference to the outer class instance, preventing memory leaks. Non-static inner classes do, which can lead to memory leaks if the inner class instance outlives the outer class instance.',
          'Be prepared to explain why local inner classes can only access final or effectively final variables: local variables reside on the stack and are destroyed when the method returns, but the inner class instance lives on the heap. The inner class keeps a copy of the variable, which must not change.'
        ]
      },
      flashcards: [
        { front: 'Why does an inner class instance keep a reference to its outer class instance?', back: 'Non-static inner classes require an instance of the outer class to exist and hold an implicit reference to it, enabling direct access to all instance fields and methods of the outer class.' },
        { front: 'What is the main difference between static nested classes and inner classes?', back: 'Static nested classes are defined with the static keyword and do not hold a reference to an outer instance (instantiated as new Outer.Nested()). Inner classes are non-static, require an outer instance to exist, and hold a reference to it (instantiated as outer.new Inner()).' },
        { front: 'Why must local variables accessed by local inner classes be final or effectively final?', back: 'Local variables exist on the stack and are destroyed when the method exits. The local inner class instance lives on the heap and outlives the method, so it keeps a copy of the variable. To prevent inconsistency, Java requires this variable to be immutable (final).' }
      ],
      quiz: [
        {
          question: 'How do you instantiate a non-static inner class named Inner inside an outer class Outer from a static method?',
          options: ['Outer.Inner inner = new Outer.Inner();', 'Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();', 'Inner inner = new Inner();', 'Outer.Inner inner = new Outer().new Inner(); (Is this also valid?)'],
          correct: 1,
          explanation: 'To instantiate a non-static inner class, you must first have an instance of the outer class, then call outer.new Inner(). Both options 2 and 4 are valid syntactically, but option 2 clearly demonstrates the step-by-step necessity.',
          difficulty: 'medium'
        },
        {
          question: 'Which nested class type does NOT have access to private instance variables of the outer class?',
          options: ['Static nested class', 'Non-static inner class', 'Local inner class', 'None of the above (all have access)'],
          correct: 0,
          explanation: 'Static nested classes cannot access non-static (instance) variables of the outer class, even if private, because they do not have an outer instance reference. They can only access static outer fields.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'How can non-static inner classes lead to memory leaks in Android or backend services?',
          hint: 'Think about active thread handlers or listeners keeping references.',
          answer: 'Because a non-static inner class instance holds an implicit reference to its outer class instance. If the inner class instance is referenced by a long-running thread, static field, or event listener, it prevents the outer class instance (which might be large, like an Android Activity or a heavy service) from being garbage collected, causing a memory leak. To fix this, convert the inner class to a static nested class and pass a WeakReference of the outer class if needed.'
        }
      ]
    },
    {
      id: 'strings',
      name: 'Strings & Builders',
      icon: '🧵',
      notes: {
        title: 'String Immutability, Pool, and Performance',
        points: [
          '<strong>String Immutability:</strong> String objects are immutable in Java. Once created, their values cannot be changed. Modification creates a new String. This ensures security, thread safety, hashcode caching, and string pooling.',
          '<strong>String Constant Pool (SCP):</strong> A special memory region in the Heap. When creating a string literal (e.g., <code>"abc"</code>), JVM checks the pool. If present, it returns the reference. If not, it creates a new one in SCP. Using <code>new String("abc")</code> bypasses this check, creating a new object on the heap and optionally adding it to SCP if <code>intern()</code> is called.',
          '<strong>StringBuilder vs. StringBuffer:</strong> Both are mutable sequences of characters. <code>StringBuilder</code> (Java 5) is non-synchronized and faster (not thread-safe). <code>StringBuffer</code> is synchronized and slower (thread-safe).',
          '<strong>Performance:</strong> Concatenating strings in a loop using <code>+</code> creates multiple temporary String objects. Use <code>StringBuilder.append()</code> inside loops for efficient memory usage.'
        ],
        codeExamples: [
          {
            title: 'String Pool vs. Heap Allocations',
            code: 'String s1 = "Java"; // SCP\nString s2 = "Java"; // Points to same SCP reference\nString s3 = new String("Java"); // Heap\n\nSystem.out.println(s1 == s2); // true (same reference)\nSystem.out.println(s1 == s3); // false (different objects)\nSystem.out.println(s1.equals(s3)); // true (value match)\n\nString s4 = s3.intern(); // Get SCP reference for s3\'s value\nSystem.out.println(s1 == s4); // true!',
            language: 'java'
          },
          {
            title: 'Efficient Modification in Loops',
            code: '// BAD: Creates many intermediate strings\nString result = "";\nfor(int i = 0; i < 1000; i++) {\n    result += i; \n}\n\n// GOOD: Modifies single char array in memory\nStringBuilder sb = new StringBuilder();\nfor(int i = 0; i < 1000; i++) {\n    sb.append(i);\n}\nString finalResult = sb.toString();',
            language: 'java'
          }
        ],
        interviewTips: [
          'Explain why String is immutable: security (networking/files), caching hash codes (key in Maps), and memory efficiency (String Pool).',
          'Understand intern() method: it returns the canonical representation of the string from the string pool.'
        ]
      },
      flashcards: [
        { front: 'Why is String immutable in Java?', back: 'Immutability provides thread safety, prevents modification of sensitive data (like database URLs/filenames passed as strings), enables the String Constant Pool to save memory, and allows caching of the string\'s hash code for fast Map operations.' },
        { front: 'What is the difference between String s = "abc"; and String s = new String("abc");?', back: 'The literal "abc" creates one object in the String Constant Pool (if not already present). new String("abc") creates two objects: one in the String Constant Pool (if not present) and one on the general heap. The variable s points to the heap object.' },
        { front: 'What is the difference between StringBuilder and StringBuffer?', back: 'Both are mutable classes. StringBuilder is not thread-safe (not synchronized) and is faster, making it ideal for single-threaded local operations. StringBuffer is thread-safe (synchronized methods) and slower.' },
        { front: 'What does the String.intern() method do?', back: 'It searches the String Constant Pool for a string with the same content. If found, it returns the reference from the pool. If not found, it adds the string to the pool and returns its reference.' }
      ],
      quiz: [
        {
          question: 'How many objects are created by: String s = new String("Hello"); assuming "Hello" does not exist in the pool?',
          options: ['1 object', '2 objects', '3 objects', '0 objects'],
          correct: 1,
          explanation: 'Two objects are created: one in the String Constant Pool ("Hello" literal) and one in the heap area (via the new keyword).',
          difficulty: 'easy'
        },
        {
          question: 'Which class should be used to concatenate strings in a single-threaded loop for best performance?',
          options: ['String', 'StringBuffer', 'StringBuilder', 'StringJoiner'],
          correct: 2,
          explanation: 'StringBuilder is non-synchronized, meaning it has no thread-safety overhead, making it the fastest option for mutable string manipulation in a single thread.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'If String is immutable, how does the compiler optimize string concatenation like: String s = "a" + "b" + "c";?',
          hint: 'Think about compile-time constant folding and StringBuilder.',
          answer: 'For compile-time constants like "a" + "b" + "c", the Java compiler performs "constant folding" and converts it directly to "abc" in the bytecode. No StringBuilder is created at runtime. For variable concatenation like s1 + s2, the compiler (Java 9+) uses invokedynamic with StringConcatFactory, which optimizes concatenation at runtime (under the hood, older versions used StringBuilder).'
        }
      ]
    },
    {
      id: 'arrays',
      name: 'Arrays',
      icon: '📊',
      notes: {
        title: 'Java Arrays Memory and Operations',
        points: [
          '<strong>Characteristics:</strong> Arrays are fixed-size, homogeneous data structures in Java. Once created, their size cannot be changed. Arrays are objects, which means they reside on the Heap even if they store primitives.',
          '<strong>Memory Layout:</strong> An array reference variable resides on the Stack, pointing to the array object on the Heap. Multi-dimensional arrays are "arrays of arrays" in Java, and do not need to be rectangular (jagged arrays are supported).',
          '<strong>Array Initialization:</strong> Can be declared and initialized via <code>int[] arr = new int[5];</code> (initialized to defaults like 0) or <code>int[] arr = {1, 2, 3};</code>.',
          '<strong>Utility Class:</strong> <code>java.util.Arrays</code> provides helpful methods like <code>sort()</code> (uses Dual-Pivot Quicksort for primitives, Timsort for objects), <code>binarySearch()</code>, <code>equals()</code>, <code>fill()</code>, and <code>stream()</code>.'
        ],
        codeExamples: [
          {
            title: 'Jagged Arrays and Utility Methods',
            code: '// Creating a Jagged Array (non-uniform column sizes)\nint[][] jagged = new int[2][];\njagged[0] = new int[] { 1, 2 };\njagged[1] = new int[] { 3, 4, 5, 6 };\n\n// Sorting and Searching\nint[] data = { 5, 2, 8, 1 };\nArrays.sort(data); // data becomes [1, 2, 5, 8]\nint index = Arrays.binarySearch(data, 5); // returns 2\n\n// Copying arrays safely\nint[] copy = Arrays.copyOf(data, data.length);',
            language: 'java'
          }
        ],
        interviewTips: [
          'Understand that arrays have a length property (e.g., arr.length), while Strings have a length() method, and Collections have a size() method.',
          'Remember: Arrays.asList(arr) returns a fixed-size list backed by the original array. Modifying the list writes through to the array. You cannot add or remove elements, as it throws UnsupportedOperationException.'
        ]
      },
      flashcards: [
        { front: 'Are arrays stored on the Stack or Heap in Java?', back: 'Arrays are objects in Java, so they are always stored on the Heap, regardless of whether they hold primitive data types or object references. The reference to the array is what resides on the Stack.' },
        { front: 'What is a jagged array in Java?', back: 'A jagged array is a multi-dimensional array where the member arrays can be of different lengths (e.g., int[][] arr = new int[2][]; arr[0] = new int[3]; arr[1] = new int[5];).' },
        { front: 'What sorting algorithm does Arrays.sort() use?', back: 'For primitive arrays, Arrays.sort() uses Dual-Pivot Quicksort (O(N log N) average). For object arrays, it uses Timsort (stable, adaptive merge sort).' },
        { front: 'What happens if you try to add an element to a list returned by Arrays.asList()?', back: 'It throws an UnsupportedOperationException. Arrays.asList() returns a fixed-size List wrapper backed by the original array, so you cannot add or remove elements (though you can set/modify existing elements).' }
      ],
      quiz: [
        {
          question: 'What is the default value of elements in a newly initialized boolean array (boolean[] arr = new boolean[5])?',
          options: ['true', 'false', 'null', '0'],
          correct: 1,
          explanation: 'Primitive boolean elements default to false. Numeric primitive elements default to 0, and object arrays default to null.',
          difficulty: 'easy'
        },
        {
          question: 'Which class is returned by Arrays.asList("a", "b")?',
          options: ['java.util.ArrayList', 'java.util.Arrays$ArrayList', 'java.util.Vector', 'java.util.LinkedList'],
          correct: 1,
          explanation: 'It returns a private static nested class named ArrayList inside java.util.Arrays, which is NOT java.util.ArrayList. This is why it has a fixed size.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain how multi-dimensional arrays are represented in memory in Java compared to C++.',
          hint: 'Think about contiguous memory allocation vs. pointers to arrays.',
          answer: 'In C++, multi-dimensional arrays are stored in a contiguous block of memory. In Java, multi-dimensional arrays are represented as arrays of arrays. This means the top-level array contains references pointing to secondary array objects scattered on the heap. This allows for jagged arrays (different sub-array sizes) but carries dereferencing performance overhead and cache locality degradation compared to contiguous memory.'
        }
      ]
    },
    {
      id: 'generics',
      name: 'Generics',
      icon: '🧬',
      notes: {
        title: 'Java Generics, Wildcards, and Type Erasure',
        points: [
          '<strong>Purpose:</strong> Generics (Java 5) provide compile-time type safety and eliminate the need for explicit type casting. They allow classes, interfaces, and methods to be parameterized by types.',
          '<strong>Type Erasure:</strong> The compiler enforces type safety checks at compile time, and then **erases** all generic type parameters in bytecode. The compiler replaces type parameters with their first bound (or <code>Object</code> if unbound) and inserts necessary type casts. Generics do not exist at runtime.',
          '<strong>Wildcards:</strong> The question mark <code>?</code> represents an unknown type. <strong>Unbounded Wildcard:</strong> <code>List<?></code>. <strong>Upper Bounded Wildcard:</strong> <code>List<? extends Number></code> (accepts Number or its subclasses; read-only). <strong>Lower Bounded Wildcard:</strong> <code>List<? super Integer></code> (accepts Integer or its superclasses; write-safe).',
          '<strong>PECS Principle:</strong> Producer Extends, Consumer Super. Use <code>? extends T</code> when you only get/read values from a collection (producer). Use <code>? super T</code> when you only add/write values into a collection (consumer).'
        ],
        codeExamples: [
          {
            title: 'Wildcards and the PECS Principle',
            code: 'public class GenericsDemo {\n    // Producer Extends: reads values from list\n    public static double sumOfList(List<? extends Number> list) {\n        double sum = 0.0;\n        for (Number n : list) {\n            sum += n.doubleValue();\n        }\n        // list.add(10); // Compiler error! Cannot add items\n        return sum;\n    }\n\n    // Consumer Super: writes values to list\n    public static void addNumbers(List<? super Integer> list) {\n        list.add(1); // OK\n        list.add(2); // OK\n        // Object item = list.get(0); // Returns Object, no specific type\n    }\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Remember PECS: Producer Extends, Consumer Super. Upper bounds make a collection read-only; lower bounds make it writable.',
          'Understand that you cannot create an array of a generic type (e.g., new T[10] is a compiler error) because arrays verify type at runtime, but generics are erased.'
        ]
      },
      flashcards: [
        { front: 'What is Type Erasure in Java Generics?', back: 'Type Erasure is the process where the compiler removes all generic type parameter information at compile time, replacing them with Object (or bounds) and inserting casts. This ensures backward compatibility with older Java versions.' },
        { front: 'Explain PECS (Producer Extends, Consumer Super).', back: 'PECS is a guideline for wildcard bounds: use "? extends T" if your collection produces data (you only read from it), and "? super T" if your collection consumes data (you only write to it).' },
        { front: 'Can you instantiate a generic type parameter (e.g., new T())? Why?', back: 'No, you cannot. Because of type erasure, the type T is replaced by Object at runtime, meaning the exact type is unknown, making direct instantiation impossible. You must pass a Class<T> token and use reflection.' },
        { front: 'Why can we not create generic arrays, like List<String>[]?', back: 'Java arrays are reified (they know and enforce their component type at runtime), whereas generics are erased (types are removed). Mixing them would bypass array type checks, potentially leading to ClassCastException at runtime.' }
      ],
      quiz: [
        {
          question: 'Which wildcard signature allows you to add elements of type Double to a list?',
          options: ['List<?>', 'List<? extends Number>', 'List<? super Double>', 'List<? extends Double>'],
          correct: 2,
          explanation: 'Only lower-bounded wildcards (super) allow writing/adding items to a collection because they guarantee the list can hold the type or its parent type. Upper bounds (extends) make collections read-only.',
          difficulty: 'hard'
        },
        {
          question: 'What type replaces the parameter T in bytecode after compile-time type erasure if declared as class MyClass<T extends Number>?',
          options: ['Object', 'Number', 'Double', 'T is kept as is'],
          correct: 1,
          explanation: 'The compiler replaces T with its first bound. Since T extends Number, it is replaced by Number in the bytecode. If it were unbound (<T>), it would be replaced by Object.',
          difficulty: 'medium'
        }
      ],
      interview: [
        {
          question: 'Explain why List<String> cannot be assigned to List<Object> in Java.',
          hint: 'Think about type safety and what could happen if we added an Integer.',
          answer: 'Generics in Java are invariant. If List<String> were assignable to List<Object>, you could reference the list as List<Object> and add an Integer to it. However, the original reference is List<String>, so retrieving that item later as a String would throw a ClassCastException. To prevent this, Java forbids assigning List<String> to List<Object>.'
        }
      ]
    },
    {
      id: 'annotations',
      name: 'Custom Annotations',
      icon: '🏷️',
      notes: {
        title: 'Java Annotations and Meta-Annotations',
        points: [
          '<strong>Definition:</strong> Annotations provide metadata about classes, methods, or variables. They do not affect execution directly but can be processed at compile-time or runtime using Reflection.',
          '<strong>Meta-Annotations:</strong> Annotations applied to other annotations: 1) <code>@Retention</code>: specifies how long the annotation is kept (<code>SOURCE</code>, <code>CLASS</code>, or <code>RUNTIME</code>), 2) <code>@Target</code>: specifies where it can be applied (e.g., <code>METHOD</code>, <code>TYPE</code>, <code>FIELD</code>), 3) <code>@Documented</code>: includes annotation in Javadoc, 4) <code>@Inherited</code>: inherits annotation to subclasses.',
          '<strong>Custom Annotation Syntax:</strong> Declared using <code>@interface</code>. Elements are defined as methods without bodies, and can have default values. Allowed return types: primitives, String, Class, Enums, Annotations, or arrays of these.'
        ],
        codeExamples: [
          {
            title: 'Defining and Processing a Custom Annotation',
            code: '// 1. Define Custom Annotation\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface LogExecutionTime {\n    String value() default "INFO"; // Element with default\n}\n\n// 2. Apply Custom Annotation\nclass UserService {\n    @LogExecutionTime("DEBUG")\n    public void createUser() {\n        // User creation logic\n    }\n}\n\n// 3. Process via Reflection\nMethod method = UserService.class.getMethod("createUser");\nif (method.isAnnotationPresent(LogExecutionTime.class)) {\n    LogExecutionTime annotation = method.getAnnotation(LogExecutionTime.class);\n    System.out.println("Logging level: " + annotation.value());\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Know the three Retention Policies: SOURCE (discarded by compiler, e.g., @Override), CLASS (stored in class file, discarded by JVM at runtime), and RUNTIME (available to JVM, readable via Reflection).',
          'Be ready to write a simple annotation definition and its reflective processor on a whiteboard.'
        ]
      },
      flashcards: [
        { front: 'What are the three values of @Retention and what do they mean?', back: 'SOURCE: Discarded by the compiler (used for tools, e.g., @Override, Lombok). CLASS: Recorded in class files, but discarded by the classloader at runtime (default). RUNTIME: Retained in bytecode and readable at runtime via reflection.' },
        { front: 'What is the purpose of @Target in annotations?', back: '@Target specifies the Java elements (e.g. ElementType.TYPE for classes/interfaces, ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER) where the annotation can be legally applied.' },
        { front: 'Can an annotation element return an arbitrary Object or custom class?', back: 'No. Annotation element types are restricted to primitives, String, Class, Enums, Annotations, and arrays of these types. Arbitrary objects (like custom domain objects) are not allowed.' }
      ],
      quiz: [
        {
          question: 'Which meta-annotation makes an annotation accessible at runtime using Reflection?',
          options: ['@Retention(RetentionPolicy.SOURCE)', '@Retention(RetentionPolicy.CLASS)', '@Retention(RetentionPolicy.RUNTIME)', '@Inherited'],
          correct: 2,
          explanation: 'RetentionPolicy.RUNTIME instructs the JVM to keep the annotation information in memory during execution, allowing it to be accessed via class reflection.',
          difficulty: 'easy'
        },
        {
          question: 'Which keyword is used to declare an annotation in Java?',
          options: ['annotation', 'interface', '@interface', '@annotation'],
          correct: 2,
          explanation: 'Java annotations are declared using the @interface keyword.',
          difficulty: 'easy'
        }
      ],
      interview: [
        {
          question: 'Design a custom annotation @JsonSerialize that marks fields to be serialized by a custom JSON serializer.',
          hint: 'Define target, retention, elements, and reflective lookup.',
          answer: 'Define: @Retention(RetentionPolicy.RUNTIME) @Target(ElementType.FIELD) public @interface JsonSerialize { String name() default ""; }. Processing: Get the class instance, loop through fields via getDeclaredFields(), setAccessible(true), check if field.isAnnotationPresent(JsonSerialize.class). If true, read the annotation\'s name() value; if empty, use field.getName(), then fetch field.get(object) and write it to JSON.'
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collections Framework',
      icon: '📚',
      notes: {
        title: 'Java Collections Internals & Performance',
        points: [
          '<strong>List Interface:</strong> <code>ArrayList</code> is backed by a dynamic resizing array (O(1) search by index, O(N) insertion/deletion). <code>LinkedList</code> is a doubly linked list (O(1) insertion/deletion at pointers, O(N) traversal).',
          '<strong>Set Interface:</strong> <code>HashSet</code> uses a HashMap internally to guarantee uniqueness (O(1) operations). <code>LinkedHashSet</code> maintains insertion order using a doubly linked list. <code>TreeSet</code> stores elements in a Red-Black tree for sorted order (O(log N) operations).',
          '<strong>Map Interface:</strong> <code>HashMap</code> stores key-value pairs (buckets of nodes). <code>LinkedHashMap</code> preserves insertion order. <code>TreeMap</code> keeps keys sorted. <code>ConcurrentHashMap</code> provides thread safety without locking the entire map (uses bucket-level locks and CAS operations).',
          '<strong>HashMap Internals:</strong> Uses <code>hashCode()</code> and <code>equals()</code>. Initial capacity is 16, load factor is 0.75. Bucket collision triggers a linked list. In Java 8+, if list size exceeds 8 and total capacity is 64+, the bucket **treeifies** into a Red-Black tree (improving performance from O(N) to O(log N)).'
        ],
        codeExamples: [
          {
            title: 'HashMap and ConcurrentHashMap usage',
            code: '// Standard HashMap\nMap<String, Integer> map = new HashMap<>();\nmap.put("Apple", 10);\nmap.put("Banana", 20);\n\n// Thread-safe ConcurrentHashMap\nMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();\nconcurrentMap.putIfAbsent("Count", 0);\nconcurrentMap.computeIfPresent("Count", (key, val) -> val + 1);',
            language: 'java'
          }
        ],
        interviewTips: [
          'Understand how HashMap handles collisons: equals() and hashCode() contract. If two keys have the same hash, they go to the same bucket. equals() is then used to find the exact key.',
          'Know the difference between fail-fast (e.g., ArrayList Iterator throws ConcurrentModificationException if structure changes) and fail-safe (e.g., CopyOnWriteArrayList Iterator operates on a copy, avoiding exception).'
        ]
      },
      flashcards: [
        { front: 'Explain the contract between hashCode() and equals().', back: 'If two objects are equal according to equals(), they must return the same hashCode() value. If two objects have the same hashCode(), they are not necessarily equal according to equals() (this is a hash collision).' },
        { front: 'How does HashMap handle collisions internally?', back: 'HashMap uses chaining. Keys with the same hash code are placed in the same bucket. In Java 7, they form a linked list. In Java 8+, if a bucket reaches 8 elements and the map size is 64+, it converts to a Red-Black Tree (O(log N)) to avoid performance degradation.' },
        { front: 'What is the difference between Fail-Fast and Fail-Safe Iterators?', back: 'Fail-fast iterators (e.g., HashMap, ArrayList) throw ConcurrentModificationException if the collection is structurally modified during iteration. Fail-safe/Weakly-consistent iterators (e.g., ConcurrentHashMap, CopyOnWriteArrayList) operate on a clone or snapshot of the collection, avoiding exceptions.' },
        { front: 'What is ConcurrentHashMap and how does it achieve thread safety?', back: 'ConcurrentHashMap is a thread-safe map. In Java 8+, it achieves synchronization by locking individual bucket nodes (using synchronized on the node) and utilizing Compare-And-Swap (CAS) instructions. This allows concurrent reads and writes on different segments, avoiding global lock bottlenecks.' }
      ],
      quiz: [
        {
          question: 'Which Collection class maintains insertion order and allows elements to be accessed by index in O(1) time?',
          options: ['LinkedList', 'ArrayList', 'HashSet', 'LinkedHashMap'],
          correct: 1,
          explanation: 'ArrayList is backed by an array, allowing index-based access in O(1) time. LinkedList has O(N) access time. HashSet and LinkedHashMap do not allow index-based access directly.',
          difficulty: 'easy'
        },
        {
          question: 'In Java 8+, under what conditions is a HashMap bucket converted from a Linked List to a Red-Black Tree?',
          options: ['When bucket size >= 8 and map capacity >= 64', 'When bucket size >= 8, regardless of capacity', 'When map is full', 'When hashCode() returns 0'],
          correct: 0,
          explanation: 'HashMap treeifies a bucket when its size reaches 8 (TREEIFY_THRESHOLD) and the overall capacity is at least 64 (MIN_TREEIFY_CAPACITY). If capacity is less, it resizes the map instead.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Explain how HashMap works internally for put() and get() operations.',
          hint: 'Mention hashing, bucket index calculation, equals(), and node treeification.',
          answer: 'For put(K, V), HashMap hashes the key using K.hashCode() and hashes it again to spread bits. It calculates the bucket index as (n-1) & hash. If the bucket is empty, it inserts a Node. If occupied, it traverses the list/tree: if equals() matches, it overwrites the value; if not, it appends a new node. For get(K), it calculates the bucket index, checks the first node, and if needed, calls equals() on subsequent list/tree nodes to find the matching key.'
        }
      ]
    }
  ]
});
