// Interview Quest - Problem Solving Content Data

window.CATEGORIES.push({
  id: 'problem-solving',
  name: 'Problem Solving',
  icon: '🧩',
  color: '#F43F5E',
  topics: [
    {
      id: 'stream-problems',
      name: 'Stream Problems',
      icon: '🌊',
      notes: {
        title: 'Stream Problems',
        points: [
          '<strong>Second Highest Salary:</strong> Use <code>distinct()</code>, <code>sorted(Comparator.reverseOrder())</code>, and <code>skip(1).findFirst()</code> to extract the second highest value from a list of employees.',
          '<strong>Group By Department:</strong> Use <code>Collectors.groupingBy(Employee::getDepartment)</code> to partition employees into a <code>Map&lt;String, List&lt;Employee&gt;&gt;</code>. Chain with <code>Collectors.counting()</code> or <code>Collectors.averagingDouble()</code> for aggregations.',
          '<strong>Find Duplicates:</strong> Use <code>Collectors.groupingBy(Function.identity(), Collectors.counting())</code> then filter entries where count &gt; 1. Alternatively, track seen elements with a <code>Set</code> and <code>filter(e -&gt; !seen.add(e))</code>.',
          '<strong>Word Frequency Count:</strong> Split a sentence with <code>Arrays.stream(sentence.split(&quot; &quot;))</code> and collect using <code>Collectors.groupingBy(Function.identity(), Collectors.counting())</code> to produce a frequency map.',
          '<strong>Flatten Nested Lists:</strong> Use <code>flatMap(Collection::stream)</code> to convert a <code>List&lt;List&lt;T&gt;&gt;</code> into a single <code>Stream&lt;T&gt;</code>. This is essential for processing hierarchical data structures.',
          '<strong>Custom Collectors:</strong> Build custom collectors with <code>Collector.of(supplier, accumulator, combiner, finisher)</code>. Example: collecting into an immutable list or computing running statistics.',
          '<strong>Parallel Stream Pitfalls:</strong> Avoid shared mutable state, be cautious with <code>forEach</code> ordering, and note that parallel streams use the common ForkJoinPool. Use <code>forEachOrdered()</code> when order matters. Not always faster for small datasets.',
          '<strong>Stream vs Loop Performance:</strong> Streams add overhead from object creation and lambda invocation. Loops are faster for simple operations on small datasets. Streams excel at readability and parallelism for large datasets. Always benchmark with JMH for critical paths.'
        ],
        codeExamples: [
          {
            title: 'Second Highest Salary & Group By Department',
            code: '// Second highest salary\nOptional<Double> secondHighest = employees.stream()\n    .map(Employee::getSalary)\n    .distinct()\n    .sorted(Comparator.reverseOrder())\n    .skip(1)\n    .findFirst();\n\nSystem.out.println(\"Second Highest: \" + secondHighest.orElse(0.0));\n\n// Group employees by department\nMap<String, List<Employee>> byDept = employees.stream()\n    .collect(Collectors.groupingBy(Employee::getDepartment));\n\n// Count per department\nMap<String, Long> countByDept = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.counting()\n    ));\n\n// Average salary per department\nMap<String, Double> avgSalaryByDept = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.averagingDouble(Employee::getSalary)\n    ));',
            language: 'java'
          },
          {
            title: 'Duplicates, Word Frequency & Flatten',
            code: '// Find duplicates using groupingBy\nList<Integer> nums = Arrays.asList(1, 2, 3, 2, 4, 3, 5);\nList<Integer> duplicates = nums.stream()\n    .collect(Collectors.groupingBy(\n        Function.identity(), Collectors.counting()))\n    .entrySet().stream()\n    .filter(e -> e.getValue() > 1)\n    .map(Map.Entry::getKey)\n    .collect(Collectors.toList());\n// Result: [2, 3]\n\n// Word frequency count\nString sentence = \"java stream java is cool stream\";\nMap<String, Long> freq = Arrays.stream(sentence.split(\" \"))\n    .collect(Collectors.groupingBy(\n        Function.identity(), Collectors.counting()));\n// Result: {java=2, stream=2, is=1, cool=1}\n\n// Flatten nested lists\nList<List<String>> nested = Arrays.asList(\n    Arrays.asList(\"a\", \"b\"),\n    Arrays.asList(\"c\", \"d\"),\n    Arrays.asList(\"e\"));\nList<String> flat = nested.stream()\n    .flatMap(Collection::stream)\n    .collect(Collectors.toList());\n// Result: [a, b, c, d, e]',
            language: 'java'
          },
          {
            title: 'Custom Collector Example',
            code: '// Custom collector: collect to unmodifiable list\nCollector<String, List<String>, List<String>> toUnmodifiable =\n    Collector.of(\n        ArrayList::new,              // supplier\n        List::add,                   // accumulator\n        (left, right) -> {           // combiner\n            left.addAll(right);\n            return left;\n        },\n        Collections::unmodifiableList // finisher\n    );\n\nList<String> result = Stream.of(\"a\", \"b\", \"c\")\n    .collect(toUnmodifiable);\n// result is an unmodifiable list: [a, b, c]\n\n// Partition employees by salary threshold\nMap<Boolean, List<Employee>> partitioned = employees.stream()\n    .collect(Collectors.partitioningBy(\n        e -> e.getSalary() > 50000\n    ));\n// true -> high earners, false -> others',
            language: 'java'
          }
        ],
        interviewTips: [
          'Always handle edge cases: empty streams, null values, and single-element collections. Use Optional properly with orElse() or orElseThrow().',
          'Know when to use Collectors.toMap() vs groupingBy() — toMap throws on duplicate keys unless you provide a merge function.',
          'Be ready to discuss when NOT to use streams — mutable state operations, simple iterations, and performance-critical code may be better with loops.'
        ]
      },
      flashcards: [
        {
          front: 'How do you find the second highest salary from a list of employees using streams?',
          back: 'employees.stream()\n    .map(Employee::getSalary)\n    .distinct()\n    .sorted(Comparator.reverseOrder())\n    .skip(1)\n    .findFirst();\n\nKey: distinct() removes duplicates, sorted in reverse gives descending order, skip(1) skips the first (highest), findFirst() returns the second.'
        },
        {
          front: 'How do you group employees by department and get the count per department?',
          back: 'Map<String, Long> countByDept = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.counting()\n    ));\n\nThe downstream collector (Collectors.counting()) is applied to each group.'
        },
        {
          front: 'How do you find duplicate elements in a list using streams?',
          back: 'Method 1 — Using groupingBy:\nnums.stream()\n    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))\n    .entrySet().stream()\n    .filter(e -> e.getValue() > 1)\n    .map(Map.Entry::getKey)\n    .collect(Collectors.toList());\n\nMethod 2 — Using Set:\nSet<Integer> seen = new HashSet<>();\nnums.stream().filter(e -> !seen.add(e)).collect(Collectors.toSet());'
        },
        {
          front: 'How do you count word frequency in a sentence using streams?',
          back: 'Map<String, Long> freq = Arrays.stream(sentence.split(\" \"))\n    .collect(Collectors.groupingBy(\n        Function.identity(),\n        Collectors.counting()\n    ));\n\nFunction.identity() returns the element itself as the key.'
        },
        {
          front: 'How do you flatten a List<List<T>> into a List<T> using streams?',
          back: 'List<T> flat = nestedList.stream()\n    .flatMap(Collection::stream)\n    .collect(Collectors.toList());\n\nflatMap() transforms each inner list into a stream and merges all streams into one.'
        },
        {
          front: 'What are the four components of a custom Collector?',
          back: '1. Supplier — creates a new mutable result container\n2. Accumulator — adds an element to the container\n3. Combiner — merges two partial results (for parallel)\n4. Finisher — transforms the container into the final result\n\nCollector.of(supplier, accumulator, combiner, finisher)'
        },
        {
          front: 'What are the main pitfalls of using parallel streams?',
          back: '1. Shared mutable state leads to race conditions\n2. Uses common ForkJoinPool (shared with other tasks)\n3. forEach does NOT guarantee order — use forEachOrdered()\n4. Overhead of thread management can make small datasets slower\n5. Not all operations benefit — stateful operations like sorted() reduce parallelism'
        },
        {
          front: 'When should you prefer a traditional loop over a stream?',
          back: '1. When you need to modify local variables (streams require effectively final)\n2. When performance is critical for small datasets (streams have overhead)\n3. When you need break/continue/return control flow\n4. When the operation involves checked exceptions\n5. When readability of simple iteration is clearer'
        }
      ],
      quiz: [
        {
          question: 'What is the output of the following code?\n\nList<Integer> nums = Arrays.asList(5, 3, 8, 3, 5, 1);\nlong count = nums.stream().distinct().count();\nSystem.out.println(count);',
          options: ['6', '4', '3', '5'],
          correct: 1,
          explanation: 'distinct() removes duplicates. The unique elements are {5, 3, 8, 1}, so count is 4.',
          difficulty: 'easy'
        },
        {
          question: 'What is the output?\n\nList<String> words = Arrays.asList("hello", "world", "hi");\nString result = words.stream()\n    .filter(w -> w.startsWith("h"))\n    .map(String::toUpperCase)\n    .collect(Collectors.joining(", "));\nSystem.out.println(result);',
          options: ['HELLO, HI', 'hello, hi', 'HELLO, WORLD, HI', 'H, H'],
          correct: 0,
          explanation: 'filter keeps "hello" and "hi" (start with "h"). map converts to uppercase → "HELLO", "HI". joining(", ") concatenates with comma separator.',
          difficulty: 'easy'
        },
        {
          question: 'What does the following code return?\n\nList<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\nOptional<Integer> result = nums.stream()\n    .reduce((a, b) -> a * b);\nSystem.out.println(result.get());',
          options: ['15', '120', '5', '24'],
          correct: 1,
          explanation: 'reduce with multiplication: 1*2=2, 2*3=6, 6*4=24, 24*5=120. The result is 120.',
          difficulty: 'medium'
        },
        {
          question: 'What is the output of the following stream operation?\n\nMap<Boolean, List<Integer>> result = Arrays.asList(1, 2, 3, 4, 5, 6)\n    .stream()\n    .collect(Collectors.partitioningBy(n -> n % 2 == 0));\nSystem.out.println(result.get(true).size() + \", \" + result.get(false).size());',
          options: ['3, 3', '2, 4', '4, 2', '6, 0'],
          correct: 0,
          explanation: 'partitioningBy splits into two groups. Even numbers: {2, 4, 6} → size 3. Odd numbers: {1, 3, 5} → size 3. Output: "3, 3".',
          difficulty: 'medium'
        },
        {
          question: 'What happens when the following code is executed?\n\nList<String> list = Arrays.asList("a", "b", "a", "c");\nMap<String, Long> map = list.stream()\n    .collect(Collectors.toMap(\n        Function.identity(),\n        s -> 1L,\n        Long::sum\n    ));\nSystem.out.println(map);',
          options: [
            'Throws IllegalStateException due to duplicate keys',
            '{a=2, b=1, c=1}',
            '{a=1, b=1, c=1}',
            'Compilation error'
          ],
          correct: 1,
          explanation: 'The third argument to toMap is a merge function (Long::sum). When duplicate key "a" is found, the values are summed: 1 + 1 = 2. Without the merge function, it would throw IllegalStateException.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Write a stream pipeline to find the employee with the highest salary in each department.',
          hint: 'Think about Collectors.groupingBy with a downstream collector that finds the max.',
          answer: 'Map<String, Optional<Employee>> highestByDept = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary))\n    ));\n\n// To get non-Optional values:\nMap<String, Employee> result = employees.stream()\n    .collect(Collectors.groupingBy(\n        Employee::getDepartment,\n        Collectors.collectingAndThen(\n            Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)),\n            opt -> opt.orElse(null)\n        )\n    ));\n\nThis uses groupingBy to partition by department, then maxBy as the downstream collector to find the highest-paid employee in each group. collectingAndThen can unwrap the Optional.',
          difficulty: 'medium',
          followUp: 'How would you find the top 3 earners across all departments?'
        },
        {
          question: 'Given a list of strings, write a stream to find the first non-repeated character across all strings combined.',
          hint: 'Think about flatMapToInt to get individual characters, then use LinkedHashMap to preserve insertion order.',
          answer: '// Given: List<String> words = Arrays.asList("hello", "world");\nOptional<Character> firstNonRepeated = words.stream()\n    .flatMapToInt(String::chars)\n    .mapToObj(c -> (char) c)\n    .collect(Collectors.groupingBy(\n        Function.identity(),\n        LinkedHashMap::new,\n        Collectors.counting()\n    ))\n    .entrySet().stream()\n    .filter(e -> e.getValue() == 1)\n    .map(Map.Entry::getKey)\n    .findFirst();\n\nSystem.out.println(firstNonRepeated.orElse(\'\\0\'));\n\nKey points:\n1. flatMapToInt(String::chars) breaks strings into int stream of chars\n2. LinkedHashMap preserves insertion order\n3. groupingBy with counting gives frequency\n4. filter for count == 1 finds non-repeated\n5. findFirst returns the first such character',
          difficulty: 'hard',
          followUp: 'What if you needed to find the first non-repeated character in each string individually?'
        },
        {
          question: 'Write a stream to transform a list of transactions into a summary showing total amount per category, sorted by total descending.',
          hint: 'Combine groupingBy with summingDouble, then sort the entries.',
          answer: '// Assuming: class Transaction { String category; double amount; }\nList<Map.Entry<String, Double>> summary = transactions.stream()\n    .collect(Collectors.groupingBy(\n        Transaction::getCategory,\n        Collectors.summingDouble(Transaction::getAmount)\n    ))\n    .entrySet().stream()\n    .sorted(Map.Entry.<String, Double>comparingByValue().reversed())\n    .collect(Collectors.toList());\n\n// Print formatted summary\nsummary.forEach(e ->\n    System.out.printf(\"%-15s $%,.2f%n\", e.getKey(), e.getValue())\n);\n\nSteps:\n1. groupingBy(category) with summingDouble downstream\n2. Stream the entrySet of the resulting map\n3. Sort by value in descending order\n4. Collect to a list to preserve the sorted order',
          difficulty: 'medium',
          followUp: 'How would you add a filter to only include categories with total above a threshold?'
        },
        {
          question: 'Write a stream pipeline to find all pairs of numbers from a list that sum to a given target.',
          hint: 'Consider using a nested stream or a Set-based approach for O(n) lookup.',
          answer: '// Given: List<Integer> nums, int target\nSet<Integer> seen = new HashSet<>();\nList<int[]> pairs = nums.stream()\n    .filter(n -> {\n        boolean found = seen.contains(target - n);\n        seen.add(n);\n        return found;\n    })\n    .map(n -> new int[]{target - n, n})\n    .collect(Collectors.toList());\n\npairs.forEach(p ->\n    System.out.println(Arrays.toString(p)));\n\n// Alternative pure stream approach (O(n^2)):\nList<int[]> pairs2 = IntStream.range(0, nums.size())\n    .boxed()\n    .flatMap(i -> IntStream.range(i + 1, nums.size())\n        .filter(j -> nums.get(i) + nums.get(j) == target)\n        .mapToObj(j -> new int[]{nums.get(i), nums.get(j)}))\n    .collect(Collectors.toList());\n\nNote: The first approach uses shared mutable state (Set) which is NOT safe with parallel streams. The second approach is pure but O(n^2).',
          difficulty: 'hard',
          followUp: 'Why is the Set-based approach not safe with parallel streams? How would you fix it?'
        }
      ]
    },
    {
      id: 'dsa',
      name: 'DSA Problems',
      icon: '🧮',
      notes: {
        title: 'DSA Problems',
        points: [
          '<strong>Two-Pointer Technique:</strong> Use two pointers moving inward from both ends (or one slow, one fast) to solve problems in O(n). Common applications: pair sum in sorted array, removing duplicates in-place, container with most water, and palindrome checking.',
          '<strong>Sliding Window Pattern:</strong> Maintain a window of elements and slide it across the array. Fixed-size window for max sum subarray; variable-size for smallest subarray with sum ≥ target. Use a HashMap for character frequency in substring problems.',
          '<strong>Stack/Queue Usage Patterns:</strong> Stack for matching parentheses, expression evaluation, next greater element, and monotonic stack problems. Queue for BFS traversal, task scheduling, and sliding window maximum (using Deque).',
          '<strong>Binary Search Variations:</strong> Beyond simple search: find first/last occurrence, search in rotated array, find peak element, and search in 2D matrix. Key insight: binary search works whenever the search space has a monotonic property.',
          '<strong>Tree Traversals (BFS, DFS):</strong> DFS includes pre-order (root-left-right), in-order (left-root-right for BST sorted output), and post-order (left-right-root). BFS uses a queue for level-order traversal. Time: O(n), Space: O(h) for DFS, O(w) for BFS.',
          '<strong>Graph Algorithms Basics:</strong> Represent graphs using adjacency list (<code>Map&lt;Integer, List&lt;Integer&gt;&gt;</code>). BFS for shortest path in unweighted graphs. DFS for cycle detection, topological sort. Dijkstra for weighted shortest path.',
          '<strong>Dynamic Programming Approach:</strong> Identify overlapping subproblems and optimal substructure. Start with recursion → add memoization (top-down) → convert to tabulation (bottom-up). Classic problems: Fibonacci, coin change, longest common subsequence, knapsack.',
          '<strong>Greedy Algorithm Patterns:</strong> Make locally optimal choices hoping for global optimum. Works when the greedy choice property holds. Classic examples: activity selection, Huffman coding, fractional knapsack, interval scheduling. Always verify greedy works before using.'
        ],
        codeExamples: [
          {
            title: 'Two-Pointer: Two Sum (Sorted Array)',
            code: 'public int[] twoSumSorted(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int sum = nums[left] + nums[right];\n        if (sum == target) {\n            return new int[]{left, right};\n        } else if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return new int[]{-1, -1}; // not found\n}\n\n// Sliding Window: Max sum subarray of size k\npublic int maxSumSubarray(int[] nums, int k) {\n    int windowSum = 0, maxSum = Integer.MIN_VALUE;\n    for (int i = 0; i < nums.length; i++) {\n        windowSum += nums[i];\n        if (i >= k - 1) {\n            maxSum = Math.max(maxSum, windowSum);\n            windowSum -= nums[i - k + 1];\n        }\n    }\n    return maxSum;\n}',
            language: 'java'
          },
          {
            title: 'Binary Search & Valid Parentheses (Stack)',
            code: '// Binary Search: Find first occurrence\npublic int firstOccurrence(int[] nums, int target) {\n    int left = 0, right = nums.length - 1, result = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) {\n            result = mid;\n            right = mid - 1; // keep searching left\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return result;\n}\n\n// Valid Parentheses using Stack\npublic boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == \'(\') stack.push(\')\');\n        else if (c == \'{\') stack.push(\'}\');\n        else if (c == \'[\') stack.push(\']\');\n        else if (stack.isEmpty() || stack.pop() != c) {\n            return false;\n        }\n    }\n    return stack.isEmpty();\n}',
            language: 'java'
          },
          {
            title: 'BFS Level Order Traversal & DFS',
            code: '// BFS Level Order Traversal\npublic List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        List<Integer> level = new ArrayList<>();\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            level.add(node.val);\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        result.add(level);\n    }\n    return result;\n}\n\n// DFS Inorder Traversal (Iterative)\npublic List<Integer> inorderTraversal(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    Stack<TreeNode> stack = new Stack<>();\n    TreeNode curr = root;\n    while (curr != null || !stack.isEmpty()) {\n        while (curr != null) {\n            stack.push(curr);\n            curr = curr.left;\n        }\n        curr = stack.pop();\n        result.add(curr.val);\n        curr = curr.right;\n    }\n    return result;\n}',
            language: 'java'
          }
        ],
        interviewTips: [
          'Always clarify constraints first: input size, value ranges, sorted or unsorted, duplicates allowed? This determines which pattern to apply.',
          'Start with brute force, then optimize. Interviewers want to see your thought process — state the brute force time complexity and explain why a better approach is needed.',
          'Practice recognizing patterns: sorted array → two pointers or binary search; substring/subarray → sliding window; matching/nesting → stack; shortest path → BFS; optimization → DP or greedy.'
        ]
      },
      flashcards: [
        {
          front: 'What is the time complexity of Two Sum using a HashMap approach?',
          back: 'Time: O(n) — single pass through the array, each lookup/insert in HashMap is O(1) average.\nSpace: O(n) — HashMap stores up to n elements.\n\nApproach: For each element, check if (target - element) exists in the map. If yes, return indices. If no, add current element to map.'
        },
        {
          front: 'What is the Sliding Window pattern and when do you use it?',
          back: 'Sliding Window maintains a subset of elements (a "window") and slides it across the data structure.\n\nUse when:\n- Finding max/min sum subarray of size k (fixed window)\n- Smallest subarray with sum ≥ S (variable window)\n- Longest substring without repeating chars (variable window)\n\nTime: O(n) since each element is visited at most twice.'
        },
        {
          front: 'What is the time complexity of reversing a linked list?',
          back: 'Time: O(n) — visit each node exactly once.\nSpace: O(1) — only three pointers used (prev, curr, next).\n\nIterative approach:\nprev = null, curr = head\nwhile curr != null:\n  next = curr.next\n  curr.next = prev\n  prev = curr\n  curr = next\nreturn prev'
        },
        {
          front: 'What are the three types of DFS tree traversals and their use cases?',
          back: 'Pre-order (Root → Left → Right): Copy/serialize a tree, prefix expression.\n\nIn-order (Left → Root → Right): BST gives sorted output. Used for BST validation.\n\nPost-order (Left → Right → Root): Delete a tree, postfix expression, calculate directory sizes.\n\nAll are O(n) time, O(h) space where h = tree height.'
        },
        {
          front: 'What is the difference between BFS and DFS for graph traversal?',
          back: 'BFS (Breadth-First):\n- Uses Queue, explores level by level\n- Finds shortest path in unweighted graphs\n- Space: O(V), Time: O(V+E)\n\nDFS (Depth-First):\n- Uses Stack (or recursion), explores as deep as possible\n- Used for: cycle detection, topological sort, connected components\n- Space: O(V), Time: O(V+E)\n\nBFS = shortest path; DFS = exhaustive exploration.'
        },
        {
          front: 'What are the key steps to solve a Dynamic Programming problem?',
          back: '1. Identify if it has overlapping subproblems and optimal substructure\n2. Define the state — what variables describe a subproblem?\n3. Write the recurrence relation\n4. Choose approach:\n   - Top-down: recursion + memoization (HashMap/array)\n   - Bottom-up: iterative tabulation (fill table from base case)\n5. Optimize space if possible (often can reduce from O(n²) to O(n))\n\nClassic examples: Fibonacci, Coin Change, LCS, Knapsack'
        },
        {
          front: 'How does Binary Search work in a rotated sorted array?',
          back: 'Key insight: At least one half is always sorted.\n\n1. Find mid. Check which half is sorted.\n2. If left half is sorted (nums[left] <= nums[mid]):\n   - If target is in [left, mid), search left\n   - Else search right\n3. If right half is sorted:\n   - If target is in (mid, right], search right\n   - Else search left\n\nTime: O(log n), Space: O(1)'
        },
        {
          front: 'When does a Greedy algorithm work vs when do you need Dynamic Programming?',
          back: 'Greedy works when:\n- Local optimal choice leads to global optimal (greedy choice property)\n- No need to reconsider past choices\n- Examples: Activity selection, Huffman coding, Dijkstra\n\nDP needed when:\n- Choices affect future decisions\n- Need to explore multiple paths\n- Overlapping subproblems exist\n- Examples: 0/1 Knapsack, Edit Distance, LCS\n\nRule: If greedy gives wrong answer on a counterexample, use DP.'
        }
      ],
      quiz: [
        {
          question: 'What is the time complexity of finding an element in a balanced Binary Search Tree?',
          options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
          correct: 1,
          explanation: 'In a balanced BST, the height is log(n). Each comparison eliminates half the tree, giving O(log n) time complexity. An unbalanced BST could degrade to O(n).',
          difficulty: 'easy'
        },
        {
          question: 'Which data structure is most appropriate for checking if a string of brackets is balanced?',
          options: ['Queue', 'Stack', 'HashMap', 'Array'],
          correct: 1,
          explanation: 'A Stack follows LIFO (Last In, First Out) which naturally matches the nesting behavior of brackets — the most recently opened bracket should be closed first.',
          difficulty: 'easy'
        },
        {
          question: 'What is the output of the following code?\n\nint[] arr = {2, 7, 11, 15};\nint target = 9;\nMap<Integer, Integer> map = new HashMap<>();\nfor (int i = 0; i < arr.length; i++) {\n    int complement = target - arr[i];\n    if (map.containsKey(complement)) {\n        System.out.println(map.get(complement) + \", \" + i);\n        break;\n    }\n    map.put(arr[i], i);\n}',
          options: ['0, 1', '1, 2', '0, 3', '2, 3'],
          correct: 0,
          explanation: 'i=0: complement=7, not in map. Put {2:0}. i=1: complement=2, found in map! Output: map.get(2)=0, i=1 → "0, 1". Elements 2+7=9=target.',
          difficulty: 'medium'
        },
        {
          question: 'In the Merge Intervals problem, after sorting intervals by start time, what condition determines that two intervals overlap?',
          options: [
            'current.start <= previous.end',
            'current.start < previous.start',
            'current.end > previous.end',
            'current.start == previous.end'
          ],
          correct: 0,
          explanation: 'After sorting by start time, two consecutive intervals overlap if the current interval\'s start is less than or equal to the previous interval\'s end. When they overlap, merge by taking max of both ends.',
          difficulty: 'medium'
        },
        {
          question: 'What is the time complexity of the bottom-up Dynamic Programming solution for the Coin Change problem (finding minimum coins to make amount n with k coin denominations)?',
          options: ['O(n * k)', 'O(n²)', 'O(2ⁿ)', 'O(n log k)'],
          correct: 0,
          explanation: 'The DP table has n+1 entries (amounts 0 to n). For each amount, we iterate through all k coin denominations. Total: O(n * k). Space: O(n) for the DP array.',
          difficulty: 'hard'
        }
      ],
      interview: [
        {
          question: 'Solve the Two Sum problem: Given an array of integers and a target, return the indices of two numbers that add up to the target.',
          hint: 'Use a HashMap to store values and their indices for O(1) lookup of the complement.',
          answer: 'public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[]{map.get(complement), i};\n        }\n        map.put(nums[i], i);\n    }\n    throw new IllegalArgumentException(\"No two sum solution\");\n}\n\nTime: O(n) — single pass through array.\nSpace: O(n) — HashMap stores up to n elements.\n\nFor each number, compute its complement (target - num). If the complement already exists in the map, we found our pair. Otherwise, store the current number with its index.',
          difficulty: 'easy',
          followUp: 'What if the array is sorted? Can you solve it in O(1) space?'
        },
        {
          question: 'Reverse a singly linked list iteratively.',
          hint: 'Use three pointers: prev, curr, and next. Change the direction of each link as you traverse.',
          answer: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next; // save next\n        curr.next = prev;          // reverse link\n        prev = curr;               // advance prev\n        curr = next;               // advance curr\n    }\n    return prev; // prev is the new head\n}\n\nTime: O(n) — visit each node once.\nSpace: O(1) — only three pointers.\n\nStep by step for [1 → 2 → 3]:\n1. prev=null, curr=1: 1→null, prev=1, curr=2\n2. prev=1, curr=2: 2→1→null, prev=2, curr=3\n3. prev=2, curr=3: 3→2→1→null, prev=3, curr=null\nReturn prev (node 3) → [3 → 2 → 1]',
          difficulty: 'easy',
          followUp: 'Can you solve it recursively? What would the time and space complexity be?'
        },
        {
          question: 'Implement a solution for Valid Parentheses: Given a string containing just (, ), {, }, [, ], determine if the input is valid.',
          hint: 'Use a stack — push the expected closing bracket when you see an opening one.',
          answer: 'public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == \'(\') stack.push(\')\');\n        else if (c == \'{\') stack.push(\'}\');\n        else if (c == \'[\') stack.push(\']\');\n        else if (stack.isEmpty() || stack.pop() != c) {\n            return false;\n        }\n    }\n    return stack.isEmpty();\n}\n\nTime: O(n) — single pass through string.\nSpace: O(n) — stack stores up to n/2 elements.\n\nKey insight: Push the EXPECTED closing bracket. When you encounter a closing bracket, pop and compare directly. If they don\'t match or stack is empty, it\'s invalid. At the end, stack must be empty (all brackets matched).',
          difficulty: 'easy',
          followUp: 'How would you handle the case where the string also contains other characters that should be ignored?'
        },
        {
          question: 'Implement Binary Search to find a target in a sorted array. Handle both iterative and recursive approaches.',
          hint: 'Use left and right pointers. Calculate mid as left + (right - left) / 2 to avoid integer overflow.',
          answer: '// Iterative Binary Search\npublic int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2; // avoid overflow\n        if (nums[mid] == target) {\n            return mid;\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1; // not found\n}\n\n// Recursive Binary Search\npublic int binarySearchRecursive(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    else if (nums[mid] < target)\n        return binarySearchRecursive(nums, target, mid + 1, right);\n    else\n        return binarySearchRecursive(nums, target, left, mid - 1);\n}\n\nTime: O(log n) — halving search space each step.\nSpace: O(1) iterative, O(log n) recursive (call stack).\n\nUse left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow when left and right are large.',
          difficulty: 'easy',
          followUp: 'How would you modify this to find the first occurrence of a duplicate element?'
        },
        {
          question: 'Solve the Merge Intervals problem: Given an array of intervals, merge all overlapping intervals.',
          hint: 'Sort by start time first. Then iterate and compare current interval with the last merged interval.',
          answer: 'public int[][] merge(int[][] intervals) {\n    if (intervals.length <= 1) return intervals;\n\n    // Sort by start time\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n\n    List<int[]> merged = new ArrayList<>();\n    merged.add(intervals[0]);\n\n    for (int i = 1; i < intervals.length; i++) {\n        int[] last = merged.get(merged.size() - 1);\n        int[] current = intervals[i];\n\n        if (current[0] <= last[1]) {\n            // Overlapping — merge by extending end\n            last[1] = Math.max(last[1], current[1]);\n        } else {\n            // Non-overlapping — add as new interval\n            merged.add(current);\n        }\n    }\n\n    return merged.toArray(new int[merged.size()][]);\n}\n\nTime: O(n log n) — dominated by sorting.\nSpace: O(n) — output list.\n\nExample: [[1,3],[2,6],[8,10],[15,18]]\nAfter sort: same (already sorted)\nMerge [1,3] & [2,6] → [1,6] (2 <= 3)\n[8,10] doesn\'t overlap with [1,6] → add\n[15,18] doesn\'t overlap → add\nResult: [[1,6],[8,10],[15,18]]',
          difficulty: 'medium',
          followUp: 'How would you insert a new interval into a list of non-overlapping sorted intervals and merge if necessary?'
        }
      ]
    }
  ]
});

window.DAILY_CHALLENGES_DB = {
  stream: {
    easy: [
      {
        id: 'str_e1',
        title: 'Filter & Square Even Numbers',
        description: 'Given a list of integers, write a Java Stream pipeline to filter out all odd numbers, square the remaining even numbers, and collect them into a List.',
        initialCode: 'public List<Integer> squareEvens(List<Integer> numbers) {\n    return numbers.stream()\n        // TODO: Filter evens, square them, and collect\n        .collect(Collectors.toList());\n}',
        solutionCode: 'public List<Integer> squareEvens(List<Integer> numbers) {\n    return numbers.stream()\n        .filter(n -> n % 2 == 0)\n        .map(n -> n * n)\n        .collect(Collectors.toList());\n}',
        explanation: '1. `filter(n -> n % 2 == 0)` processes elements and retains only even values.\n2. `map(n -> n * n)` takes each even integer and multiplies it by itself.\n3. `collect(Collectors.toList())` saves the stream results back into a new List.'
      },
      {
        id: 'str_e2',
        title: 'Names to UpperCase and Join',
        description: 'Given a list of names, filter out names that have a length less than 4, convert the remaining names to uppercase, and join them with a comma and a space (", ").',
        initialCode: 'public String formatNames(List<String> names) {\n    return names.stream()\n        // TODO: Filter, uppercase, and join with ", "\n        .collect(Collectors.joining());\n}',
        solutionCode: 'public String formatNames(List<String> names) {\n    return names.stream()\n        .filter(name -> name.length() >= 4)\n        .map(String::toUpperCase)\n        .collect(Collectors.joining(", "));\n}',
        explanation: 'We filter using `length() >= 4`, map names using method reference `String::toUpperCase`, and collect with `Collectors.joining(", ")` to concatenate elements with the comma delimiter.'
      },
      {
        id: 'str_e3',
        title: 'Find Max Value',
        description: 'Given a list of Double values, find the maximum value. If the list is empty, return 0.0.',
        initialCode: 'public Double findMax(List<Double> values) {\n    return values.stream()\n        // TODO: Find max value or return 0.0\n        .orElse(0.0);\n}',
        solutionCode: 'public Double findMax(List<Double> values) {\n    return values.stream()\n        .mapToDouble(Double::doubleValue)\n        .max()\n        .orElse(0.0);\n}',
        explanation: 'We map the stream to a primitive `DoubleStream` via `mapToDouble()`, invoke `.max()` which returns an `OptionalDouble`, and use `.orElse(0.0)` to gracefully handle empty streams.'
      },
      {
        id: 'str_e4',
        title: 'Filter Non-Empty Strings',
        description: 'Given a list of strings, count the number of non-empty strings.',
        initialCode: 'public long countNonEmpty(List<String> list) {\n    return list.stream()\n        // TODO: Filter non-empty and count\n        .count();\n}',
        solutionCode: 'public long countNonEmpty(List<String> list) {\n    return list.stream()\n        .filter(s -> s != null && !s.trim().isEmpty())\n        .count();\n}',
        explanation: 'We filter out null and empty/whitespace strings using `s != null && !s.trim().isEmpty()`, and then use the terminal operation `count()` to get the result.'
      }
    ],
    medium: [
      {
        id: 'str_m1',
        title: 'Group and Count Word Frequency',
        description: 'Given a string representing a paragraph, split it into words by space, count the frequency of each word (case-insensitive), and return a `Map<String, Long>`.',
        initialCode: 'public Map<String, Long> wordFreq(String paragraph) {\n    return Arrays.stream(paragraph.toLowerCase().split("\\\\s+"))\n        // TODO: Group by word and count\n        .collect(Collectors.toMap(k -> k, v -> 1L));\n}',
        solutionCode: 'public Map<String, Long> wordFreq(String paragraph) {\n    return Arrays.stream(paragraph.toLowerCase().split("\\\\s+"))\n        .filter(w -> !w.isEmpty())\n        .collect(Collectors.groupingBy(\n            Function.identity(),\n            Collectors.counting()\n        ));\n}',
        explanation: 'We use `groupingBy(Function.identity())` to group the words by themselves, and pass the downstream collector `Collectors.counting()` to aggregate the counts in each group.'
      },
      {
        id: 'str_m2',
        title: 'Partition Employees by Salary',
        description: 'Given a list of Employees, partition them into high earners (salary > 80,000) and others, returning a `Map<Boolean, List<Employee>>`.',
        initialCode: 'public Map<Boolean, List<Employee>> partitionBySalary(List<Employee> employees) {\n    return employees.stream()\n        // TODO: Partition by salary > 80,000\n        .collect(Collectors.partitioningBy(e -> true));\n}',
        solutionCode: 'public Map<Boolean, List<Employee>> partitionBySalary(List<Employee> employees) {\n    return employees.stream()\n        .collect(Collectors.partitioningBy(\n            e -> e.getSalary() > 80000\n        ));\n}',
        explanation: '`Collectors.partitioningBy` is a special case of `groupingBy` that accepts a predicate and splits elements into a Map with keys `true` and `false`.'
      },
      {
        id: 'str_m3',
        title: 'Average Age by Country',
        description: 'Given a list of Persons, calculate the average age of persons in each country, returning a `Map<String, Double>`.',
        initialCode: 'public Map<String, Double> avgAgeByCountry(List<Person> people) {\n    return people.stream()\n        // TODO: Group by country, average age\n        .collect(Collectors.toMap(Person::getCountry, p -> 0.0));\n}',
        solutionCode: 'public Map<String, Double> avgAgeByCountry(List<Person> people) {\n    return people.stream()\n        .collect(Collectors.groupingBy(\n            Person::getCountry,\n            Collectors.averagingInt(Person::getAge)\n        ));\n}',
        explanation: 'We group by `Person::getCountry` and use the downstream collector `Collectors.averagingInt(Person::getAge)` to automatically calculate the average age in each group.'
      },
      {
        id: 'str_m4',
        title: 'Flatten and Filter List of Lists',
        description: 'Given a list of lists of strings, flatten them into a single list of strings, keeping only those that start with "J" and collecting to a List.',
        initialCode: 'public List<String> flattenAndFilter(List<List<String>> nested) {\n    return nested.stream()\n        // TODO: Flatten, filter startsWith "J", collect\n        .collect(Collectors.toList());\n}',
        solutionCode: 'public List<String> flattenAndFilter(List<List<String>> nested) {\n    return nested.stream()\n        .flatMap(Collection::stream)\n        .filter(s -> s.startsWith("J"))\n        .collect(Collectors.toList());\n}',
        explanation: '`flatMap(Collection::stream)` converts each list into a stream and flattens them into a single stream. Then `filter` and `collect` finish the pipeline.'
      }
    ],
    hard: [
      {
        id: 'str_h1',
        title: 'Highest Paid Employee per Department',
        description: 'Given a list of Employees, find the highest-paid employee in each department. Return a `Map<String, Employee>`.',
        initialCode: 'public Map<String, Employee> topEarners(List<Employee> employees) {\n    return employees.stream()\n        // TODO: Group by department and find max salary employee\n        .collect(Collectors.toMap(Employee::getDept, e -> e));\n}',
        solutionCode: 'public Map<String, Employee> topEarners(List<Employee> employees) {\n    return employees.stream()\n        .collect(Collectors.groupingBy(\n            Employee::getDepartment,\n            Collectors.collectingAndThen(\n                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)),\n                opt -> opt.orElse(null)\n            )\n        ));\n}',
        explanation: 'We group by department. We use `maxBy` to find the employee with max salary. Since `maxBy` returns an `Optional`, we wrap it in `collectingAndThen` to extract the employee or return null.'
      },
      {
        id: 'str_h2',
        title: 'First Non-Repeated Character',
        description: 'Given a string, find the first non-repeated character in O(n) time using Java Streams. If none, return Optional.empty().',
        initialCode: 'public Optional<Character> firstNonRepeat(String str) {\n    return str.chars()\n        // TODO: Stream characters, count frequency, find first with count == 1\n        .mapToObj(c -> (char)c)\n        .findFirst();\n}',
        solutionCode: 'public Optional<Character> firstNonRepeat(String str) {\n    Map<Character, Long> freq = str.chars()\n        .mapToObj(c -> (char) c)\n        .collect(Collectors.groupingBy(\n            Function.identity(),\n            LinkedHashMap::new,\n            Collectors.counting()\n        ));\n        \n    return freq.entrySet().stream()\n        .filter(entry -> entry.getValue() == 1)\n        .map(Map.Entry::getKey)\n        .findFirst();\n}',
        explanation: '1. `str.chars().mapToObj(...)` converts the int stream into Character objects.\n2. We collect into a `LinkedHashMap` to preserve character insertion order, counting frequencies.\n3. We stream the map entries, filter for value == 1, and return the key of the first match.'
      },
      {
        id: 'str_h3',
        title: 'Parallel Stream Transaction Statistics',
        description: 'Given a large list of Transactions, write a thread-safe parallel stream query to compute the total, average, and maximum amount for category "INVESTMENT". Return a DoubleSummaryStatistics object.',
        initialCode: 'public DoubleSummaryStatistics getStats(List<Transaction> txs) {\n    return txs.parallelStream()\n        // TODO: Filter category, map to double, get statistics\n        .summaryStatistics();\n}',
        solutionCode: 'public DoubleSummaryStatistics getStats(List<Transaction> txs) {\n    return txs.parallelStream()\n        .filter(t -> "INVESTMENT".equals(t.getCategory()))\n        .mapToDouble(Transaction::getAmount)\n        .summaryStatistics();\n}',
        explanation: 'Using `.parallelStream()` speeds up execution for large datasets. `mapToDouble()` allows calling `.summaryStatistics()` which aggregates count, sum, min, average, and max in a single thread-safe pass.'
      },
      {
        id: 'str_h4',
        title: 'Custom Collectors: LinkedHashSet',
        description: 'Write a custom Collector that collects elements of a stream into an unmodifiable LinkedHashSet to keep elements unique, ordered, and immutable.',
        initialCode: 'public <T> Set<T> collectToLinkedHashSet(Stream<T> stream) {\n    return stream.collect(\n        // TODO: Build a custom collector for unmodifiable LinkedHashSet\n        Collectors.toSet()\n    );\n}',
        solutionCode: 'public <T> Set<T> collectToLinkedHashSet(Stream<T> stream) {\n    return stream.collect(Collector.of(\n        LinkedHashSet::new,       // supplier\n        Set::add,                 // accumulator\n        (left, right) -> {        // combiner\n            left.addAll(right);\n            return left;\n        },\n        Collections::unmodifiableSet // finisher\n    ));\n}',
        explanation: 'We use `Collector.of` by providing:\n1. A supplier `LinkedHashSet::new` for unique ordered set creation.\n2. Accumulator `Set::add` to insert elements.\n3. Combiner `addAll` to merge sets for parallel execution.\n4. Finisher `Collections::unmodifiableSet` to lock modification.'
      }
    ]
  },
  dsa: {
    easy: [
      {
        id: 'dsa_e1',
        title: 'Reverse String in Place',
        description: 'Write a function that reverses an array of characters in place. Do not allocate extra space; use O(1) extra memory.',
        initialCode: 'public void reverseString(char[] s) {\n    // TODO: Reverse the array in-place\n}',
        solutionCode: 'public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n        char temp = s[left];\n        s[left] = s[right];\n        s[right] = temp;\n        left++;\n        right--;\n    }\n}',
        explanation: 'Using two pointers starting at both ends, we swap the characters at `left` and `right` and move the pointers toward the center until they meet.'
      },
      {
        id: 'dsa_e2',
        title: 'Valid Palindrome',
        description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
        initialCode: 'public boolean isPalindrome(String s) {\n    // TODO: Return true if s is a palindrome\n    return false;\n}',
        solutionCode: 'public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n}',
        explanation: 'We use two pointers `left` and `right`. Skip non-alphanumeric characters. Compare characters case-insensitively. If they differ, return false. If they cross, it is a palindrome.'
      },
      {
        id: 'dsa_e3',
        title: 'Two Sum',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target` in O(n) time.',
        initialCode: 'public int[] twoSum(int[] nums, int target) {\n    // TODO: Find indices in O(n) time\n    return new int[]{-1, -1};\n}',
        solutionCode: 'public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[]{-1, -1};\n}',
        explanation: 'We use a HashMap to store the numbers we have visited and their indices. For each number, we check if its complement (target - num) exists in the map. If yes, we return their indices.'
      },
      {
        id: 'dsa_e4',
        title: 'FizzBuzz List Generation',
        description: 'Given an integer `n`, return a list of strings representing the numbers from 1 to `n` with Fizz, Buzz, or FizzBuzz substitutions.',
        initialCode: 'public List<String> fizzBuzz(int n) {\n    // TODO: Generate FizzBuzz strings\n    return new ArrayList<>();\n}',
        solutionCode: 'public List<String> fizzBuzz(int n) {\n    List<String> result = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n        if (i % 3 == 0 && i % 5 == 0) result.add("FizzBuzz");\n        else if (i % 3 == 0) result.add("Fizz");\n        else if (i % 5 == 0) result.add("Buzz");\n        else result.add(String.valueOf(i));\n    }\n    return result;\n}',
        explanation: 'Iterate from 1 to n. For each number, check divisibility by both 3 and 5 first (FizzBuzz), then by 3 (Fizz), then by 5 (Buzz). Otherwise, append the number itself.'
      }
    ],
    medium: [
      {
        id: 'dsa_m1',
        title: 'Max Sum Subarray of Size K',
        description: 'Given an array of positive integers and a number `k`, find the maximum sum of any contiguous subarray of size `k` in O(n) time.',
        initialCode: 'public int findMaxSumSubarray(int[] arr, int k) {\n    // TODO: Implement Sliding Window\n    return 0;\n}',
        solutionCode: 'public int findMaxSumSubarray(int[] arr, int k) {\n    int windowSum = 0, maxSum = 0;\n    for (int i = 0; i < arr.length; i++) {\n        windowSum += arr[i];\n        if (i >= k - 1) {\n            maxSum = Math.max(maxSum, windowSum);\n            windowSum -= arr[i - k + 1]; // slide window\n        }\n    }\n    return maxSum;\n}',
        explanation: 'We use a sliding window of size `k`. First we sum elements in the window. As we slide the window right, we add the new element and subtract the left element that fell out, keeping complexity O(n).'
      },
      {
        id: 'dsa_m2',
        title: 'Valid Parentheses',
        description: 'Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
        initialCode: 'public boolean isValid(String s) {\n    // TODO: Verify parentheses balance using stack\n    return false;\n}',
        solutionCode: 'public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == \'(\') stack.push(\')\');\n        else if (c == \'{\') stack.push(\'}\');\n        else if (c == \'[\') stack.push(\']\');\n        else if (stack.isEmpty() || stack.pop() != c) return false;\n    }\n    return stack.isEmpty();\n}',
        explanation: 'We traverse the string. When seeing an open bracket, we push its closing bracket onto the stack. When seeing a closing bracket, we pop and compare. The stack must be empty at the end.'
      },
      {
        id: 'dsa_m3',
        title: 'Binary Search First Occurrence',
        description: 'Given a sorted array of integers containing duplicates, find the index of the first occurrence of a target element. Return -1 if not found.',
        initialCode: 'public int findFirstOccurrence(int[] nums, int target) {\n    // TODO: Binary search first index\n    return -1;\n}',
        solutionCode: 'public int findFirstOccurrence(int[] nums, int target) {\n    int left = 0, right = nums.length - 1, ans = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) {\n            ans = mid;\n            right = mid - 1; // keep searching left\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return ans;\n}',
        explanation: 'We perform a standard binary search, but when `nums[mid] == target`, we save the index and restrict the search space to the left (`right = mid - 1`) to find earlier occurrences.'
      },
      {
        id: 'dsa_m4',
        title: 'Container With Most Water',
        description: 'Given `n` non-negative integers representing heights of vertical lines, find two lines that, together with the x-axis, forms a container that holds the most water.',
        initialCode: 'public int maxArea(int[] height) {\n    // TODO: Solve in O(n) time\n    return 0;\n}',
        solutionCode: 'public int maxArea(int[] height) {\n    int maxArea = 0, left = 0, right = height.length - 1;\n    while (left < right) {\n        int h = Math.min(height[left], height[right]);\n        maxArea = Math.max(maxArea, h * (right - left));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return maxArea;\n}',
        explanation: 'We use two pointers at both ends. The area is width * min(height). To maximize area, we compute the area and slide the pointer pointing to the shorter line inward, aiming for taller boundaries.'
      }
    ],
    hard: [
      {
        id: 'dsa_h1',
        title: 'Merge Overlapping Intervals',
        description: 'Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals.',
        initialCode: 'public int[][] merge(int[][] intervals) {\n    // TODO: Sort and merge intervals\n    return new int[0][0];\n}',
        solutionCode: 'public int[][] merge(int[][] intervals) {\n    if (intervals.length <= 1) return intervals;\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> result = new ArrayList<>();\n    result.add(intervals[0]);\n    for (int i = 1; i < intervals.length; i++) {\n        int[] last = result.get(result.size() - 1);\n        if (intervals[i][0] <= last[1]) {\n            last[1] = Math.max(last[1], intervals[i][1]);\n        } else {\n            result.add(intervals[i]);\n        }\n    }\n    return result.toArray(new int[result.size()][]);\n}',
        explanation: 'First sort intervals by start time. Then iterate and compare the current interval with the last merged interval. If they overlap, merge by adjusting end; otherwise add new.'
      },
      {
        id: 'dsa_h2',
        title: 'Longest Substring Without Repeating Characters',
        description: 'Given a string, find the length of the longest substring without repeating characters in O(n) time.',
        initialCode: 'public int lengthOfLongestSubstring(String s) {\n    // TODO: Implement sliding window with character set/map\n    return 0;\n}',
        solutionCode: 'public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> map = new HashMap<>();\n    int maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (map.containsKey(c)) {\n            left = Math.max(left, map.get(c) + 1); // shrink window\n        }\n        map.put(c, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}',
        explanation: 'We use a sliding window with pointers `left` and `right`. A map stores the last seen index of each character. When a repeating character is found inside the window, we slide `left` to one position past its previous index.'
      },
      {
        id: 'dsa_h3',
        title: 'Coin Change (Min Coins)',
        description: 'Given an integer array of coin denominations and a target amount, write a bottom-up Dynamic Programming function to find the minimum number of coins needed to make up that amount.',
        initialCode: 'public int coinChange(int[] coins, int amount) {\n    // TODO: Dynamic programming bottom-up solution\n    return -1;\n}',
        solutionCode: 'public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int coin : coins) {\n            if (i - coin >= 0) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}',
        explanation: 'We use a DP table of size amount + 1. Base case is `dp[0] = 0`. For each amount from 1 to `amount`, we try all coin denominations. If coin ≤ amount, then `dp[amount] = min(dp[amount], dp[amount - coin] + 1)`. Return -1 if unreachable.'
      },
      {
        id: 'dsa_h4',
        title: 'Detect Cycle in Linked List',
        description: 'Given the head of a singly linked list, determine if the list has a cycle in it using O(1) memory.',
        initialCode: 'public boolean hasCycle(ListNode head) {\n    // TODO: Floyd\'s cycle detection algorithm\n    return false;\n}',
        solutionCode: 'public boolean hasCycle(ListNode head) {\n    if (head == null) return false;\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}',
        explanation: 'We use Floyd\'s cycle detection (Tortoise and Hare). The `slow` pointer moves 1 step; the `fast` pointer moves 2 steps. If a cycle exists, they will eventually meet.'
      }
    ]
  }
};
