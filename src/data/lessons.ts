export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  code: string;
  explanation: string;
  explanationEn: string;
  quiz: QuizQuestion[];
}

export const categories = [
  { id: 'basics', name: 'مبانی همزمانی', nameEn: 'Concurrency Basics', lessons: '1-10' },
  { id: 'async-await', name: 'Async/Await', nameEn: 'Async/Await', lessons: '11-20' },
  { id: 'structured', name: 'همزمانی ساختاریافته', nameEn: 'Structured Concurrency', lessons: '21-30' },
  { id: 'tasks', name: 'تسک‌ها و گروه تسک', nameEn: 'Tasks & TaskGroups', lessons: '31-40' },
  { id: 'actors', name: 'اکتورها', nameEn: 'Actors', lessons: '41-50' },
  { id: 'sendable', name: 'Sendable و Isolation', nameEn: 'Sendable & Isolation', lessons: '51-60' },
  { id: 'async-sequence', name: 'AsyncSequence', nameEn: 'AsyncSequence & Streams', lessons: '61-70' },
  { id: 'error-handling', name: 'مدیریت خطا', nameEn: 'Error Handling', lessons: '71-80' },
  { id: 'advanced', name: 'الگوهای پیشرفته', nameEn: 'Advanced Patterns', lessons: '81-90' },
  { id: 'realworld', name: 'پروژه‌های واقعی', nameEn: 'Real-world Projects', lessons: '91-100' },
];

export const lessons: Lesson[] = [
  // === BASICS 1-10 ===
  {
    id: 1,
    title: 'همزمانی چیست؟',
    titleEn: 'What is Concurrency?',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'همزمانی (Concurrency) توانایی اجرای چندین کار به صورت همزمان است. در سوئیفت مدرن، ما از async/await برای مدیریت همزمانی استفاده می‌کنیم.',
    descriptionEn: 'Concurrency is the ability to run multiple tasks simultaneously. In modern Swift, we use async/await to manage concurrency.',
    code: `// همزمانی در سوئیفت مدرن
// Concurrency in Modern Swift

import Foundation

// تابع ساده async
func fetchData() async -> String {
    return "Hello, Concurrency!"
}

// استفاده از async
Task {
    let result = await fetchData()
    print(result) // Hello, Concurrency!
}`,
    explanation: 'در سوئیفت 5.5+، ما کلمات کلیدی async و await رو داریم. async نشون میده که یک تابع میتونه suspend بشه و await نشون میده که ما منتظر نتیجه میمونیم.',
    explanationEn: 'In Swift 5.5+, we have async and await keywords. async indicates a function can be suspended, and await indicates we wait for the result.',
    quiz: [
      {
        question: 'کدوم نسخه سوئیفت async/await رو معرفی کرد؟',
        options: ['Swift 5.0', 'Swift 5.3', 'Swift 5.5', 'Swift 6.0'],
        correctIndex: 2,
        explanation: 'async/await در Swift 5.5 معرفی شد.'
      },
      {
        question: 'کلمه کلیدی async نشون میده که:',
        options: ['تابع synchronous هست', 'تابع میتونه suspend بشه', 'تابع خطا میده', 'تابع void برمیگردونه'],
        correctIndex: 1,
        explanation: 'async نشون میده تابع میتونه suspend بشه و بعد resume بشه.'
      }
    ]
  },
  {
    id: 2,
    title: 'تفاوت Concurrency و Parallelism',
    titleEn: 'Concurrency vs Parallelism',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'Concurrency درباره ساختار برنامه است، Parallelism درباره اجرای همزمان. Concurrency میتونه بدون Parallelism باشه.',
    descriptionEn: 'Concurrency is about structure, Parallelism is about execution. Concurrency can exist without parallelism.',
    code: `// Concurrency vs Parallelism
import Foundation

// Concurrency: چندین کار مدیریت میشن
// Parallelism: چندین کار همزمان اجرا میشن

func task1() async {
    print("Task 1 started")
    try? await Task.sleep(for: .seconds(1))
    print("Task 1 done")
}

func task2() async {
    print("Task 2 started")
    try? await Task.sleep(for: .seconds(1))
    print("Task 2 done")
}

// این concurrent هست
async let a = task1()
async let b = task2()
// ممکنه parallel هم اجرا بشن`,
    explanation: 'Concurrency به ما اجازه میده چندین کار رو مدیریت کنیم. Parallelism وقتی اتفاق میفته که این کارها واقعاً همزمان روی CPU های مختلف اجرا بشن.',
    explanationEn: 'Concurrency lets us manage multiple tasks. Parallelism happens when these tasks actually run simultaneously on different CPU cores.',
    quiz: [
      {
        question: 'کدوم جمله درسته؟',
        options: ['Concurrency همیشه Parallelism هست', 'Parallelism نوعی Concurrency هست', 'Concurrency و Parallelism یکی هستند', 'هیچکدوم'],
        correctIndex: 1,
        explanation: 'Parallelism یک نوع اجرای Concurrency هست که کارها واقعاً همزمان اجرا میشن.'
      }
    ]
  },
  {
    id: 3,
    title: 'Threads و DispatchQueue (قبلی)',
    titleEn: 'Threads & DispatchQueue (Legacy)',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'قبل از async/await، ما از GCD (Grand Central Dispatch) و DispatchQueue استفاده میکردیم. این روش هنوز کار میکنه ولی async/await بهتره.',
    descriptionEn: 'Before async/await, we used GCD and DispatchQueue. This still works but async/await is better.',
    code: `// روش قدیمی - GCD
import Foundation

// DispatchQueue (روش قدیمی)
func oldWay() {
    DispatchQueue.global(qos: .background).async {
        // کار سنگین
        let result = heavyComputation()
        
        DispatchQueue.main.async {
            // آپدیت UI
            self.updateUI(result)
        }
    }
}

// روش جدید - async/await
func newWay() async {
    let result = await heavyComputation()
    await MainActor.run {
        updateUI(result)
    }
}`,
    explanation: 'روش قدیمی با callback و closure بود که منجر به "callback hell" میشد. async/await کد رو خواناتر و ایمن‌تر میکنه.',
    explanationEn: 'The old way used callbacks and closures leading to "callback hell". async/await makes code more readable and safer.',
    quiz: [
      {
        question: 'مشکل اصلی DispatchQueue چیه؟',
        options: ['سرعت کم', 'Callback hell و سختی مدیریت', 'عدم پشتیبانی از شبکه', 'عدم کار روی iOS'],
        correctIndex: 1,
        explanation: 'مشکل اصلی callback hell و سختی مدیریت state در کدهای پیچیده بود.'
      }
    ]
  },
  {
    id: 4,
    title: 'اولین تابع Async',
    titleEn: 'Your First Async Function',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'برای ساختن یک تابع async، کلمه async رو بعد از پارامترها و قبل از -> قرار میدیم.',
    descriptionEn: 'To create an async function, add the async keyword after parameters and before the return type.',
    code: `import Foundation

// تعریف تابع async
func fetchUser(id: Int) async -> String {
    // شبیه‌سازی تأخیر شبکه
    try? await Task.sleep(for: .seconds(2))
    return "User \\(id)"
}

// تابع async که throws هم داره
func fetchUserSafely(id: Int) async throws -> String {
    guard id > 0 else {
        throw URLError(.badURL)
    }
    try await Task.sleep(for: .seconds(1))
    return "User \\(id)"
}

// فراخوانی
Task {
    let user = await fetchUser(id: 42)
    print(user) // User 42
}`,
    explanation: 'تابع async میتونه suspend بشه. وقتی await رو صدا میزنیم، runtime میتونه کارهای دیگه انجام بده تا این تابع تموم بشه.',
    explanationEn: 'An async function can be suspended. When we call await, the runtime can do other work until this function completes.',
    quiz: [
      {
        question: 'کدوم تعریف تابع async درسته؟',
        options: ['async func foo() -> Int', 'func foo() async -> Int', 'func foo() -> async Int', 'func async foo() -> Int'],
        correctIndex: 1,
        explanation: 'async بعد از () و قبل از -> قرار میگیره.'
      }
    ]
  },
  {
    id: 5,
    title: 'Task.sleep - تأخیر غیرمسدود',
    titleEn: 'Task.sleep - Non-blocking Delay',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'Task.sleep یک راه غیرمسدود برای تأخیر هست. برخلاف Thread.sleep، thread رو بلاک نمیکنه.',
    descriptionEn: 'Task.sleep is a non-blocking way to delay. Unlike Thread.sleep, it doesn\'t block the thread.',
    code: `import Foundation

func demonstrateSleep() async {
    print("شروع - \\(Date())")
    
    // تأخیر 2 ثانیه‌ای غیرمسدود
    try? await Task.sleep(for: .seconds(2))
    
    print("بعد از 2 ثانیه - \\(Date())")
    
    // روش قدیمی‌تر (Swift 5.7-)
    try? await Task.sleep(nanoseconds: 2_000_000_000)
    
    // تأخیر با nanoseconds
    let delay: UInt64 = 500_000_000 // 0.5 ثانیه
    try? await Task.sleep(nanoseconds: delay)
}

// نکته: Task.sleep قابل cancel هست!
Task {
    let task = Task {
        try await Task.sleep(for: .seconds(10))
    }
    task.cancel() // فوراً cancel میشه
}`,
    explanation: 'Task.sleep thread رو آزاد میکنه و بعد از مدت مشخص resume میشه. این باعث میشه thread های دیگه بتونن کار کنن.',
    explanationEn: 'Task.sleep frees the thread and resumes after the specified duration. This allows other threads to do work.',
    quiz: [
      {
        question: 'تفاوت Task.sleep و Thread.sleep چیه؟',
        options: ['فرقی ندارند', 'Task.sleep thread رو بلاک نمیکنه', 'Thread.sleep سریعتره', 'Task.sleep فقط در background کار میکنه'],
        correctIndex: 1,
        explanation: 'Task.sleep غیرمسدود هست و thread رو آزاد میکنه.'
      }
    ]
  },
  {
    id: 6,
    title: 'Task - ساختن تسک‌ها',
    titleEn: 'Task - Creating Tasks',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'Task یک unit از کار async هست. میتونیم Task جدید بسازیم تا کد async رو از context غیر-async اجرا کنیم.',
    descriptionEn: 'A Task is a unit of async work. We can create Tasks to run async code from non-async contexts.',
    code: `import Foundation

// ساخت Task
let task = Task {
    let result = await fetchData()
    print(result)
}

// Task با نوع مشخص
let typedTask: Task<String, Never> = Task {
    return "Hello"
}

// منتظر نتیجه Task
let value = await typedTask.value
print(value) // Hello

// Task.detached - بدون parent
let detached = Task.detached {
    return 42
}
let result = await detached.value

// Task.currentPriority
print(Task.currentPriority) // medium`,
    explanation: 'Task یک context async جدید میسازه. Task.detached از parent جدا هست و priority اون رو inherit نمیکنه.',
    explanationEn: 'Task creates a new async context. Task.detached is independent from parent and doesn\'t inherit its priority.',
    quiz: [
      {
        question: 'Task.detached چه فرقی با Task معمولی داره؟',
        options: ['سریعتره', 'از parent جدا هست', 'فقط در main thread اجرا میشه', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Task.detached از parent task جدا هست و priority و context اون رو inherit نمیکنه.'
      }
    ]
  },
  {
    id: 7,
    title: 'MainActor و UI',
    titleEn: 'MainActor & UI Updates',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'MainActor تضمین میکنه کد فقط در main thread اجرا بشه. برای آپدیت UI حتماً باید از MainActor استفاده کنیم.',
    descriptionEn: 'MainActor ensures code runs only on the main thread. For UI updates, we must use MainActor.',
    code: `import SwiftUI

@MainActor
class ViewModel: ObservableObject {
    @Published var data: String = ""
    
    func loadData() async {
        // این کد در background اجرا میشه
        let result = await fetchData()
        
        // خودکار در main thread هست
        // چون کلاس @MainActor هست
        self.data = result
    }
}

// یا فقط یک تابع
class AnotherViewModel: ObservableObject {
    @Published var items: [String] = []
    
    @MainActor
    func updateUI() async {
        let data = await fetchData()
        self.items = data // Safe! Main thread
    }
}

// فراخوانی
func someAsyncFunction() async {
    let result = await fetchData()
    await MainActor.run {
        // آپدیت UI
        print(result)
    }
}`,
    explanation: '@MainActor یک actor هست که تضمین میکنه کد فقط در main thread اجرا بشه. این برای SwiftUI و UIKit ضروری هست.',
    explanationEn: '@MainActor is an actor that ensures code runs only on the main thread. This is essential for SwiftUI and UIKit.',
    quiz: [
      {
        question: 'چرا از @MainActor استفاده میکنیم؟',
        options: ['سرعت بیشتر', 'تضمین اجرای UI در main thread', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: '@MainActor تضمین میکنه کد در main thread اجرا بشه که برای UI ضروری هست.'
      }
    ]
  },
  {
    id: 8,
    title: 'Cancellation - لغو تسک',
    titleEn: 'Cancellation',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'تسک‌ها قابل cancel هستند. باید cancellation رو check کنیم و به درستی handle کنیم.',
    descriptionEn: 'Tasks are cancellable. We should check for cancellation and handle it properly.',
    code: `import Foundation

func longRunningTask() async throws -> String {
    for i in 0..<100 {
        // Check cancellation
        try Task.checkCancellation()
        
        // یا دستی چک کنیم
        if Task.isCancelled {
            throw CancellationError()
        }
        
        print("Processing \\(i)...")
        try await Task.sleep(for: .milliseconds(100))
    }
    return "Done"
}

// استفاده
let task = Task {
    try await longRunningTask()
}

// بعد از 500ms cancel کن
try await Task.sleep(for: .milliseconds(500))
task.cancel()

// منتظر نتیجه
do {
    let result = try await task.value
    print(result)
} catch is CancellationError {
    print("Task was cancelled")
} catch {
    print("Error: \\(error)")
}`,
    explanation: 'Cancellation cooperative هست. یعنی تسک باید خودش cancellation رو check کنه. Task.checkCancellation() اگه cancel شده باشه خطا میده.',
    explanationEn: 'Cancellation is cooperative. The task must check for cancellation itself. Task.checkCancellation() throws if cancelled.',
    quiz: [
      {
        question: 'Cancellation در Swift چطور کار میکنه؟',
        options: ['خودکار force cancel میشه', 'Cooperative هست - تسک باید چک کنه', 'اصلاً نمیشه cancel کرد', 'فقط در background کار میکنه'],
        correctIndex: 1,
        explanation: 'Cancellation cooperative هست. تسک باید Task.isCancelled یا Task.checkCancellation() رو چک کنه.'
      }
    ]
  },
  {
    id: 9,
    title: 'Priority - اولویت تسک',
    titleEn: 'Task Priority',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'تسک‌ها میتونن اولویت‌های مختلفی داشته باشن. اولویت بالاتر یعنی زودتر اجرا شدن.',
    descriptionEn: 'Tasks can have different priorities. Higher priority means earlier execution.',
    code: `import Foundation

// اولویت‌های مختلف
Task(priority: .userInitiated) {
    // کار مهم برای کاربر
    await loadUserProfile()
}

Task(priority: .background) {
    // کار کم‌اهمیت
    await syncDatabase()
}

Task(priority: .high) {
    await processImage()
}

// اولویت‌ها:
// .userInteractive - بالاترین (UI)
// .userInitiated - بالا
// .high - بالا
// .medium - پیش‌فرض
// .low - پایین
// .background - پایین‌ترین
// .utility - بین low و background

// Task.detached با priority
Task.detached(priority: .background) {
    await cleanupCache()
}

// چک کردن priority
print(Task.currentPriority) // .medium`,
    explanation: 'اولویت‌ها به runtime کمک میکنن تصمیم بگیرن کدوم تسک زودتر اجرا بشه. ولی تضمینی نیست!',
    explanationEn: 'Priorities help the runtime decide which task to execute first. But it\'s not guaranteed!',
    quiz: [
      {
        question: 'کدوم اولویت بالاترینه؟',
        options: ['.high', '.userInitiated', '.userInteractive', '.background'],
        correctIndex: 2,
        explanation: '.userInteractive بالاترین اولویت هست برای کارهای UI.'
      }
    ]
  },
  {
    id: 10,
    title: 'async let - اجرای موازی',
    titleEn: 'async let - Parallel Execution',
    category: 'basics',
    categoryEn: 'Concurrency Basics',
    description: 'async let به ما اجازه میده چندین عملیات async رو همزمان شروع کنیم و بعد نتایج رو جمع کنیم.',
    descriptionEn: 'async let lets us start multiple async operations simultaneously and collect results later.',
    code: `import Foundation

func fetchUser() async -> String {
    try? await Task.sleep(for: .seconds(1))
    return "Ali"
}

func fetchPosts() async -> [String] {
    try? await Task.sleep(for: .seconds(1))
    return ["Post 1", "Post 2"]
}

func fetchComments() async -> Int {
    try? await Task.sleep(for: .seconds(1))
    return 42
}

// Sequential - 3 ثانیه
func sequential() async {
    let user = await fetchUser()      // 1s
    let posts = await fetchPosts()    // 1s
    let comments = await fetchComments() // 1s
    // Total: 3 seconds
}

// Parallel - 1 ثانیه!
func parallel() async {
    async let user = fetchUser()       // شروع همزمان
    async let posts = fetchPosts()     // شروع همزمان
    async let comments = fetchComments() // شروع همزمان
    
    // منتظر همه
    let u = await user
    let p = await posts
    let c = await comments
    // Total: ~1 second!
    print("\\(u): \\(p.count) posts, \\(c) comments")
}`,
    explanation: 'async let مثل let معمولی هست ولی مقدار async تولید میکنه. تا وقتی await نزنیم، کار ادامه داره.',
    explanationEn: 'async let is like regular let but produces an async value. Work continues until we await it.',
    quiz: [
      {
        question: 'async let چه مزیتی نسبت به await معمولی داره؟',
        options: ['کد کمتر', 'اجرای موازی و سریعتر', 'حافظه کمتر', 'امنیت بیشتر'],
        correctIndex: 1,
        explanation: 'async let اجازه میده عملیات همزمان شروع بشن و موازی اجرا بشن.'
      }
    ]
  },

  // === ASYNC/AWAIT 11-20 ===
  {
    id: 11,
    title: 'Await در عمق',
    titleEn: 'Await in Depth',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'await نقطه suspension هست. وقتی await میزنیم، تابع فعلی suspend میشه و thread آزاد میشه.',
    descriptionEn: 'await is a suspension point. When we hit await, the current function suspends and the thread is freed.',
    code: `import Foundation

// Suspension Points
func processData() async {
    print("1 - قبل از await")
    
    // اینجا suspend میشه
    let data = await fetchData()
    
    // اینجا resume میشه
    // ممکنه thread متفاوت باشه!
    print("2 - بعد از await")
    
    let processed = await transform(data)
    print("3 - پردازش شد")
}

// نکته مهم: بعد از await، ممکنه
// در thread متفاوتی باشیم
@MainActor
func updateFromNetwork() async {
    print(Thread.current) // Main
    
    let data = await fetchData() // suspend
    
    // ممکنه thread عوض شده باشه!
    print(Thread.current) // ممکنه متفاوت باشه
    
    await MainActor.run {
        // حالا مطمئنیم main thread هستیم
        print(Thread.current) // Main
    }
}`,
    explanation: 'هر await یک suspension point هست. بعد از resume، ممکنه در thread متفاوتی باشیم. این مهمه برای UI!',
    explanationEn: 'Every await is a suspension point. After resume, we might be on a different thread. This is important for UI!',
    quiz: [
      {
        question: 'بعد از await چه اتفاقی ممکنه بیفته؟',
        options: ['همیشه همون thread هستیم', 'ممکنه thread عوض بشه', 'برنامه crash میکنه', 'هیچی'],
        correctIndex: 1,
        explanation: 'بعد از suspension و resume، ممکنه در thread متفاوتی باشیم.'
      }
    ]
  },
  {
    id: 12,
    title: 'Async Functions و Throws',
    titleEn: 'Async Functions with Throws',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'توابع async میتونن throws هم باشن. باید با do-catch مدیریت کنیم.',
    descriptionEn: 'Async functions can also throw. We need to handle errors with do-catch.',
    code: `import Foundation

enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingFailed
}

func fetchJSON<T: Decodable>(url: URL) async throws -> T {
    let (data, response) = try await URLSession.shared.data(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse,
          httpResponse.statusCode == 200 else {
        throw NetworkError.noData
    }
    
    do {
        let decoded = try JSONDecoder().decode(T.self, from: data)
        return decoded
    } catch {
        throw NetworkError.decodingFailed
    }
}

// استفاده
struct User: Codable {
    let name: String
    let age: Int
}

func loadUser() async {
    do {
        let url = URL(string: "https://api.example.com/user")!
        let user: User = try await fetchJSON(url: url)
        print(user.name)
    } catch NetworkError.invalidURL {
        print("URL نامعتبر")
    } catch NetworkError.noData {
        print("دیتا نیست")
    } catch {
        print("خطای ناشناخته: \\(error)")
    }
}`,
    explanation: 'ترکیب async throws خیلی رایجه. همیشه error handling مناسب داشته باشید.',
    explanationEn: 'async throws combination is very common. Always have proper error handling.',
    quiz: [
      {
        question: 'چطور یک تابع async throws رو صدا بزنیم؟',
        options: ['await func()', 'try await func()', 'try func()', 'await try func()'],
        correctIndex: 1,
        explanation: 'ترتیب صحیح try await هست. اول try بعد await.'
      }
    ]
  },
  {
    id: 13,
    title: 'Continuations - پل زدن به Closure',
    titleEn: 'Continuations - Bridging Closures',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'Continuations اجازه میدن API های مبتنی بر callback رو به async تبدیل کنیم.',
    descriptionEn: 'Continuations let us convert callback-based APIs to async.',
    code: `import Foundation

// API قدیمی با completion handler
func oldFetchData(completion: @escaping (String) -> Void) {
    DispatchQueue.global().async {
        completion("Hello!")
    }
}

// تبدیل به async با continuation
func newFetchData() async -> String {
    await withCheckedContinuation { continuation in
        oldFetchData { result in
            continuation.resume(returning: result)
        }
    }
}

// با throwing
func newFetchDataThrows() async throws -> String {
    try await withCheckedThrowingContinuation { continuation in
        oldFetchData { result in
            if result.isEmpty {
                continuation.resume(throwing: URLError(.badServerResponse))
            } else {
                continuation.resume(returning: result)
            }
        }
    }
}

// استفاده
Task {
    let data = await newFetchData()
    print(data) // Hello!
}`,
    explanation: 'withCheckedContinuation و withCheckedThrowingContinuation برای تبدیل callback به async استفاده میشن. حتماً continuation فقط یکبار resume بشه!',
    explanationEn: 'withCheckedContinuation and withCheckedThrowingContinuation convert callbacks to async. Resume continuation exactly once!',
    quiz: [
      {
        question: 'چند بار میتونیم continuation.resume رو صدا بزنیم؟',
        options: ['هر چند بار', 'فقط یکبار', 'دوبار', 'بستگی داره'],
        correctIndex: 1,
        explanation: 'Continuation باید دقیقاً یکبار resume بشه. بیشتر باعث crash میشه!'
      }
    ]
  },
  {
    id: 14,
    title: 'Async Computed Properties',
    titleEn: 'Async Computed Properties',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'در سوئیفت نمیشه computed property async داشت، ولی راه‌حل‌هایی وجود داره.',
    descriptionEn: 'Swift doesn\'t support async computed properties directly, but there are workarounds.',
    code: `import Foundation

// ❌ این کار نمیکنه:
// var data: String {
//     get async { await fetchData() }
// }

// ✅ راه‌حل 1: async function
class ViewModel {
    private var cachedData: String?
    
    func getData() async -> String {
        if let cached = cachedData {
            return cached
        }
        let data = await fetchData()
        cachedData = data
        return data
    }
}

// ✅ راه‌حل 2: async property wrapper
@propertyWrapper
struct AsyncValue<T> {
    private var task: Task<T, Never>?
    private let producer: () async -> T
    
    init(_ producer: @escaping () async -> T) {
        self.producer = producer
    }
    
    var wrappedValue: T {
        get async {
            if let task = task {
                return await task.value
            }
            let t = Task { await producer() }
            task = t
            return await t.value
        }
    }
}

// استفاده
class Model {
    @AsyncValue { await fetchData() }
    var data: String
}`,
    explanation: 'سوئیفت مستقیماً async computed property پشتیبانی نمیکنه. از async function یا property wrapper استفاده کنید.',
    explanationEn: 'Swift doesn\'t directly support async computed properties. Use async functions or property wrappers.',
    quiz: [
      {
        question: 'آیا computed property میتونه async باشه؟',
        options: ['بله، مستقیم', 'خیر، نیاز به workaround', 'فقط در struct', 'فرضی در Swift 6'],
        correctIndex: 1,
        explanation: 'Computed property مستقیماً async نمیشه. باید از function یا property wrapper استفاده کرد.'
      }
    ]
  },
  {
    id: 15,
    title: 'Async/Await در Protocols',
    titleEn: 'Async/Await in Protocols',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'Protocols میتونن async requirements داشته باشن. این برای abstraction خیلی مفیده.',
    descriptionEn: 'Protocols can have async requirements. This is very useful for abstraction.',
    code: `import Foundation

// Protocol با async requirement
protocol DataRepository {
    func fetchItems() async throws -> [String]
    func save(item: String) async throws
    func delete(id: String) async throws
}

// Implementation
class RemoteRepository: DataRepository {
    func fetchItems() async throws -> [String] {
        let url = URL(string: "https://api.example.com/items")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([String].self, from: data)
    }
    
    func save(item: String) async throws {
        // save to server
    }
    
    func delete(id: String) async throws {
        // delete from server
    }
}

// Mock for testing
class MockRepository: DataRepository {
    var items: [String] = ["Test"]
    
    func fetchItems() async throws -> [String] {
        return items
    }
    
    func save(item: String) async throws {
        items.append(item)
    }
    
    func delete(id: String) async throws {
        items.removeAll { $0 == id }
    }
}

// استفاده
func loadItems(from repo: DataRepository) async throws {
    let items = try await repo.fetchItems()
    print(items)
}`,
    explanation: 'Async protocol requirements خیلی مفیدن برای dependency injection و testing.',
    explanationEn: 'Async protocol requirements are very useful for dependency injection and testing.',
    quiz: [
      {
        question: 'مزیت async protocol requirement چیه؟',
        options: ['سرعت بیشتر', 'تسهیل testing و abstraction', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'میشه implementation های مختلف (مثل mock) ساخت برای testing.'
      }
    ]
  },
  {
    id: 16,
    title: 'Async/Await در Closure',
    titleEn: 'Async Closures',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'Closures هم میتونن async باشن. برای higher-order functions و callbacks مفیده.',
    descriptionEn: 'Closures can also be async. Useful for higher-order functions and callbacks.',
    code: `import Foundation

// Async closure type
let asyncClosure: () async -> String = {
    try? await Task.sleep(for: .seconds(1))
    return "Hello from async closure!"
}

// تابعی که async closure میگیره
func performWithCallback(
    _ operation: @Sendable () async -> String
) async -> String {
    let result = await operation()
    return "Result: \\(result)"
}

// استفاده
Task {
    let output = await performWithCallback {
        return "Custom data"
    }
    print(output) // Result: Custom data
}

// Async closure با throws
let throwingClosure: () async throws -> Data = {
    let url = URL(string: "https://example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}

// map با async
func asyncMap<T, U>(
    _ array: [T],
    transform: (T) async -> U
) async -> [U] {
    var results: [U] = []
    for item in array {
        results.append(await transform(item))
    }
    return results
}`,
    explanation: 'Async closures میتونن await داشته باشن. @Sendable برای thread safety اضافه کنید.',
    explanationEn: 'Async closures can contain await. Add @Sendable for thread safety.',
    quiz: [
      {
        question: 'کدوم نوع closure درسته؟',
        options: ['() -> async String', '() async -> String', 'async () -> String', '() -> String async'],
        correctIndex: 1,
        explanation: 'async بین () و -> قرار میگیره.'
      }
    ]
  },
  {
    id: 17,
    title: 'Reasync و Async Sequences',
    titleEn: 'Reasync & Async Sequences',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'مفهوم reasync و ارتباط آن با AsyncSequence - پایه و اساس iteration در concurrency.',
    descriptionEn: 'The concept of reasync and its relationship with AsyncSequence - the foundation of iteration in concurrency.',
    code: `import Foundation

// AsyncSequence - مثل Sequence ولی async
// for await loop

func processNumbers() async {
    let numbers = AsyncStream<Int> { continuation in
        Task {
            for i in 1...5 {
                continuation.yield(i)
                try? await Task.sleep(for: .milliseconds(500))
            }
            continuation.finish()
        }
    }
    
    // for await - iterate روی async sequence
    for await number in numbers {
        print("Received: \\(number)")
    }
    print("Done!")
}

// AsyncSequence در URLSession
func fetchLines() async throws {
    let url = URL(string: "https://example.com/data")!
    let (bytes, _) = try await URLSession.shared.bytes(from: url)
    
    // line-by-line reading
    for try await line in bytes.lines {
        print(line)
    }
}`,
    explanation: 'for await مثل for معمولی هست ولی برای async sequences. هر iteration ممکنه suspend بشه.',
    explanationEn: 'for await is like regular for but for async sequences. Each iteration may suspend.',
    quiz: [
      {
        question: 'for await برای چیست؟',
        options: ['حلقه معمولی', 'iterate روی AsyncSequence', 'ساخت Task', 'مدیریت خطا'],
        correctIndex: 1,
        explanation: 'for await برای iterate روی AsyncSequence استفاده میشه.'
      }
    ]
  },
  {
    id: 18,
    title: 'Task Local Values',
    titleEn: 'Task Local Values',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'TaskLocal یک مکانیزم برای ذخیره و انتقال مقادیر در طول execution context یک task هست.',
    descriptionEn: 'TaskLocal is a mechanism for storing and passing values through a task\'s execution context.',
    code: `import Foundation

// تعریف TaskLocal
enum TaskContext {
    @TaskLocal static var requestId: String?
    @TaskLocal static var userId: Int?
}

// استفاده
func processRequest() async {
    // مقدار رو set میکنیم
    await TaskContext.$requestId.withValue("req-123") {
        await handleRequest()
    }
}

func handleRequest() async {
    // مقدار رو میخونیم
    if let id = TaskContext.requestId {
        print("Processing request: \\(id)")
    }
    
    // حتی در child task ها هم قابل دسترسیه
    await Task {
        print("Child sees: \\(TaskContext.requestId ?? "none")")
    }.value
}

// استفاده عملی: Logging
enum Logger {
    @TaskLocal static var correlationId: String?
    
    static func log(_ message: String) {
        let id = correlationId ?? "unknown"
        print("[\\(id)] \\(message)")
    }
}`,
    explanation: 'TaskLocal مثل thread-local storage هست ولی برای async tasks. مقادیر به child tasks هم منتقل میشن.',
    explanationEn: 'TaskLocal is like thread-local storage but for async tasks. Values propagate to child tasks.',
    quiz: [
      {
        question: 'TaskLocal به کجا propagate میشه؟',
        options: ['فقط current task', 'Child tasks هم', 'هیچجا', 'فقط parent'],
        correctIndex: 1,
        explanation: 'TaskLocal values به child tasks هم منتقل میشن.'
      }
    ]
  },
  {
    id: 19,
    title: 'DiscardingTask - fire and forget',
    titleEn: 'DiscardingTask - Fire and Forget',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'Task.discarding برای کارهایی که نتیجه‌شون مهم نیست. مثل logging یا analytics.',
    descriptionEn: 'Task.discarding is for work where we don\'t need the result. Like logging or analytics.',
    code: `import Foundation

// Task معمولی - نتیجه مهمه
let task = Task {
    return await fetchData()
}
let result = await task.value

// Task.discarding - نتیجه مهم نیست
Task.discarding {
    await logAnalytics(event: "button_clicked")
}

// مثال عملی
class AnalyticsTracker {
    func track(_ event: String) {
        Task.discarding {
            await self.sendToServer(event: event)
        }
    }
    
    private func sendToServer(event: String) async {
        // ارسال به سرور
        try? await Task.sleep(for: .seconds(1))
        print("Sent: \\(event)")
    }
}

// تفاوت با Task.detached
// Task.discarding:
// - نتیجه مهم نیست (Void)
// - در context فعلی اجرا میشه
// - برای fire-and-forget

// Swift 5.9+
func fireAndForget() {
    Task {
        await doSomething()
    }
    // یا
    Task.detached {
        await doSomething()
    }
}`,
    explanation: 'Task.discarding وقتی استفاده میشه که نتیجه task مهم نیست و فقط میخوایم کاری اجرا بشه.',
    explanationEn: 'Task.discarding is used when the task result doesn\'t matter and we just want work to execute.',
    quiz: [
      {
        question: 'Task.discarding برای چه کاری مناسبه؟',
        options: ['محاسبات سنگین', 'Logging و Analytics', 'UI updates', 'Network requests مهم'],
        correctIndex: 1,
        explanation: 'Task.discarding برای fire-and-forget مثل logging مناسبه.'
      }
    ]
  },
  {
    id: 20,
    title: 'Quiz: Async/Await Basics',
    titleEn: 'Quiz: Async/Await Basics',
    category: 'async-await',
    categoryEn: 'Async/Await',
    description: 'آزمون جامع از مباحث async/await. دانش خودتون رو بسنجید!',
    descriptionEn: 'Comprehensive quiz on async/await topics. Test your knowledge!',
    code: `// آزمون - کد زیر رو بررسی کنید
import Foundation

func mystery() async -> Int {
    async let a = slowCompute(1)  // 2s
    async let b = slowCompute(2)  // 2s
    async let c = slowCompute(3)  // 2s
    
    let result = await a + b + c
    return result
}

// سوال: این تابع چقدر طول میکشه؟
// الف) 6 ثانیه
// ب) 2 ثانیه
// ج) 0 ثانیه
// د) 4 ثانیه`,
    explanation: 'جواب: 2 ثانیه! چون async let سه کار رو همزمان شروع میکنه.',
    explanationEn: 'Answer: 2 seconds! Because async let starts all three tasks simultaneously.',
    quiz: [
      {
        question: 'await قبل از async function لازمه؟',
        options: ['بله همیشه', 'بله اگر در async context باشیم', 'خیر', 'فقط در main thread'],
        correctIndex: 1,
        explanation: 'await فقط در async context لازمه و قابل استفاده هست.'
      },
      {
        question: 'async let a = foo() چه زمانی foo() اجرا میشه؟',
        options: ['وقتی await a بزنیم', 'فوراً', 'وقتی scope تموم بشه', 'هیوقت'],
        correctIndex: 1,
        explanation: 'async let فوراً کار رو شروع میکنه و بعداً میتونیم await کنیم.'
      },
      {
        question: 'کدوم درسته؟',
        options: ['async functions همیشه در thread جدید اجرا میشن', 'async functions میتونن در همون thread بمونن', 'async functions بلاک میکنن', 'async functions کندترن'],
        correctIndex: 1,
        explanation: 'Async functions میتونن در همون thread بمونن. suspension به معنی thread switch نیست.'
      }
    ]
  },

  // === STRUCTURED CONCURRENCY 21-30 ===
  {
    id: 21,
    title: 'Structured Concurrency چیست؟',
    titleEn: 'What is Structured Concurrency?',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'Structured Concurrency یعنی تسک‌ها ساختار سلسله‌مراتبی دارن. Parent منتظر children میمونه.',
    descriptionEn: 'Structured Concurrency means tasks have a hierarchical structure. Parent waits for children.',
    code: `import Foundation

// Structured Concurrency
// Parent task منتظر child task ها میمونه

func structuredExample() async {
    // این Task یک parent هست
    await withTaskGroup(of: String.self) { group in
        group.addTask {
            await fetchFromAPI1()
        }
        group.addTask {
            await fetchFromAPI2()
        }
        group.addTask {
            await fetchFromAPI3()
        }
        
        // خودکار منتظر همه children میمونه
    }
    // اینجا مطمئنیم همه تموم شدن
}

// مزایا:
// 1. Cancellation خودکار propagate میشه
// 2. خطاها مدیریت میشن
// 3. Lifetime واضح هست
// 4. Data race کمتر

func parentTask() async {
    // اگر parent cancel بشه، children هم cancel میشن
    await withTaskGroup(of: Int.self) { group in
        for i in 0..<10 {
            group.addTask {
                // اگه parent cancel بشه، این هم cancel میشه
                return i * 2
            }
        }
    }
}`,
    explanation: 'Structured Concurrency تضمین میکنه child tasks قبل از parent تموم بشن. این از bugs جلوگیری میکنه.',
    explanationEn: 'Structured Concurrency ensures child tasks finish before parent. This prevents bugs.',
    quiz: [
      {
        question: 'مزیت اصلی Structured Concurrency چیه؟',
        options: ['سرعت بیشتر', 'مدیریت بهتر lifetime و cancellation', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Structured Concurrency lifetime و cancellation رو به درستی مدیریت میکنه.'
      }
    ]
  },
  {
    id: 22,
    title: 'withTaskGroup',
    titleEn: 'withTaskGroup',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'withTaskGroup برای اجرای چندین task همزمان و جمع‌آوری نتایج استفاده میشه.',
    descriptionEn: 'withTaskGroup is used to run multiple tasks concurrently and collect results.',
    code: `import Foundation

func fetchAllUsers() async -> [String] {
    await withTaskGroup(of: String.self) { group in
        let ids = [1, 2, 3, 4, 5]
        
        for id in ids {
            group.addTask {
                await fetchUser(id: id)
            }
        }
        
        var results: [String] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}

// با throwing
func fetchAllUsersSafe() async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        let ids = [1, 2, 3, 4, 5]
        
        for id in ids {
            group.addTask {
                try await fetchUserSafely(id: id)
            }
        }
        
        var results: [String] = []
        for try await result in group {
            results.append(result)
        }
        return results
    }
}

// نکته: addTask فقط داخل closure مجازه
// نمیشه group رو ذخیره کرد`,
    explanation: 'withTaskGroup یک scope مشخص میسازه. تمام child tasks باید قبل از خروج از scope تموم بشن.',
    explanationEn: 'withTaskGroup creates a defined scope. All child tasks must finish before exiting the scope.',
    quiz: [
      {
        question: 'withTaskGroup چه نوعی برمیگردونه؟',
        options: ['Task', 'Void', 'مقدار return شده از closure', 'Array'],
        correctIndex: 2,
        explanation: 'withTaskGroup مقدار return شده از closure رو برمیگردونه.'
      }
    ]
  },
  {
    id: 23,
    title: 'withThrowingTaskGroup',
    titleEn: 'withThrowingTaskGroup',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'withThrowingTaskGroup مثل withTaskGroup ولی خطاها رو هم handle میکنه.',
    descriptionEn: 'withThrowingTaskGroup is like withTaskGroup but also handles errors.',
    code: `import Foundation

enum FetchError: Error {
    case failed(Int)
}

func fetchAllWithErrors() async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        for id in 1...5 {
            group.addTask {
                try await Task.sleep(for: .milliseconds(100))
                if id == 3 {
                    throw FetchError.failed(id)
                }
                return "User \\(id)"
            }
        }
        
        var results: [String] = []
        do {
            for try await result in group {
                results.append(result)
            }
        } catch {
            // یک خطا بقیه رو cancel میکنه
            group.cancelAll()
            throw error
        }
        return results
    }
}

// مدیریت خطای جزئی
func fetchWithPartialErrors() async -> [Result<String, Error>] {
    await withTaskGroup(of: Result<String, Error>.self) { group in
        for id in 1...5 {
            group.addTask {
                do {
                    try await Task.sleep(for: .milliseconds(100))
                    if id == 3 { throw FetchError.failed(id) }
                    return .success("User \\(id)")
                } catch {
                    return .failure(error)
                }
            }
        }
        
        var results: [Result<String, Error>] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
    explanation: 'در withThrowingTaskGroup، اگر یک task خطا بده، بقیه cancel میشن مگر اینکه catch کنیم.',
    explanationEn: 'In withThrowingTaskGroup, if one task throws, others are cancelled unless we catch.',
    quiz: [
      {
        question: 'اگر یک task در withThrowingTaskGroup خطا بده چه میشه؟',
        options: ['فقط همون task fail میشه', 'همه cancel میشن', 'برنامه crash میکنه', 'چیزی نمیشه'],
        correctIndex: 1,
        explanation: 'در throwingTaskGroup، یک خطا باعث cancel شدن بقیه tasks میشه.'
      }
    ]
  },
  {
    id: 24,
    title: 'TaskGroup.next() - کنترل بیشتر',
    titleEn: 'TaskGroup.next() - More Control',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'به جای for await، میتونیم از next() برای کنترل بیشتر استفاده کنیم.',
    descriptionEn: 'Instead of for await, we can use next() for more control.',
    code: `import Foundation

func processWithNext() async {
    await withTaskGroup(of: String.self) { group in
        for i in 1...10 {
            group.addTask {
                await fetchData(id: i)
            }
        }
        
        // پردازش یکی یکی
        while let result = await group.next() {
            print("Got: \\(result)")
            
            // میتونیم تصمیم بگیریم ادامه بدیم یا نه
            if result == "stop" {
                group.cancelAll()
                break
            }
        }
    }
}

// Early exit pattern
func findFirst() async -> String? {
    await withTaskGroup(of: String?.self) { group in
        for url in urls {
            group.addTask {
                let data = await fetch(url)
                return data.contains("target") ? data : nil
            }
        }
        
        for await result in group {
            if let found = result {
                group.cancelAll() // بقیه رو cancel کن
                return found
            }
        }
        return nil
    }
}`,
    explanation: 'group.next() یک Optional برمیگردونه. nil یعنی همه tasks تموم شدن.',
    explanationEn: 'group.next() returns an Optional. nil means all tasks are done.',
    quiz: [
      {
        question: 'group.next() چه وقتی nil برمیگردونه؟',
        options: ['خطا发生时', 'وقتی همه tasks تموم بشن', 'وقتی cancel بشه', 'هیوقت'],
        correctIndex: 1,
        explanation: 'next() وقتی nil برمیگردونه که دیگه task ای برای پردازش نباشه.'
      }
    ]
  },
  {
    id: 25,
    title: 'Cancellation Propagation',
    titleEn: 'Cancellation Propagation',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'Cancellation از parent به children propagate میشه. این یک اصل مهم structured concurrency هست.',
    descriptionEn: 'Cancellation propagates from parent to children. This is a key principle of structured concurrency.',
    code: `import Foundation

func parentWithChildren() async {
    await withTaskGroup(of: Void.self) { group in
        group.addTask {
            await childTask(name: "A")
        }
        group.addTask {
            await childTask(name: "B")
        }
        group.addTask {
            await childTask(name: "C")
        }
    }
}

func childTask(name: String) async {
    for i in 0..<100 {
        if Task.isCancelled {
            print("Task \\(name) cancelled at \\(i)")
            return
        }
        try? await Task.sleep(for: .milliseconds(100))
    }
}

// اگر parent cancel بشه:
let task = Task {
    await parentWithChildren()
}

// بعد از 500ms
task.cancel()
// همه children هم cancel میشن!

// نکته: Task.detached اینطور نیست
// Detached tasks مستقل هستن
Task.detached {
    // این cancel نمیشه اگه parent cancel بشه
    await independentWork()
}`,
    explanation: 'Cancellation یک درخت رو طی میکنه. Parent cancel بشه، همه children هم cancel میشن.',
    explanationEn: 'Cancellation traverses the tree. If parent is cancelled, all children are cancelled too.',
    quiz: [
      {
        question: 'Task.detached از cancellation parent受影响 میشه؟',
        options: ['بله', 'خیر، مستقل هست', 'فقط گاهی', 'بستگی به priority داره'],
        correctIndex: 1,
        explanation: 'Task.detached از parent جدا هست و cancellation propagate نمیشه.'
      }
    ]
  },
  {
    id: 26,
    title: 'Error Propagation in Groups',
    titleEn: 'Error Propagation in Groups',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'خطاها در TaskGroup چطور مدیریت میشن و چطور میتونیم partial failures رو handle کنیم.',
    descriptionEn: 'How errors are managed in TaskGroup and how to handle partial failures.',
    code: `import Foundation

// Strategy 1: First error wins (throwing)
func firstErrorWins() async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        for i in 1...5 {
            group.addTask {
                if i == 3 { throw URLError(.badServerResponse) }
                return "Result \\(i)"
            }
        }
        
        var results: [String] = []
        for try await result in group {
            results.append(result)
        }
        return results
    }
}

// Strategy 2: Collect all, ignore errors
func ignoreErrors() async -> [String] {
    await withTaskGroup(of: String?.self) { group in
        for i in 1...5 {
            group.addTask {
                do {
                    if i == 3 { throw URLError(.badServerResponse) }
                    return "Result \\(i)"
                } catch {
                    return nil
                }
            }
        }
        
        return await group.reduce(into: [String]()) { results, value in
            if let v = value { results.append(v) }
        }
    }
}

// Strategy 3: Result type
func collectResults() async -> [Result<String, Error>] {
    await withTaskGroup(of: Result<String, Error>.self) { group in
        for i in 1...5 {
            group.addTask {
                do {
                    if i == 3 { throw URLError(.badServerResponse) }
                    return .success("Result \\(i)")
                } catch {
                    return .failure(error)
                }
            }
        }
        
        var results: [Result<String, Error>] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
    explanation: 'سه استراتژی اصلی: 1) اولین خطا همه رو cancel میکنه 2) خطاها نادیده گرفته میشن 3) Result type استفاده میشه.',
    explanationEn: 'Three main strategies: 1) First error cancels all 2) Errors ignored 3) Result type used.',
    quiz: [
      {
        question: 'بهترین استراتژی برای handling partial failures چیه؟',
        options: ['First error wins', 'Ignore all errors', 'بستگی به use case داره', 'Task.detached'],
        correctIndex: 2,
        explanation: 'بستگی داره. گاهی اولین خطا مهمه، گاهی باید همه نتایج رو جمع کنیم.'
      }
    ]
  },
  {
    id: 27,
    title: 'Nesting Task Groups',
    titleEn: 'Nesting Task Groups',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'میشه TaskGroup ها رو تودرتو استفاده کرد. هر level یک scope جدید میسازه.',
    descriptionEn: 'TaskGroups can be nested. Each level creates a new scope.',
    code: `import Foundation

func nestedGroups() async -> [[String]] {
    await withTaskGroup(of: [String].self) { outerGroup in
        for batch in 1...3 {
            outerGroup.addTask {
                // Inner group
                await withTaskGroup(of: String.self) { innerGroup in
                    for i in 1...5 {
                        innerGroup.addTask {
                            await fetchItem(batch: batch, index: i)
                        }
                    }
                    
                    var batchResults: [String] = []
                    for await result in innerGroup {
                        batchResults.append(result)
                    }
                    return batchResults
                }
            }
        }
        
        var allResults: [[String]] = []
        for await batchResult in outerGroup {
            allResults.append(batchResult)
        }
        return allResults
    }
}

// ساختار:
// Outer Group
// ├── Batch 1 (Inner Group)
// │   ├── Item 1
// │   ├── Item 2
// │   └── ...
// ├── Batch 2 (Inner Group)
// │   └── ...
// └── Batch 3 (Inner Group)
//     └── ...`,
    explanation: 'Nesting TaskGroups برای پردازش داده‌های سلسله‌مراتبی مفیده. هر level استقلال داره.',
    explanationEn: 'Nesting TaskGroups is useful for hierarchical data processing. Each level is independent.',
    quiz: [
      {
        question: 'آیا TaskGroup ها میتونن تودرتو باشن؟',
        options: ['بله', 'خیر', 'فقط 2 level', 'فقط در Swift 6'],
        correctIndex: 0,
        explanation: 'TaskGroup ها میتونن به هر عمقی تودرتو باشن.'
      }
    ]
  },
  {
    id: 28,
    title: 'Dynamic Task Addition',
    titleEn: 'Dynamic Task Addition',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'میشه بر اساس نتایج قبلی، task های جدید به group اضافه کرد.',
    descriptionEn: 'We can add new tasks to a group based on previous results.',
    code: `import Foundation

// BFS با TaskGroup
func breadthFirstSearch(start: Int) async -> [Int] {
    await withTaskGroup(of: [Int].self) { group in
        var visited: Set<Int> = [start]
        var allFound: [Int] = [start]
        
        group.addTask {
            await getNeighbors(of: start)
        }
        
        while let neighbors = await group.next() {
            for neighbor in neighbors {
                guard !visited.contains(neighbor) else { continue }
                visited.insert(neighbor)
                allFound.append(neighbor)
                
                // اضافه کردن task جدید!
                group.addTask {
                    await getNeighbors(of: neighbor)
                }
            }
        }
        
        return allFound
    }
}

// Web crawler example
func crawlPages(startUrl: URL) async -> [String] {
    await withTaskGroup(of: (String, [URL]).self) { group in
        var visited: Set<String> = [startUrl.absoluteString]
        var allLinks: [String] = []
        
        group.addTask {
            await fetchAndParse(url: startUrl)
        }
        
        var depth = 0
        let maxDepth = 3
        
        while let (page, links) = await group.next() {
            allLinks.append(page)
            depth += 1
            
            guard depth < maxDepth else { continue }
            
            for link in links {
                let urlStr = link.absoluteString
                if !visited.contains(urlStr) {
                    visited.insert(urlStr)
                    group.addTask {
                        await fetchAndParse(url: link)
                    }
                }
            }
        }
        return allLinks
    }
}`,
    explanation: 'Dynamic task addition خیلی قدرتمنده. میتونیم بر اساس نتایج، کارهای جدید تعریف کنیم.',
    explanationEn: 'Dynamic task addition is very powerful. We can define new work based on results.',
    quiz: [
      {
        question: 'کی میتونیم task جدید به group اضافه کنیم؟',
        options: ['فقط اول', 'قبل از تموم شدن group', 'هیوقت', 'فقط در for await'],
        correctIndex: 1,
        explanation: 'تا وقتی group تموم نشده، میتونیم task جدید اضافه کنیم.'
      }
    ]
  },
  {
    id: 29,
    title: 'Child Task Priority',
    titleEn: 'Child Task Priority',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'Child tasks priority والد رو inherit میکنن. میشه با addTask(priority:) تغییر داد.',
    descriptionEn: 'Child tasks inherit parent priority. Can be changed with addTask(priority:).',
    code: `import Foundation

func mixedPriorityTasks() async {
    await withTaskGroup(of: Void.self) { group in
        // Priority والد رو inherit میکنه
        group.addTask {
            print("Default priority: \\(Task.currentPriority)")
            await normalWork()
        }
        
        // Priority مشخص
        group.addTask(priority: .high) {
            print("High priority: \\(Task.currentPriority)")
            await importantWork()
        }
        
        group.addTask(priority: .background) {
            print("Background: \\(Task.currentPriority)")
            await cleanupWork()
        }
        
        group.addTask(priority: .userInitiated) {
            print("User initiated: \\(Task.currentPriority)")
            await userFacingWork()
        }
    }
}

// Priority inheritance
func parentTask() async {
    // Parent priority: .high
    await withTaskGroup(of: Void.self) { group in
        // Child priority: .high (inherited)
        group.addTask {
            await childWork()
        }
        
        // Child priority: .low (overridden)
        group.addTask(priority: .low) {
            await lowPriorityWork()
        }
    }
}

// نکته: priority بالاتر != اجرای سریعتر
// فقط تأثیر روی scheduling داره`,
    explanation: 'Priority inheritance یعنی child ها priority والد رو میگیرن مگر اینکه override بشه.',
    explanationEn: 'Priority inheritance means children get parent\'s priority unless overridden.',
    quiz: [
      {
        question: 'Child task چه priority ای داره؟',
        options: ['همیشه .medium', 'Priority والد', 'Priority خودش', '.background'],
        correctIndex: 1,
        explanation: 'Child tasks priority والد رو inherit میکنن.'
      }
    ]
  },
  {
    id: 30,
    title: 'Quiz: Structured Concurrency',
    titleEn: 'Quiz: Structured Concurrency',
    category: 'structured',
    categoryEn: 'Structured Concurrency',
    description: 'آزمون Structured Concurrency. مفاهیم کلیدی رو مرور کنید.',
    descriptionEn: 'Structured Concurrency quiz. Review key concepts.',
    code: `// کد زیر رو تحلیل کنید:
import Foundation

func analyze() async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        group.addTask {
            try await Task.sleep(for: .seconds(1))
            return "A"
        }
        group.addTask {
            try await Task.sleep(for: .seconds(2))
            throw URLError(.timedOut) // خطا!
        }
        group.addTask {
            try await Task.sleep(for: .seconds(3))
            return "C"
        }
        
        var results: [String] = []
        for try await r in group {
            results.append(r)
        }
        return results
    }
}

// سوال: چه اتفاقی میفته؟`,
    explanation: 'Task B خطا میده. باThrowingTaskGroup بقیه tasks cancel میشن و خطا throw میشه.',
    explanationEn: 'Task B throws. withThrowingTaskGroup cancels other tasks and rethrows the error.',
    quiz: [
      {
        question: 'Structured Concurrency چه تضمینی میده؟',
        options: ['سرعت بیشتر', 'Child tasks قبل از parent تموم میشن', 'بدون خطا هست', 'حافظه کمتر'],
        correctIndex: 1,
        explanation: 'Structured Concurrency تضمین میکنه child tasks قبل از parent تموم بشن.'
      },
      {
        question: 'کدوم درسته درباره withTaskGroup؟',
        options: ['Group رو میشه ذخیره کرد', 'فقط در closure قابل استفاده', 'Thread-specific هست', 'فقط 10 task مجازه'],
        correctIndex: 1,
        explanation: 'TaskGroup فقط در closure ش قابل استفاده هست و نمیشه ذخیره‌ش کرد.'
      }
    ]
  },

  // === TASKS 31-40 ===
  {
    id: 31,
    title: 'Task Lifecycle',
    titleEn: 'Task Lifecycle',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'چرخه عمر Task: created -> running -> suspended/completed/cancelled',
    descriptionEn: 'Task lifecycle: created -> running -> suspended/completed/cancelled',
    code: `import Foundation

// Task states
func taskLifecycle() async {
    let task = Task {
        // Created
        print("Starting...")
        
        // Running
        for i in 0..<10 {
            // Suspended at each await
            try? await Task.sleep(for: .milliseconds(100))
            print("Step \\(i)")
        }
        
        // Completed
        return "Done"
    }
    
    // دسترسی به state
    // task.isCancelled
    // task.value (await for completion)
    
    let result = await task.value
    print(result)
}

// Task handle
func taskHandle() async {
    let task: Task<Int, Error> = Task {
        return 42
    }
    
    // Cancel
    task.cancel()
    
    // Check
    print(task.isCancelled) // true
    
    // Wait for value
    do {
        let value = try await task.value
        print(value)
    } catch {
        print("Error or cancelled")
    }
}`,
    explanation: 'Task ها state های مختلفی دارن. مهمه بدونیم کی suspend و کی resume میشن.',
    explanationEn: 'Tasks have different states. It\'s important to know when they suspend and resume.',
    quiz: [
      {
        question: 'Task.value چه کاری میکنه؟',
        options: ['Task رو cancel میکنه', 'منتظر تکمیل Task میمونه', 'Task رو شروع میکنه', 'Priority رو تغییر میده'],
        correctIndex: 1,
        explanation: 'task.value منتظر تکمیل task میمونه و نتیجه رو برمیگردونه.'
      }
    ]
  },
  {
    id: 32,
    title: 'Task.yield()',
    titleEn: 'Task.yield()',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'Task.yield() یک suspension point voluntary هست. به runtime میگه میتونی بری کار دیگه انجام بدی.',
    descriptionEn: 'Task.yield() is a voluntary suspension point. Tells runtime it can do other work.',
    code: `import Foundation

// Yield برای cooperative multitasking
func longComputation() async -> Int {
    var result = 0
    
    for i in 0..<1_000_000 {
        // هر 10000 iteration یکبار yield کن
        if i % 10_000 == 0 {
            await Task.yield() // بقیه کار کنن
        }
        
        // Check cancellation
        if Task.isCancelled { return result }
        
        result += i
    }
    
    return result
}

// مثال عملی: processing large data
func processLargeFile() async -> [String] {
    var results: [String] = []
    let lines = getLines() // 100,000 lines
    
    for (index, line) in lines.enumerated() {
        if index % 1000 == 0 {
            await Task.yield() // اجازه بده UI update بشه
        }
        
        if Task.isCancelled { break }
        
        results.append(processLine(line))
    }
    
    return results
}

// تفاوت yield و sleep
// yield: فوراً برمیگرده، فقط یک suspension point
// sleep: مدت مشخصی صبر میکنه`,
    explanation: 'Task.yield() برای long-running loops مفیده. اجازه میده بقیه tasks هم اجرا بشن.',
    explanationEn: 'Task.yield() is useful for long-running loops. Allows other tasks to execute.',
    quiz: [
      {
        question: 'Task.yield() چه فرقی با Task.sleep داره؟',
        options: ['فرقی نداره', 'Yield فوراً برمیگرده، sleep تأخیر داره', 'Sleep سریعتره', 'Yield thread رو بلاک میکنه'],
        correctIndex: 1,
        explanation: 'Yield فقط یک suspension point هست و فوراً resume میشه. Sleep مدت مشخصی صبر میکنه.'
      }
    ]
  },
  {
    id: 33,
    title: 'Task Cancellation Patterns',
    titleEn: 'Task Cancellation Patterns',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'الگوهای مختلف برای مدیریت cancellation در task ها.',
    descriptionEn: 'Different patterns for managing cancellation in tasks.',
    code: `import Foundation

// Pattern 1: Check and return
func pattern1() async -> String? {
    for i in 0..<100 {
        if Task.isCancelled { return nil }
        await doWork(i)
    }
    return "Done"
}

// Pattern 2: Check and throw
func pattern2() async throws -> String {
    for i in 0..<100 {
        try Task.checkCancellation() // throws if cancelled
        await doWork(i)
    }
    return "Done"
}

// Pattern 3: With cleanup
func pattern3() async {
    let resource = acquireResource()
    
    do {
        for i in 0..<100 {
            try Task.checkCancellation()
            await process(resource, i)
        }
    } catch is CancellationError {
        // Cleanup
        releaseResource(resource)
        throw CancellationError()
    }
    
    releaseResource(resource)
}

// Pattern 4: withTaskCancellationHandler
func pattern4() async throws -> Data {
    let handle = startDownload()
    
    return try await withTaskCancellationHandler {
        try await handle.waitForCompletion()
    } onCancel: {
        handle.cancel() // Called when task is cancelled
    }
}

// Pattern 5: Debounce with cancellation
class SearchViewModel {
    var searchTask: Task<Void, Never>?
    
    func search(_ query: String) {
        searchTask?.cancel() // Cancel previous
        searchTask = Task {
            try? await Task.sleep(for: .milliseconds(300))
            if Task.isCancelled { return }
            await performSearch(query)
        }
    }
}`,
    explanation: 'الگوهای مختلف cancellation برای شرایط مختلف. مهمه cleanup مناسب داشته باشیم.',
    explanationEn: 'Different cancellation patterns for different situations. Important to have proper cleanup.',
    quiz: [
      {
        question: 'withTaskCancellationHandler برای چیست؟',
        options: ['ساخت Task', 'اجرای کد هنگام cancel شدن', 'تغییر priority', 'ذخیره state'],
        correctIndex: 1,
        explanation: 'onCancel closure وقتی task cancel بشه اجرا میشه.'
      }
    ]
  },
  {
    id: 34,
    title: 'Task.detached در عمق',
    titleEn: 'Task.detached in Depth',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'Task.detached یک task مستقل میسازه. از parent جدا هست و context اون رو inherit نمیکنه.',
    descriptionEn: 'Task.detached creates an independent task. Separate from parent and doesn\'t inherit its context.',
    code: `import Foundation

// Task vs Task.detached
func comparison() async {
    // Task: inherits context
    Task {
        // Same actor isolation as parent
        // Same task-local values
        // Cancellation propagates
        await work()
    }
    
    // Task.detached: independent
    Task.detached {
        // No actor isolation
        // No task-local values
        // Cancellation doesn't propagate
        await work()
    }
}

// کی از detached استفاده کنیم؟
// 1. وقتی نمیخوایم cancellation propagate بشه
// 2. وقتی actor isolation رو میشکنیم
// 3. Background work مستقل

// مثال: Background sync
class SyncManager {
    func startSync() {
        Task.detached(priority: .background) {
            // این حتی اگه parent cancel بشه
            // ادامه میده
            await self.performSync()
        }
    }
    
    func startCancellableSync() {
        Task(priority: .background) {
            // اگه parent cancel بشه، این هم cancel میشه
            await self.performSync()
        }
    }
}

// نکته: detached tasks رو خودتون باید manage کنید
let detached = Task.detached {
    await longRunningWork()
}
// بعداً cancel کنید اگه لازم شد
detached.cancel()`,
    explanation: 'Task.detached برای کارهای مستقل مفیده. ولی باید خودتون lifecycle ش رو مدیریت کنید.',
    explanationEn: 'Task.detached is useful for independent work. But you must manage its lifecycle yourself.',
    quiz: [
      {
        question: 'کی باید از Task.detached استفاده کنیم؟',
        options: ['همیشه', 'وقتی کار مستقل از parent لازمه', 'هرگز', 'فقط در UI'],
        correctIndex: 1,
        explanation: 'Task.detached وقتی استفاده میشه که کار مستقل از parent لازمه.'
      }
    ]
  },
  {
    id: 35,
    title: 'Task Priority Inheritance',
    titleEn: 'Task Priority Inheritance',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'Priority inheritance چطور کار میکنه و چه تأثیری روی scheduling داره.',
    descriptionEn: 'How priority inheritance works and its effect on scheduling.',
    code: `import Foundation

// Priority inheritance rules
func priorityDemo() async {
    // Parent: .high
    await Task(priority: .high) {
        print(Task.currentPriority) // .high
        
        // Child inherits .high
        await withTaskGroup(of: Void.self) { group in
            group.addTask {
                print(Task.currentPriority) // .high
            }
            
            // Override
            group.addTask(priority: .low) {
                print(Task.currentPriority) // .low
            }
        }
    }.value
}

// Priority escalation
// اگه parent .low باشه و child .high بخواد:
func priorityEscalation() async {
    await Task(priority: .low) {
        await withTaskGroup(of: Void.self) { group in
            // Child priority نمیتونه بالاتر از parent باشه
            // (در عمل، scheduler تصمیم میگیره)
            group.addTask(priority: .high) {
                // ممکنه .high باشه یا نه
                // بستگی به runtime داره
                await importantWork()
            }
        }
    }.value
}

// Best practice:
// - از priority مناسب استفاده کنید
// - UI work: .userInitiated
// - Data processing: .medium یا .utility
// - Background sync: .background`,
    explanation: 'Priority inheritance پیچیده هست. Runtime تصمیم نهایی رو میگیره.',
    explanationEn: 'Priority inheritance is complex. The runtime makes the final decision.',
    quiz: [
      {
        question: 'Child task priority میتونه از parent بالاتر باشه؟',
        options: ['بله همیشه', 'خیر هرگز', 'میشه درخواست داد ولی تضمینی نیست', 'فقط در Task.detached'],
        correctIndex: 2,
        explanation: 'میشه priority بالاتر درخواست داد ولی runtime تصمیم نهایی رو میگیره.'
      }
    ]
  },
  {
    id: 36,
    title: 'Concurrent Data Fetching',
    titleEn: 'Concurrent Data Fetching',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'الگوی عملی برای fetch کردن چندین داده به صورت همزمان.',
    descriptionEn: 'Practical pattern for fetching multiple data concurrently.',
    code: `import Foundation

struct UserProfile {
    let name: String
    let avatar: Data
    let posts: [Post]
    let followers: Int
}

struct Post: Codable { let id: Int; let title: String }

// ❌ Sequential - کند
func fetchProfileSlow(id: Int) async -> UserProfile {
    let name = await fetchName(id: id)       // 1s
    let avatar = await fetchAvatar(id: id)   // 1s
    let posts = await fetchPosts(id: id)     // 1s
    let followers = await fetchFollowers(id: id) // 1s
    // Total: 4 seconds!
    return UserProfile(name: name, avatar: avatar, 
                       posts: posts, followers: followers)
}

// ✅ Concurrent - سریع
func fetchProfileFast(id: Int) async -> UserProfile {
    async let name = fetchName(id: id)
    async let avatar = fetchAvatar(id: id)
    async let posts = fetchPosts(id: id)
    async let followers = fetchFollowers(id: id)
    
    // Total: ~1 second!
    return await UserProfile(
        name: name,
        avatar: avatar,
        posts: posts,
        followers: followers
    )
}

// ✅ با TaskGroup - برای تعداد نامشخص
func fetchMultipleProfiles(ids: [Int]) async -> [UserProfile] {
    await withTaskGroup(of: UserProfile.self) { group in
        for id in ids {
            group.addTask {
                await fetchProfileFast(id: id)
            }
        }
        
        var profiles: [UserProfile] = []
        for await profile in group {
            profiles.append(profile)
        }
        return profiles
    }
}`,
    explanation: 'async let برای تعداد مشخص و TaskGroup برای تعداد نامشخص مناسبه.',
    explanationEn: 'async let for known count, TaskGroup for unknown count.',
    quiz: [
      {
        question: 'برای fetch 5 API مختلف، کدوم بهتره؟',
        options: ['await sequential', 'async let parallel', 'Task.detached', 'DispatchQueue'],
        correctIndex: 1,
        explanation: 'async let برای تعداد مشخص عملیات موازی بهترین انتخابه.'
      }
    ]
  },
  {
    id: 37,
    title: 'Timeout Pattern',
    titleEn: 'Timeout Pattern',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'الگوی timeout برای عملیات‌های شبکه‌ای.',
    descriptionEn: 'Timeout pattern for network operations.',
    code: `import Foundation

enum TimeoutError: Error {
    case timedOut
}

// Timeout با TaskGroup
func withTimeout<T>(
    seconds: Double,
    operation: @escaping @Sendable () async throws -> T
) async throws -> T {
    try await withThrowingTaskGroup(of: T.self) { group in
        group.addTask {
            try await operation()
        }
        
        group.addTask {
            try await Task.sleep(for: .seconds(seconds))
            throw TimeoutError.timedOut
        }
        
        let result = try await group.next()!
        group.cancelAll() // Cancel the other task
        return result
    }
}

// استفاده
func fetchDataWithTimeout() async throws -> Data {
    try await withTimeout(seconds: 5) {
        let url = URL(string: "https://api.example.com/data")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
}

// Swift 5.9+ built-in
func modernTimeout() async throws -> Data {
    try await withTimeout(seconds: 5) {
        let url = URL(string: "https://api.example.com/data")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
}

// Retry with timeout
func fetchWithRetry(
    maxRetries: Int = 3,
    timeout: Double = 5
) async throws -> Data {
    for attempt in 0..<maxRetries {
        do {
            return try await withTimeout(seconds: timeout) {
                let url = URL(string: "https://api.example.com/data")!
                let (data, _) = try await URLSession.shared.data(from: url)
                return data
            }
        } catch {
            if attempt == maxRetries - 1 { throw error }
            try await Task.sleep(for: .seconds(Double(attempt + 1)))
        }
    }
    throw URLError(.unknown)
}`,
    explanation: 'Timeout pattern خیلی مهم برای network operations. با retry ترکیب بشه بهتره.',
    explanationEn: 'Timeout pattern is crucial for network operations. Best combined with retry.',
    quiz: [
      {
        question: 'در timeout pattern، وقتی timeout رخ بده چه میشه؟',
        options: ['عملیات ادامه میده', 'عملیات cancel و خطا throw میشه', 'برنامه crash میکنه', 'چیزی نمیشه'],
        correctIndex: 1,
        explanation: 'Timeout باعث cancel شدن عملیات و throw خطا میشه.'
      }
    ]
  },
  {
    id: 38,
    title: 'Race Pattern',
    titleEn: 'Race Pattern',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'الگوی Race: اولین task ای که تموم بشه برنده هست.',
    descriptionEn: 'Race pattern: first task to complete wins.',
    code: `import Foundation

// Race: اولین نتیجه رو بگیر
func race<T>(
    _ tasks: [@Sendable () async -> T]
) async -> T {
    await withTaskGroup(of: T.self) { group in
        for task in tasks {
            group.addTask {
                await task()
            }
        }
        
        // اولین نتیجه
        let winner = await group.next()!
        group.cancelAll() // بقیه رو cancel کن
        return winner
    }
}

// مثال: سریع‌ترین سرور
func fastestServer() async -> Data? {
    let servers = [
        "https://server1.example.com/data",
        "https://server2.example.com/data",
        "https://server3.example.com/data",
    ]
    
    return await race(servers.map { url in
        { 
            let (data, _) = try! await URLSession.shared.data(from: URL(string: url)!)
            return data
        }
    })
}

// Cache-or-network race
func cacheOrNetwork() async -> String {
    await race([
        { await fetchFromCache() },
        { await fetchFromNetwork() }
    ])
}

// اولین non-nil نتیجه
func firstValid<T>(
    _ tasks: [@Sendable () async -> T?]
) async -> T? {
    await withTaskGroup(of: T?.self) { group in
        for task in tasks {
            group.addTask { await task() }
        }
        
        for await result in group {
            if let valid = result {
                group.cancelAll()
                return valid
            }
        }
        return nil
    }
}`,
    explanation: 'Race pattern برای وقتی که چندین منبع داریم و اولین جواب کافی هست مفیده.',
    explanationEn: 'Race pattern is useful when we have multiple sources and first answer is enough.',
    quiz: [
      {
        question: 'در Race pattern بعد از گرفتن اولین نتیجه چه میکنیم؟',
        options: ['صبر میکنه بقیه هم تموم بشن', 'بقیه رو cancel میکنیم', 'خطا میده', 'همه رو برمیگردونه'],
        correctIndex: 1,
        explanation: 'بعد از اولین نتیجه، بقیه tasks رو cancel میکنیم چون نیازی بهشون نیست.'
      }
    ]
  },
  {
    id: 39,
    title: 'Fan-out / Fan-in',
    titleEn: 'Fan-out / Fan-in',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'الگوی Fan-out/Fan-in: پخش کار و جمع نتایج.',
    descriptionEn: 'Fan-out/Fan-in pattern: distribute work and collect results.',
    code: `import Foundation

// Fan-out: پخش کار بین tasks
// Fan-in: جمع نتایج
func fanOutFanIn(items: [String]) async -> [String] {
    await withTaskGroup(of: (Int, String).self) { group in
        // Fan-out
        for (index, item) in items.enumerated() {
            group.addTask {
                let processed = await processItem(item)
                return (index, processed) // index برای حفظ ترتیب
            }
        }
        
        // Fan-in
        var results = Array(repeating: "", count: items.count)
        for await (index, result) in group {
            results[index] = result
        }
        return results
    }
}

// Batch processing
func batchProcess<T, R>(
    items: [T],
    batchSize: Int,
    processor: @Sendable @escaping (T) async -> R
) async -> [R] {
    var allResults: [R] = []
    
    for batch in items.chunked(into: batchSize) {
        let batchResults = await withTaskGroup(of: R.self) { group in
            for item in batch {
                group.addTask {
                    await processor(item)
                }
            }
            
            var results: [R] = []
            for await result in group {
                results.append(result)
            }
            return results
        }
        allResults.append(contentsOf: batchResults)
    }
    
    return allResults
}

extension Array {
    func chunked(into size: Int) -> [[Element]] {
        stride(from: 0, to: count, by: size).map {
            Array(self[$0..<Swift.min($0 + size, count)])
        }
    }
}`,
    explanation: 'Fan-out/Fan-in برای پردازش batch داده‌ها عالی هست. ترتیب نتایج رو با index حفظ میکنیم.',
    explanationEn: 'Fan-out/Fan-in is great for batch data processing. We preserve order with index.',
    quiz: [
      {
        question: 'چرا index رو همراه نتیجه برمیگردونیم؟',
        options: ['برای debug', 'برای حفظ ترتیب نتایج', 'برای logging', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Tasks ممکنه به ترتیب مختلف تموم بشن. Index ترتیب اصلی رو حفظ میکنه.'
      }
    ]
  },
  {
    id: 40,
    title: 'Quiz: Tasks & TaskGroups',
    titleEn: 'Quiz: Tasks & TaskGroups',
    category: 'tasks',
    categoryEn: 'Tasks & TaskGroups',
    description: 'آزمون Tasks و TaskGroups.',
    descriptionEn: 'Tasks and TaskGroups quiz.',
    code: `// تحلیل کد:
import Foundation

func mystery2() async -> String {
    let task = Task.detached(priority: .background) {
        try? await Task.sleep(for: .seconds(1))
        return "Hello"
    }
    
    // Parent cancel بشه...
    // task.cancel()
    
    return await task.value
}

// سوال: اگه parent cancel بشه، task چی میشه؟`,
    explanation: 'Task.detached مستقل هست و از cancellation parent تأثیر نمیگیره.',
    explanationEn: 'Task.detached is independent and not affected by parent cancellation.',
    quiz: [
      {
        question: 'Task.yield() چه کاری میکنه؟',
        options: ['Task رو cancel میکنه', 'Suspension point voluntary', 'Thread عوض میکنه', 'خطا میده'],
        correctIndex: 1,
        explanation: 'Task.yield() یک voluntary suspension point هست.'
      },
      {
        question: 'کدوم pattern برای "اولین نتیجه" مناسبه؟',
        options: ['Fan-out', 'Race', 'Timeout', 'Sequential'],
        correctIndex: 1,
        explanation: 'Race pattern اولین task ای که تموم بشه رو برمیگردونه.'
      }
    ]
  },

  // === ACTORS 41-50 ===
  {
    id: 41,
    title: 'Actor چیست؟',
    titleEn: 'What is an Actor?',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'Actor یک reference type هست که از mutable state در برابر data races محافظت میکنه.',
    descriptionEn: 'An Actor is a reference type that protects mutable state from data races.',
    code: `import Foundation

// Actor - محافظت از state
actor BankAccount {
    private var balance: Double
    
    init(balance: Double) {
        self.balance = balance
    }
    
    // Actor methods خودکار isolated هستن
    func deposit(_ amount: Double) {
        balance += amount // Safe! فقط یک task در یک زمان
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
    
    func getBalance() -> Double {
        return balance
    }
}

// استفاده
let account = BankAccount(balance: 1000)

Task {
    await account.deposit(500)
    let balance = await account.getBalance()
    print(balance) // 1500
    
    let success = await account.withdraw(200)
    print(success) // true
}

// ❌ بدون actor - data race!
class UnsafeAccount {
    var balance: Double = 0 // هر thread میتونه تغییر بده!
}`,
    explanation: 'Actor تضمین میکنه فقط یک task در یک زمان به mutable state دسترسی داشته باشه.',
    explanationEn: 'Actor ensures only one task at a time can access mutable state.',
    quiz: [
      {
        question: 'Actor چه مشکلی رو حل میکنه؟',
        options: ['سرعت', 'Data race', 'حافظه', 'Network'],
        correctIndex: 1,
        explanation: 'Actor از data races جلوگیری میکنه با isolated access به state.'
      }
    ]
  },
  {
    id: 42,
    title: 'Actor Isolation',
    titleEn: 'Actor Isolation',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'Actor isolation یعنی تمام دسترسی‌ها به state از طریق await هستن.',
    descriptionEn: 'Actor isolation means all state access goes through await.',
    code: `import Foundation

actor Counter {
    var count: Int = 0
    
    func increment() {
        count += 1 // Safe - داخل actor
    }
    
    func getCount() -> Int {
        return count // Safe - داخل actor
    }
}

let counter = Counter()

Task {
    // ❌ نمیشه مستقیم دسترسی داشت
    // counter.count += 1 // Error!
    
    // ✅ باید await زد
    await counter.increment()
    let value = await counter.getCount()
    print(value) // 1
    
    // خواندن property هم await میخواد
    let c = await counter.count
    print(c) // 1
}

// nonisolated - بدون isolation
actor Logger {
    var logs: [String] = []
    
    // داخل actor - isolated
    func log(_ message: String) {
        logs.append(message)
    }
    
    // خارج از actor - nonisolated
    nonisolated func formatLogs() -> String {
        // نمیتونه به logs دسترسی مستقیم داشته باشه
        // چون nonisolated هست
        return "Formatted logs"
    }
    
    // nonisolated computed property
    nonisolated var logCount: Int {
        // نمیتونه به logs دسترسی داشته باشه
        return 0
    }
}`,
    explanation: 'Actor isolation تضمین میکنه تمام دسترسی‌ها به state sequential باشن.',
    explanationEn: 'Actor isolation ensures all state access is sequential.',
    quiz: [
      {
        question: 'برای خواندن actor property از بیرون چه لازمه؟',
        options: ['مستقیم بخونیم', 'await لازمه', 'lock لازمه', ' نمیشه خوند'],
        correctIndex: 1,
        explanation: 'دسترسی به actor state از بیرون حتماً باید با await باشه.'
      }
    ]
  },
  {
    id: 43,
    title: 'nonisolated',
    titleEn: 'nonisolated',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'nonisolated برای methods و properties ای که نیازی به actor protection ندارن.',
    descriptionEn: 'nonisolated for methods and properties that don\'t need actor protection.',
    code: `import Foundation

actor DataManager {
    private var cache: [String: Data] = [:]
    let id: UUID // immutable - نیاز به isolation نداره
    
    init() {
        self.id = UUID()
    }
    
    // Isolated - نیاز به await از بیرون
    func store(key: String, data: Data) {
        cache[key] = data
    }
    
    // Isolated
    func retrieve(key: String) -> Data? {
        return cache[key]
    }
    
    // nonisolated - بدون await قابل دسترسی
    nonisolated var identifier: UUID {
        return id // immutable, safe
    }
    
    // nonisolated method
    nonisolated func description() -> String {
        return "DataManager(\\(id))"
    }
    
    // nonisolated async - میتونه await بزنه
    nonisolated func syncWithServer() async {
        // میتونه کارهای async انجام بده
        // ولی نمیتونه مستقیم به cache دسترسی داشته باشه
        let data = await fetchData()
        await self.store(key: "server", data: data)
    }
}

// استفاده
let manager = DataManager()
print(manager.identifier) // بدون await!
print(manager.description()) // بدون await!`,
    explanation: 'nonisolated برای immutable properties و methods ای که به mutable state دسترسی ندارن مفیده.',
    explanationEn: 'nonisolated is useful for immutable properties and methods that don\'t access mutable state.',
    quiz: [
      {
        question: 'nonisolated property چه ویژگی‌ای داره؟',
        options: ['سریعتره', 'بدون await قابل دسترسی', 'thread-safe نیست', 'فقط در struct'],
        correctIndex: 1,
        explanation: 'nonisolated properties بدون await از بیرون actor قابل دسترسی هستن.'
      }
    ]
  },
  {
    id: 44,
    title: 'Reentrancy در Actors',
    titleEn: 'Reentrancy in Actors',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'Actors reentrant هستن. بین await ها، task های دیگه میتونن وارد بشن.',
    descriptionEn: 'Actors are reentrant. Between awaits, other tasks can enter.',
    code: `import Foundation

actor ReentrancyDemo {
    var value: Int = 0
    
    func doWork() async {
        value = 1
        print("Step 1: value = \\(value)")
        
        // اینجا suspend میشه
        // Task دیگه میتونه وارد بشه!
        await Task.yield()
        
        // ممکنه value عوض شده باشه!
        print("Step 2: value = \\(value)")
        value = value + 1
    }
    
    func changeValue() {
        value = 999
    }
}

let demo = ReentrancyDemo()

Task {
    await demo.doWork()
}

Task {
    await demo.changeValue()
}

// خروجی ممکنه:
// Step 1: value = 1
// Step 2: value = 999  (تغییر کرده!)

// راه‌حل: state رو local نگه دارید
actor SafeDemo {
    func doWork() async -> Int {
        var localValue = 1 // local - امن
        print("Step 1: \\(localValue)")
        
        await Task.yield()
        
        // localValue عوض نشده
        print("Step 2: \\(localValue)")
        return localValue + 1
    }
}`,
    explanation: 'Reentrancy یعنی بین await ها، state میتونه تغییر کنه. باید حواسمون باشه!',
    explanationEn: 'Reentrancy means between awaits, state can change. We must be careful!',
    quiz: [
      {
        question: 'Reentrancy یعنی چه؟',
        options: ['Actor قفل میشه', 'بین await ها task های دیگه میتونن وارد بشن', 'Actor کند میشه', 'Actor crash میکنه'],
        correctIndex: 1,
        explanation: 'Reentrancy یعنی بین suspension points، task های دیگه میتونن به actor دسترسی پیدا کنن.'
      }
    ]
  },
  {
    id: 45,
    title: '@MainActor',
    titleEn: '@MainActor',
    category: 'actors',
    categoryEn: 'Actors',
    description: '@MainActor یک actor global هست که تضمین میکنه کد در main thread اجرا بشه.',
    descriptionEn: '@MainActor is a global actor that ensures code runs on the main thread.',
    code: `import SwiftUI

// @MainActor class
@MainActor
class AppViewModel: ObservableObject {
    @Published var title: String = ""
    @Published var items: [String] = []
    @Published var isLoading: Bool = false
    
    func loadItems() async {
        isLoading = true // Safe - MainActor
        
        let data = await fetchData() // suspend
        
        // بعد از await، هنوز MainActor هستیم
        // (چون whole class isolated هست)
        items = data
        isLoading = false
    }
}

// @MainActor روی property
class MixedViewModel: ObservableObject {
    @MainActor @Published var uiState: String = ""
    var backgroundData: Int = 0 // MainActor نیست
    
    @MainActor
    func updateUI() {
        uiState = "Updated" // Safe
    }
    
    func backgroundWork() async {
        let result = await compute()
        // اینجا MainActor نیستیم
        
        await MainActor.run {
            self.uiState = result // Safe
        }
    }
}

// @MainActor function
@MainActor
func updateAllUI() async {
    // همه چیز در main thread
    let data = await fetchData()
    // بعد از await، هنوز main thread
    // چون @MainActor هست
}

// SwiftUI Views خودکار @MainActor هستن
struct ContentView: View {
    @StateObject var vm = AppViewModel()
    
    var body: some View {
        Text(vm.title) // Safe
    }
}`,
    explanation: '@MainActor برای UI work ضروری هست. SwiftUI views خودکار @MainActor هستن.',
    explanationEn: '@MainActor is essential for UI work. SwiftUI views are automatically @MainActor.',
    quiz: [
      {
        question: 'SwiftUI View چه actor isolation ای داره؟',
        options: ['هیچ', '@MainActor', 'Actor معمولی', 'nonisolated'],
        correctIndex: 1,
        explanation: 'SwiftUI views خودکار @MainActor هستن.'
      }
    ]
  },
  {
    id: 46,
    title: 'Custom Global Actors',
    titleEn: 'Custom Global Actors',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'میشه global actor های سفارشی ساخت برای domain-specific isolation.',
    descriptionEn: 'We can create custom global actors for domain-specific isolation.',
    code: `import Foundation

// Custom global actor
@globalActor
actor DatabaseActor {
    static let shared = DatabaseActor()
}

@DatabaseActor
class DatabaseManager {
    private var connections: [String: Connection] = [:]
    
    func query(_ sql: String) async -> [Row] {
        // فقط یک task در یک زمان اینجا
        return await executeQuery(sql)
    }
    
    func insert(_ row: Row) async {
        await executeInsert(row)
    }
}

// استفاده
@DatabaseActor
func setupDatabase() async {
    let db = DatabaseManager()
    await db.query("CREATE TABLE users...")
}

// Network actor
@globalActor
actor NetworkActor {
    static let shared = NetworkActor()
    private var activeRequests: Int = 0
}

@NetworkActor
class NetworkManager {
    func request(_ url: URL) async throws -> Data {
        // Rate limiting, connection pooling, etc.
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
}

// Multiple global actors = parallel execution
func parallelDomains() async {
    async let db = DatabaseActor.shared.run {
        await databaseWork()
    }
    async let net = NetworkActor.shared.run {
        await networkWork()
    }
    // اینا میتونن موازی اجرا بشن
    // چون actor های متفاوت هستن
    let _ = await db
    let _ = await net
}`,
    explanation: 'Custom global actors برای domain-specific isolation مفیدن. هر actor یک executor جدا داره.',
    explanationEn: 'Custom global actors are useful for domain-specific isolation. Each actor has a separate executor.',
    quiz: [
      {
        question: 'Custom global actor چه مزیتی داره؟',
        options: ['سرعت بیشتر', 'Domain-specific isolation', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Custom global actors اجازه میدن isolation مخصوص هر domain بسازیم.'
      }
    ]
  },
  {
    id: 47,
    title: 'Actor Inheritance',
    titleEn: 'Actor Inheritance',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'Actor ها محدودیت‌های ارث‌بری دارن. فقط از class های non-isolated میتونن ارث ببرن.',
    descriptionEn: 'Actors have inheritance limitations. They can only inherit from non-isolated classes.',
    code: `import Foundation

// ✅ Actor از class معمولی ارث میبره
class BaseClass {
    func baseMethod() {
        print("Base")
    }
}

actor MyActor: BaseClass {
    var data: Int = 0
    
    func actorMethod() {
        baseMethod() // OK
        data += 1
    }
}

// ❌ Actor از actor دیگه نمیتونه ارث ببره
// actor Child: ParentActor { } // Error!

// ❌ Actor از @MainActor class نمیتونه ارث ببره
// @MainActor class UI { }
// actor MyActor: UI { } // Error!

// ✅ Protocol conformance
protocol Storable {
    func save() async
    func load() async -> Data?
}

actor FileStore: Storable {
    var data: Data?
    
    func save() async {
        // save to file
    }
    
    func load() async -> Data? {
        return data
    }
}

// Actor از NSObject ارث میبره (برای Objective-C)
actor ObjCActor: NSObject {
    @objc func legacyMethod() {
        // باید nonisolated باشه یا sync
    }
}`,
    explanation: 'Actor ها نمیتونن از actor دیگه ارث ببرن. فقط از non-isolated class ها.',
    explanationEn: 'Actors can\'t inherit from other actors. Only from non-isolated classes.',
    quiz: [
      {
        question: 'Actor میتونه از actor دیگه ارث ببره؟',
        options: ['بله', 'خیر', 'فقط با protocol', 'فقط در Swift 6'],
        correctIndex: 1,
        explanation: 'Actor ها نمیتونن از actor دیگه ارث ببرن.'
      }
    ]
  },
  {
    id: 48,
    title: 'Actor vs Class',
    titleEn: 'Actor vs Class',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'مقایسه Actor و Class و کی از هر کدوم استفاده کنیم.',
    descriptionEn: 'Comparing Actor and Class and when to use each.',
    code: `import Foundation

// Class - بدون protection
class UnsafeCounter {
    var count = 0
    
    func increment() {
        count += 1 // Data race possible!
    }
}

// Actor - با protection
actor SafeCounter {
    var count = 0
    
    func increment() {
        count += 1 // Safe!
    }
}

// کی از Actor استفاده کنیم؟
// ✅ Mutable shared state
// ✅ نیاز به thread safety
// ✅ داده‌هایی که از چند Task دسترسی میشن

// کی از Class استفاده کنیم؟
// ✅ Immutable state
// ✅ UI models (با @MainActor)
// ✅ وقتی performance مهمه (actor overhead داره)

// Actor overhead
actor HeavyActor {
    var items: [Int] = []
    
    func addItem(_ item: Int) {
        items.append(item)
    }
    
    func processAll() -> Int {
        return items.reduce(0, +)
    }
}

// هر فراخوانی await لازمه
// حتی برای read-only
let actor = HeavyActor()
await actor.addItem(1) // await
let sum = await actor.processAll() // await

// راه‌حل: nonisolated برای reads
actor OptimizedActor {
    private var _items: [Int] = []
    
    func addItem(_ item: Int) {
        _items.append(item)
    }
    
    nonisolated func snapshot() -> [Int] {
        // یک کپی برمیگردونه
        // بدون نیاز به await
        return [] // باید با mechanism درست پیاده‌سازی بشه
    }
}`,
    explanation: 'Actor overhead داره. برای read-only immutable data از class استفاده کنید.',
    explanationEn: 'Actor has overhead. Use class for read-only immutable data.',
    quiz: [
      {
        question: 'کی Actor بهتر از Class هست؟',
        options: ['همیشه', 'وقتی mutable shared state داریم', 'هرگز', 'فقط در UI'],
        correctIndex: 1,
        explanation: 'Actor برای mutable shared state بین tasks مختلف مناسبه.'
      }
    ]
  },
  {
    id: 49,
    title: 'Synchronization with Actors',
    titleEn: 'Synchronization with Actors',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'الگوهای sync کردن data بین actor ها.',
    descriptionEn: 'Patterns for synchronizing data between actors.',
    code: `import Foundation

actor UserCache {
    private var users: [Int: String] = [:]
    
    func getUser(id: Int) -> String? {
        return users[id]
    }
    
    func setUser(id: Int, name: String) {
        users[id] = name
    }
    
    func getAllUsers() -> [Int: String] {
        return users
    }
}

actor AnalyticsTracker {
    private var events: [String] = []
    
    func track(_ event: String) {
        events.append(event)
    }
    
    func getEvents() -> [String] {
        return events
    }
}

// انتقال data بین actors
func syncData() async {
    let cache = UserCache()
    let analytics = AnalyticsTracker()
    
    await cache.setUser(id: 1, name: "Ali")
    await cache.setUser(id: 2, name: "Sara")
    
    // گرفتن data از یک actor
    let allUsers = await cache.getAllUsers()
    
    // فرستادن به actor دیگه
    for (id, name) in allUsers {
        await analytics.track("User loaded: \\(name)")
    }
}

// Atomic update across actors
actor TransactionManager {
    func transfer(
        from source: BankAccount,
        to destination: BankAccount,
        amount: Double
    ) async -> Bool {
        // هر دو actor پشت سر هم
        let success = await source.withdraw(amount)
        if success {
            await destination.deposit(amount)
            return true
        }
        return false
    }
}

actor BankAccount {
    var balance: Double
    
    init(balance: Double) { self.balance = balance }
    
    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
    
    func deposit(_ amount: Double) {
        balance += amount
    }
}`,
    explanation: 'برای sync بین actors، data رو از یکی بگیریم و به دیگری بدیم. انتقال atomic نیست!',
    explanationEn: 'For sync between actors, take data from one and give to another. Transfer is not atomic!',
    quiz: [
      {
        question: 'آیا انتقال بین دو actor atomic هست؟',
        options: ['بله', 'خیر', 'فقط در Swift 6', 'بستگی داره'],
        correctIndex: 1,
        explanation: 'بین await ها، state میتونه عوض بشه. پس atomic نیست.'
      }
    ]
  },
  {
    id: 50,
    title: 'Quiz: Actors',
    titleEn: 'Quiz: Actors',
    category: 'actors',
    categoryEn: 'Actors',
    description: 'آزمون Actors. مفاهیم کلیدی رو مرور کنید.',
    descriptionEn: 'Actors quiz. Review key concepts.',
    code: `// تحلیل:
actor Counter {
    var count = 0
    
    func increment() async {
        let current = count
        await Task.yield() // suspension!
        count = current + 1 // ممکنه اشتباه باشه!
    }
}

// سوال: اگه دو task همزمان increment صدا بزنن چه میشه؟`,
    explanation: 'به خاطر reentrancy، ممکنه هر دو task مقدار یکسان بخونن و count فقط 1 اضافه بشه.',
    explanationEn: 'Due to reentrancy, both tasks might read the same value and count only increases by 1.',
    quiz: [
      {
        question: 'Actor چه تضمینی میده؟',
        options: ['سرعت بالا', 'فقط یک task در یک زمان به state دسترسی داره', 'بدون خطا', 'حافظه نامحدود'],
        correctIndex: 1,
        explanation: 'Actor تضمین میکنه فقط یک task در یک زمان به mutable state دسترسی داشته باشه.'
      },
      {
        question: 'Reentrancy چه خطری داره؟',
        options: ['سرعت کم', 'بین await ها state میتونه عوض بشه', 'Crash', 'Memory leak'],
        correctIndex: 1,
        explanation: 'Reentrancy یعنی بین await ها task های دیگه میتونن state رو تغییر بدن.'
      }
    ]
  },

  // === SENDABLE 51-60 ===
  {
    id: 51,
    title: 'Sendable Protocol',
    titleEn: 'Sendable Protocol',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'Sendable نشون میده یک type میتونه安全 بین concurrency domains منتقل بشه.',
    descriptionEn: 'Sendable indicates a type can be safely transferred between concurrency domains.',
    code: `import Foundation

// Sendable types:
// 1. Value types (struct, enum) با Sendable properties
// 2. Actor ها
// 3. Immutable class ها
// 4. @Sendable closures

// ✅ Struct با Sendable properties
struct User: Sendable {
    let id: Int
    let name: String
}

// ✅ Enum
enum Status: Sendable {
    case active
    case inactive
}

// ❌ Class بدون Sendable
class MutableData {
    var value: Int = 0 // mutable!
}

// ✅ Immutable class
final class ImmutableConfig: Sendable {
    let apiKey: String
    let baseUrl: URL
    
    init(apiKey: String, baseUrl: URL) {
        self.apiKey = apiKey
        self.baseUrl = baseUrl
    }
}

// ✅ Actor خودکار Sendable هست
actor DataManager {
    var data: [String] = []
}

// انتقال بین domains
func processData() async {
    let user = User(id: 1, name: "Ali") // Sendable
    
    await Task.detached {
        // user رو میتونیم safe منتقل کنیم
        print(user.name)
    }.value
}`,
    explanation: 'Sendable compiler رو مطمئن میکنه که انتقال data بین concurrency domains safe هست.',
    explanationEn: 'Sendable assures the compiler that transferring data between concurrency domains is safe.',
    quiz: [
      {
        question: 'کدوم type خودکار Sendable هست؟',
        options: ['Class', 'Struct با let properties', 'Actor', 'هر دو ب و ج'],
        correctIndex: 3,
        explanation: 'هم struct با immutable properties و هم actor ها Sendable هستن.'
      }
    ]
  },
  {
    id: 52,
    title: '@Sendable Closures',
    titleEn: '@Sendable Closures',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: '@Sendable closures میتونن بین concurrency domains منتقل بشن.',
    descriptionEn: '@Sendable closures can be transferred between concurrency domains.',
    code: `import Foundation

// @Sendable closure
let sendableClosure: @Sendable () -> String = {
    return "Hello from sendable closure"
}

// Task closure خودکار @Sendable هست
Task {
    // این closure @Sendable هست
    print("In task")
}

// تابعی که @Sendable closure میگیره
func performAsync(
    _ operation: @escaping @Sendable () async -> String
) async -> String {
    await operation()
}

// استفاده
Task {
    let result = await performAsync {
        // این closure @Sendable هست
        // نمیتونه mutable state از بیرون capture کنه
        return "Result"
    }
    print(result)
}

// ❌ Error: capture mutable state
var counter = 0
Task {
    // counter += 1 // Error! Can't capture mutable var
    print("Can't modify counter")
}

// ✅ راه‌حل: let یا Sendable type
let message = "Hello"
Task {
    print(message) // OK - immutable
}

// @Sendable در function types
typealias AsyncOperation = @Sendable () async -> Void

func schedule(_ op: AsyncOperation) {
    Task {
        await op()
    }
}`,
    explanation: '@Sendable closure ها فقط میتونن Sendable values رو capture کنن.',
    explanationEn: '@Sendable closures can only capture Sendable values.',
    quiz: [
      {
        question: 'Task closure چه نوعی هست؟',
        options: ['Normal', '@Sendable', 'nonisolated', 'async فقط'],
        correctIndex: 1,
        explanation: 'Task closure خودکار @Sendable هست.'
      }
    ]
  },
  {
    id: 53,
    title: 'Non-Sendable Types',
    titleEn: 'Non-Sendable Types',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'بعضی types نمیتونن Sendable باشن. باید بدونیم چرا و چطور handle کنیم.',
    descriptionEn: 'Some types can\'t be Sendable. We need to know why and how to handle them.',
    code: `import Foundation

// ❌ Non-Sendable types:

// 1. Mutable class
class MutableBox {
    var value: Int = 0
}

// 2. Class با mutable properties
class ViewModel {
    var data: String = ""
    var isLoading: Bool = false
}

// 3. Global mutable state
var globalCounter = 0

// ✅ راه‌حل‌ها:

// 1. Actor
actor SafeBox {
    var value: Int = 0
}

// 2. @MainActor
@MainActor
class SafeViewModel {
    var data: String = ""
    var isLoading: Bool = false
}

// 3. Immutable class
final class Config: Sendable {
    let value: Int
    init(value: Int) { self.value = value }
}

// 4. Struct (value type)
struct SafeData: Sendable {
    var value: Int
    var name: String
}

// @unchecked Sendable - وقتی مطمئنیم safe هست
final class ThreadSafeCache: @unchecked Sendable {
    private let lock = NSLock()
    private var storage: [String: Any] = [:]
    
    func get(_ key: String) -> Any? {
        lock.lock()
        defer { lock.unlock() }
        return storage[key]
    }
    
    func set(_ key: String, value: Any) {
        lock.lock()
        defer { lock.unlock() }
        storage[key] = value
    }
}`,
    explanation: '@unchecked Sendable وقتی استفاده میشه که خودمون thread safety رو تضمین کنیم.',
    explanationEn: '@unchecked Sendable is used when we guarantee thread safety ourselves.',
    quiz: [
      {
        question: '@unchecked Sendable یعنی چه؟',
        options: ['Sendable نیست', 'Compiler چک نمیکنه، خودمون تضمین میکنیم', 'فقط در debug', 'Deprecated'],
        correctIndex: 1,
        explanation: '@unchecked Sendable به compiler میگه چک نکنه. مسئولیت با ماست.'
      }
    ]
  },
  {
    id: 54,
    title: 'Sendable و Generics',
    titleEn: 'Sendable with Generics',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'چطور Sendable رو با generics استفاده کنیم.',
    descriptionEn: 'How to use Sendable with generics.',
    code: `import Foundation

// Generic Sendable container
struct Box<T: Sendable>: Sendable {
    let value: T
}

// Generic function با Sendable constraint
func process<T: Sendable>(_ value: T) async -> T {
    await Task.detached {
        return value
    }.value
}

// Generic actor
actor Store<T: Sendable> {
    private var items: [T] = []
    
    func add(_ item: T) {
        items.append(item)
    }
    
    func getAll() -> [T] {
        return items
    }
}

// استفاده
let intBox = Box(value: 42)
let stringBox = Box(value: "Hello")

Task {
    let result = await process(intBox.value)
    print(result) // 42
}

// Generic async function
func asyncMap<T: Sendable, U: Sendable>(
    _ items: [T],
    transform: @escaping @Sendable (T) async -> U
) async -> [U] {
    await withTaskGroup(of: (Int, U).self) { group in
        for (index, item) in items.enumerated() {
            group.addTask {
                let result = await transform(item)
                return (index, result)
            }
        }
        
        var results = Array<U?>(repeating: nil, count: items.count)
        for await (index, result) in group {
            results[index] = result
        }
        return results.compactMap { $0 }
    }
}

// استفاده
let numbers = [1, 2, 3, 4, 5]
let doubled = await asyncMap(numbers) { $0 * 2 }
print(doubled) // [2, 4, 6, 8, 10]`,
    explanation: 'Generic constraints با Sendable تضمین میکنن type safety در concurrency.',
    explanationEn: 'Generic constraints with Sendable ensure type safety in concurrency.',
    quiz: [
      {
        question: 'چرا generic type رو Sendable constraint میکنیم؟',
        options: ['سرعت', 'اطمینان از safe transfer', 'حافظه', 'syntax'],
        correctIndex: 1,
        explanation: 'Sendable constraint تضمین میکنه type safe بین concurrency domains منتقل بشه.'
      }
    ]
  },
  {
    id: 55,
    title: 'Region-based Isolation',
    titleEn: 'Region-based Isolation',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'Swift 6 region-based isolation رو معرفی میکنه. non-Sendable values میتونن منتقل بشن اگه region شون isolated باشه.',
    descriptionEn: 'Swift 6 introduces region-based isolation. Non-Sendable values can transfer if their region is isolated.',
    code: `import Foundation

// Swift 5: strict Sendable checking
// Swift 6: region-based isolation

class MyClass {
    var value: Int = 0
}

// Swift 6: اگر مطمئن باشیم object فقط در یک region هست
func swift6Example() async {
    let obj = MyClass() // created here
    
    // In Swift 6, compiler can prove
    // obj is only used in this task
    obj.value = 42
    
    // Can send to another context
    // because it's the only reference
    await Task.detached {
        obj.value = 100 // OK in Swift 6!
    }.value
}

// Region isolation rules:
// 1. Value must have single owner
// 2. No other references exist
// 3. Compiler can prove isolation

// مثال عملی
func createAndTransfer() async {
    // Created in this context
    let viewModel = MyViewModel()
    
    // Configure
    viewModel.title = "Hello"
    viewModel.count = 42
    
    // Transfer to MainActor
    // Swift 6 knows viewModel has single owner
    await MainActor.run {
        viewModel.title = "Updated" // OK!
    }
}

class MyViewModel {
    var title: String = ""
    var count: Int = 0
}

// ⚠️ اگر reference sharing بشه:
func sharedReference() async {
    let obj = MyClass()
    let ref = obj // shared reference!
    
    // حالا compiler نمیشه guarantee کنه
    // obj فقط در یک region هست
    await Task.detached {
        // obj.value = 1 // Error! Reference shared
    }.value
}`,
    explanation: 'Region-based isolation در Swift 6 اجازه میده non-Sendable values منتقل بشن اگه reference sharing نباشه.',
    explanationEn: 'Region-based isolation in Swift 6 allows non-Sendable values to transfer if no reference sharing.',
    quiz: [
      {
        question: 'Region-based isolation چه کاری میکنه؟',
        options: ['Sendable رو حذف میکنه', 'اجازه میده non-Sendable منتقل بشه اگه isolated باشه', 'Actor رو حذف میکنه', 'سرعت بیشتر'],
        correctIndex: 1,
        explanation: 'Region-based isolation اجازه میده non-Sendable values منتقل بشن اگه فقط یک owner داشته باشن.'
      }
    ]
  },
  {
    id: 56,
    title: 'Data Race Safety',
    titleEn: 'Data Race Safety',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'چطور Swift 6 data races رو در compile time تشخیص میده.',
    descriptionEn: 'How Swift 6 detects data races at compile time.',
    code: `import Foundation

// Swift 6: Strict concurrency checking
// -data-race-check=complete

// ❌ Data race - Swift 6 error
class UnsafeModel {
    var data: String = ""
    
    func update() {
        data = "new" // ممکنه همزمان دسترسی بشه
    }
}

// ✅ Actor - safe
actor SafeModel {
    var data: String = ""
    
    func update() {
        data = "new" // Safe
    }
}

// ✅ @MainActor - safe
@MainActor
class UIMode {
    var data: String = ""
    
    func update() {
        data = "new" // Safe - main thread only
    }
}

// ✅ let - immutable
class ImmutableModel {
    let data: String // immutable
    init(data: String) { self.data = data }
}

// Sendable checking
func processData() async {
    let safe = SafeModel()
    let ui = UIMode()
    let immutable = ImmutableModel(data: "test")
    
    // All safe to transfer
    await Task.detached {
        await safe.update()
    }.value
    
    await MainActor.run {
        ui.update()
    }
    
    // immutable - no await needed
    print(immutable.data)
}

// Compile-time guarantees:
// Swift 6 ensures NO data races at compile time
// اگر compile بشه = data race نداره!`,
    explanation: 'Swift 6 strict concurrency checking تضمین میکنه اگه کد compile بشه، data race نداره.',
    explanationEn: 'Swift 6 strict concurrency checking ensures if code compiles, no data races exist.',
    quiz: [
      {
        question: 'مزیت اصلی Swift 6 concurrency چیه؟',
        options: ['سرعت بیشتر', 'Data race detection در compile time', 'کد کمتر', 'API بهتر'],
        correctIndex: 1,
        explanation: 'Swift 6 data races رو در compile time تشخیص میده.'
      }
    ]
  },
  {
    id: 57,
    title: 'Isolation Crossing',
    titleEn: 'Isolation Crossing',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'وقتی data بین isolation domains مختلف منتقل میشه چه اتفاقی میفته.',
    descriptionEn: 'What happens when data crosses isolation domain boundaries.',
    code: `import Foundation

// Isolation domains:
// 1. MainActor
// 2. Custom actors
// 3. Nonisolated

@MainActor
class UIModel {
    var title: String = ""
}

actor DatabaseModel {
    var records: [String] = []
}

// Crossing isolation boundaries
func crossBoundaries() async {
    let ui = UIModel()
    let db = DatabaseModel()
    
    // MainActor -> nonisolated
    let title = ui.title // await لازم نیست (read)
    
    // nonisolated -> MainActor
    await MainActor.run {
        ui.title = "Updated"
    }
    
    // Actor -> Actor
    let records = await db.records
    await MainActor.run {
        ui.title = records.joined()
    }
}

// Sending values
// Swift 6: 'sending' keyword
func process(_ value: sending MyClass) async {
    // value الان در این isolation domain هست
    await doWork(value)
}

// Non-Sendable crossing
// ❌ Error in strict mode
// func bad(_ model: UIModel) async {
//     await Task.detached {
//         model.title = "Bad" // Error!
//     }.value
// }

// ✅ راه‌حل: Send یا copy
func good(_ model: UIModel) async {
    // در همون domain بمونه
    await MainActor.run {
        model.title = "Good"
    }
}`,
    explanation: 'Crossing isolation boundaries نیاز به synchronization داره. Swift compiler این رو check میکنه.',
    explanationEn: 'Crossing isolation boundaries requires synchronization. Swift compiler checks this.',
    quiz: [
      {
        question: 'Crossing isolation boundary چه لازمه؟',
        options: ['هیچی', 'await یا synchronization', 'lock', 'unsafeBitCast'],
        correctIndex: 1,
        explanation: 'Crossing isolation boundaries نیاز به await یا مکانیزم sync داره.'
      }
    ]
  },
  {
    id: 58,
    title: 'Mutable Value Semantics',
    titleEn: 'Mutable Value Semantics',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'Value types و mutable value semantics در concurrency.',
    descriptionEn: 'Value types and mutable value semantics in concurrency.',
    code: `import Foundation

// Value types are naturally Sendable
struct Point: Sendable {
    var x: Double
    var y: Double
}

// Mutable value semantics
struct MutablePoint {
    var x: Double
    var y: Double
    
    mutating func move(dx: Double, dy: Double) {
        x += dx
        y += dy
    }
}

// Value semantics in concurrency
func valueSemantics() async {
    var point = Point(x: 0, y: 0)
    
    // Copy happens here
    let copy = point
    
    // Modify original
    point.x = 10
    
    // Copy unchanged
    print(copy.x) // 0
    print(point.x) // 10
}

// Reference type wrapper با value semantics
final class StorageRef<T> {
    var value: T
    init(_ value: T) { self.value = value }
}

struct ValueBox<T> {
    private var ref: StorageRef<T>
    
    init(_ value: T) {
        ref = StorageRef(value)
    }
    
    var value: T {
        get { ref.value }
        set {
            // Copy on write
            if !isKnownUniquelyReferenced(&ref) {
                ref = StorageRef(newValue)
            } else {
                ref.value = newValue
            }
        }
    }
}

// استفاده
var box1 = ValueBox(42)
var box2 = box1 // shared reference

box1.value = 100 // copy on write!
print(box2.value) // 42 - unchanged!`,
    explanation: 'Value semantics یعنی هر modification یک copy میسازه. این در concurrency خیلی safe هست.',
    explanationEn: 'Value semantics means each modification creates a copy. This is very safe in concurrency.',
    quiz: [
      {
        question: 'Value semantics چه مزیتی در concurrency داره؟',
        options: ['سرعت', 'هر modify یک copy هست - بدون data race', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Value semantics یعنی modification ها روی copy انجام میشن. پس data race نمیشه.'
      }
    ]
  },
  {
    id: 59,
    title: 'Practical Sendable Patterns',
    titleEn: 'Practical Sendable Patterns',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'الگوهای عملی برای استفاده از Sendable در پروژه‌های واقعی.',
    descriptionEn: 'Practical patterns for using Sendable in real projects.',
    code: `import Foundation

// Pattern 1: DTO (Data Transfer Object)
struct UserDTO: Codable, Sendable {
    let id: Int
    let name: String
    let email: String
}

// Pattern 2: Configuration
struct AppConfig: Sendable {
    let apiBaseUrl: URL
    let timeout: TimeInterval
    let maxRetries: Int
    
    static let production = AppConfig(
        apiBaseUrl: URL(string: "https://api.prod.com")!,
        timeout: 30,
        maxRetries: 3
    )
}

// Pattern 3: Result wrapper
enum AppResult<T: Sendable>: Sendable {
    case success(T)
    case failure(AppError)
}

enum AppError: Error, Sendable {
    case network
    case decoding
    case unknown
}

// Pattern 4: Event system
struct AppEvent: Sendable {
    let type: EventType
    let timestamp: Date
    let data: [String: String]
}

enum EventType: String, Sendable {
    case userLogin
    case dataLoaded
    case error
}

// Pattern 5: Repository pattern
protocol Repository: Sendable {
    associatedtype Entity: Sendable
    func fetch(id: String) async throws -> Entity
    func save(_ entity: Entity) async throws
}

// Pattern 6: ViewModel with Sendable state
@MainActor
class ProfileViewModel: ObservableObject {
    @Published var user: UserDTO?
    @Published var error: AppError?
    @Published var isLoading = false
    
    private let repository: any Repository<UserDTO>
    
    init(repository: any Repository<UserDTO>) {
        self.repository = repository
    }
    
    func loadProfile(id: String) async {
        isLoading = true
        do {
            user = try await repository.fetch(id: id)
        } catch {
            self.error = .network
        }
        isLoading = false
    }
}`,
    explanation: 'DTO, Config, Event ها همه باید Sendable باشن تا safe بین concurrency domains منتقل بشن.',
    explanationEn: 'DTOs, configs, events should all be Sendable for safe transfer between concurrency domains.',
    quiz: [
      {
        question: 'DTO باید چه protocol ای رو implement کنه؟',
        options: ['Codable', 'Sendable', 'هر دو', 'هیچکدوم'],
        correctIndex: 2,
        explanation: 'DTO ها معمولاً هم Codable و هم Sendable هستن.'
      }
    ]
  },
  {
    id: 60,
    title: 'Quiz: Sendable & Isolation',
    titleEn: 'Quiz: Sendable & Isolation',
    category: 'sendable',
    categoryEn: 'Sendable & Isolation',
    description: 'آزمون Sendable و Isolation.',
    descriptionEn: 'Sendable and Isolation quiz.',
    code: `// تحلیل:
class Box {
    var value: Int = 0
}

func test() async {
    let box = Box()
    
    await Task.detached {
        box.value = 42 // ❌ Error in strict mode
    }.value
    
    print(box.value)
}

// سوال: چرا error میده؟`,
    explanation: 'Box non-Sendable هست. انتقال بین isolation domains بدون Sendable مجاز نیست.',
    explanationEn: 'Box is non-Sendable. Transferring between isolation domains without Sendable is not allowed.',
    quiz: [
      {
        question: 'کدوم Sendable هست؟',
        options: ['Mutable class', 'Actor', 'Class با var', 'Closure معمولی'],
        correctIndex: 1,
        explanation: 'Actor ها خودکار Sendable هستن.'
      },
      {
        question: '@unchecked Sendable کی استفاده میشه؟',
        options: ['همیشه', 'وقتی خودمون thread safety رو تضمین کنیم', 'هرگز', 'فقط در test'],
        correctIndex: 1,
        explanation: '@unchecked Sendable وقتی استفاده میشه که خودمون مطمئنیم thread safe هست.'
      }
    ]
  },

  // === ASYNC SEQUENCE 61-70 ===
  {
    id: 61,
    title: 'AsyncSequence مقدمه',
    titleEn: 'AsyncSequence Introduction',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'AsyncSequence مثل Sequence هست ولی عناصرش به صورت async تولید میشن.',
    descriptionEn: 'AsyncSequence is like Sequence but elements are produced asynchronously.',
    code: `import Foundation

// AsyncSequence protocol
// protocol AsyncSequence {
//     associatedtype AsyncIterator: AsyncIteratorProtocol
//     func makeAsyncIterator() -> AsyncIterator
// }

// AsyncIteratorProtocol
// protocol AsyncIteratorProtocol {
//     mutating func next() async throws -> Element?
// }

// ساده‌ترین AsyncSequence
struct Counter: AsyncSequence {
    typealias Element = Int
    let limit: Int
    
    struct AsyncIterator: AsyncIteratorProtocol {
        var current = 0
        let limit: Int
        
        mutating func next() async throws -> Int? {
            guard current < limit else { return nil }
            current += 1
            try? await Task.sleep(for: .seconds(1))
            return current
        }
    }
    
    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator(limit: limit)
    }
}

// استفاده
func useCounter() async {
    let counter = Counter(limit: 5)
    
    for try await number in counter {
        print(number) // 1, 2, 3, 4, 5 (هر ثانیه یکی)
    }
}`,
    explanation: 'AsyncSequence برای stream های داده مفیده. مثل WebSocket, file reading, notifications.',
    explanationEn: 'AsyncSequence is useful for data streams. Like WebSocket, file reading, notifications.',
    quiz: [
      {
        question: 'AsyncSequence چه فرقی با Sequence داره؟',
        options: ['سرعت', 'عناصر async تولید میشن', 'نوع متفاوت', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'AsyncSequence عناصرش به صورت async تولید میشن، نه sync.'
      }
    ]
  },
  {
    id: 62,
    title: 'AsyncStream',
    titleEn: 'AsyncStream',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'AsyncStream یک راه ساده برای ساخت AsyncSequence هست.',
    descriptionEn: 'AsyncStream is a simple way to create AsyncSequence.',
    code: `import Foundation

// ساخت AsyncStream
let stream = AsyncStream<Int> { continuation in
    Task {
        for i in 1...5 {
            continuation.yield(i)
            try? await Task.sleep(for: .seconds(1))
        }
        continuation.finish()
    }
}

// مصرف
for await value in stream {
    print("Received: \\(value)")
}

// AsyncStream با buffering
let bufferedStream = AsyncStream<Int>(
    bufferingPolicy: .bufferingNewest(5)
) { continuation in
    // Producer
    Task {
        for i in 1...100 {
            continuation.yield(i)
        }
        continuation.finish()
    }
}

// Buffering policies:
// .unbounded - نامحدود
// .bufferingNewest(n) - فقط n تای آخر
// .bufferingOldest(n) - فقط n تای اول

// Throwing stream
let throwingStream = AsyncThrowingStream<String, Error> { continuation in
    Task {
        continuation.yield("Hello")
        continuation.yield("World")
        continuation.finish(throwing: URLError(.badServerResponse))
    }
}

// استفاده
do {
    for try await value in throwingStream {
        print(value)
    }
} catch {
    print("Error: \\(error)")
}`,
    explanation: 'AsyncStream ساده‌ترین راه ساخت async sequence هست. Continuation.yield() برای ارسال داده.',
    explanationEn: 'AsyncStream is the simplest way to create async sequence. Continuation.yield() to send data.',
    quiz: [
      {
        question: 'continuation.finish() چه کاری میکنه؟',
        options: ['خطا میده', 'Stream رو تموم میکنه', 'Stream رو pause میکنه', 'هیچی'],
        correctIndex: 1,
        explanation: 'finish() نشون میده دیگه داده‌ای ارسال نمیشه.'
      }
    ]
  },
  {
    id: 63,
    title: 'AsyncStream برای UI Events',
    titleEn: 'AsyncStream for UI Events',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'استفاده از AsyncStream برای تبدیل UI events به async sequence.',
    descriptionEn: 'Using AsyncStream to convert UI events to async sequence.',
    code: `import SwiftUI
import Combine

// Button tap stream
struct ButtonTapStream {
    static func make() -> AsyncStream<Void> {
        AsyncStream { continuation in
            // در واقعیت، از closure callback استفاده میشه
            let handler = {
                continuation.yield(())
            }
            
            continuation.onTermination = { _ in
                // Cleanup
                print("Stream terminated")
            }
            
            // handler رو ذخیره کنید
        }
    }
}

// Text field changes
class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    
    var searchResults: AsyncStream<[String]> {
        AsyncStream { continuation in
            let task = Task {
                for await text in queryStream() {
                    let results = await search(text)
                    continuation.yield(results)
                }
                continuation.finish()
            }
            
            continuation.onTermination = { _ in
                task.cancel()
            }
        }
    }
    
    private func queryStream() -> AsyncStream<String> {
        AsyncStream { continuation in
            // Observe query changes
            continuation.yield(query)
        }
    }
    
    private func search(_ text: String) async -> [String] {
        // Search logic
        return ["Result 1", "Result 2"]
    }
}

// Location updates
class LocationManager {
    func locationUpdates() -> AsyncStream<CLLocation> {
        AsyncStream { continuation in
            // Setup location manager
            // continuation.yield(location) when updated
            
            continuation.onTermination = { _ in
                // Stop location updates
            }
        }
    }
}

import CoreLocation

// استفاده در View
struct SearchView: View {
    @StateObject var vm = SearchViewModel()
    @State var results: [String] = []
    
    var body: some View {
        VStack {
            TextField("Search", text: $vm.query)
            List(results, id: \\.self) { Text($0) }
        }
        .task {
            for await newResults in vm.searchResults {
                results = newResults
            }
        }
    }
}`,
    explanation: 'AsyncStream برای تبدیل delegate patterns و callbacks به async sequences عالی هست.',
    explanationEn: 'AsyncStream is great for converting delegate patterns and callbacks to async sequences.',
    quiz: [
      {
        question: 'onTermination چه وقتی صدا زده میشه؟',
        options: ['هر yield', 'وقتی stream تموم یا cancel بشه', 'اولین بار', 'هیوقت'],
        correctIndex: 1,
        explanation: 'onTermination وقتی stream تموم بشه یا cancel بشه صدا زده میشه.'
      }
    ]
  },
  {
    id: 64,
    title: 'AsyncAlgorithms',
    titleEn: 'AsyncAlgorithms',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'Swift Async Algorithms package برای عملیات‌های پیشرفته روی AsyncSequence.',
    descriptionEn: 'Swift Async Algorithms package for advanced operations on AsyncSequence.',
    code: `import Foundation
// import AsyncAlgorithms

// Operators مشابه Sequence
// map, filter, reduce, compactMap

// Debounce - تأخیر قبل از ارسال
func debounceExample() async {
    let stream = AsyncStream<String> { continuation in
        Task {
            let inputs = ["H", "He", "Hel", "Hell", "Hello"]
            for input in inputs {
                continuation.yield(input)
                try? await Task.sleep(for: .milliseconds(100))
            }
            continuation.finish()
        }
    }
    
    // Debounce: فقط آخرین مقدار بعد از pause
    // let debounced = stream.debounce(for: .milliseconds(200))
    // for await value in debounced {
    //     print(value) // فقط "Hello"
    // }
}

// Throttle - حداکثر یک مقدار در هر مدت
func throttleExample() async {
    let stream = AsyncStream<Int> { continuation in
        Task {
            for i in 1...100 {
                continuation.yield(i)
                try? await Task.sleep(for: .milliseconds(50))
            }
            continuation.finish()
        }
    }
    
    // Throttle: حداکثر هر 500ms یک مقدار
    // let throttled = stream.throttle(for: .milliseconds(500))
    // for await value in throttled {
    //     print(value)
    // }
}

// Merge - ترکیب چند stream
func mergeExample() async {
    let stream1 = AsyncStream<Int> { cont in
        Task { for i in 1...3 { cont.yield(i); try? await Task.sleep(for: .seconds(1)) }; cont.finish() }
    }
    let stream2 = AsyncStream<Int> { cont in
        Task { for i in 4...6 { cont.yield(i); try? await Task.sleep(for: .seconds(1)) }; cont.finish() }
    }
    
    // let merged = merge(stream1, stream2)
    // for await value in merged {
    //     print(value) // 1, 4, 2, 5, 3, 6 (interleaved)
    // }
}

// Combine - ترکیب آخرین مقدار دو stream
func combineExample() async {
    // let combined = combineLatest(stream1, stream2)
    // for await (a, b) in combined {
    //     print("\\(a), \\(b)")
    // }
}

// Chunked - گروه‌بندی
func chunkedExample() async {
    let stream = AsyncStream<Int> { cont in
        Task { for i in 1...10 { cont.yield(i) }; cont.finish() }
    }
    
    // let chunks = stream.chunks(ofCount: 3)
    // for await chunk in chunks {
    //     print(chunk) // [1,2,3], [4,5,6], [7,8,9], [10]
    // }
}`,
    explanation: 'AsyncAlgorithms package عملیات‌های مفیدی مثل debounce, throttle, merge رو فراهم میکنه.',
    explanationEn: 'AsyncAlgorithms package provides useful operations like debounce, throttle, merge.',
    quiz: [
      {
        question: 'Debounce چه کاری میکنه؟',
        options: ['سرعت بیشتر', 'فقط آخرین مقدار بعد از pause رو ارسال میکنه', 'همه مقادیر رو ارسال میکنه', 'خطا میده'],
        correctIndex: 1,
        explanation: 'Debounce صبر میکنه تا pause بشه و فقط آخرین مقدار رو ارسال میکنه.'
      }
    ]
  },
  {
    id: 65,
    title: 'URLSession.bytes و lines',
    titleEn: 'URLSession.bytes and lines',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'URLSession API های async sequence داره برای reading stream ها.',
    descriptionEn: 'URLSession has async sequence APIs for reading streams.',
    code: `import Foundation

// URLSession.bytes - stream داده
func downloadWithProgress() async throws {
    let url = URL(string: "https://example.com/large-file.zip")!
    let (bytes, response) = try await URLSession.shared.bytes(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse else {
        throw URLError(.badServerResponse)
    }
    
    let totalBytes = httpResponse.expectedContentLength
    var receivedBytes: Int64 = 0
    
    // Iterate byte by byte
    for try await byte in bytes {
        receivedBytes += 1
        let progress = Double(receivedBytes) / Double(totalBytes)
        print("Progress: \\(Int(progress * 100))%")
    }
}

// URLSession.bytes.lines - line by line
func readLines() async throws {
    let url = URL(string: "https://example.com/data.txt")!
    let (bytes, _) = try await URLSession.shared.bytes(from: url)
    
    var lineCount = 0
    for try await line in bytes.lines {
        lineCount += 1
        print("Line \\(lineCount): \\(line)")
    }
}

// Download با bytes
func downloadAndSave() async throws {
    let url = URL(string: "https://example.com/file.pdf")!
    let (bytes, _) = try await URLSession.shared.bytes(from: url)
    
    var data = Data()
    for try await byte in bytes {
        data.append(byte)
    }
    
    let fileURL = FileManager.default
        .urls(for: .documentDirectory, in: .userDomainMask)[0]
        .appendingPathComponent("file.pdf")
    
    try data.write(to: fileURL)
}

// Stream با buffer
func efficientDownload() async throws {
    let url = URL(string: "https://example.com/large-file")!
    let (bytes, _) = try await URLSession.shared.bytes(from: url)
    
    // Process in chunks
    var buffer = Data()
    let chunkSize = 1024 * 64 // 64KB
    
    for try await byte in bytes {
        buffer.append(byte)
        if buffer.count >= chunkSize {
            try processChunk(buffer)
            buffer = Data()
        }
    }
    
    if !buffer.isEmpty {
        try processChunk(buffer)
    }
}

func processChunk(_ data: Data) throws {
    // Process chunk
}`,
    explanation: 'URLSession.bytes برای download های بزرگ مفیده. میتونیم progress نشون بدیم.',
    explanationEn: 'URLSession.bytes is useful for large downloads. We can show progress.',
    quiz: [
      {
        question: 'bytes.lines چه کاری میکنه؟',
        options: ['همه data رو یکجا میده', 'line by line میده', 'byte by byte میده', 'Error میده'],
        correctIndex: 1,
        explanation: 'bytes.lines داده رو line by line برمیگردونه.'
      }
    ]
  },
  {
    id: 66,
    title: 'AsyncSequence Operators',
    titleEn: 'AsyncSequence Operators',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'عملیات‌های مختلف روی AsyncSequence مثل map, filter, reduce.',
    descriptionEn: 'Various operations on AsyncSequence like map, filter, reduce.',
    code: `import Foundation

// Custom AsyncSequence با operators
extension AsyncSequence {
    // Map
    func asyncMap<T>(
        _ transform: @escaping (Element) async -> T
    ) -> AsyncMapSequence<Self, T> {
        AsyncMapSequence(self, transform: transform)
    }
    
    // Filter
    func asyncFilter(
        _ isIncluded: @escaping (Element) async -> Bool
    ) -> AsyncFilterSequence<Self> {
        AsyncFilterSequence(self, isIncluded: isIncluded)
    }
}

// Manual implementation
func processStream() async {
    let numbers = AsyncStream<Int> { cont in
        Task {
            for i in 1...10 {
                cont.yield(i)
                try? await Task.sleep(for: .milliseconds(100))
            }
            cont.finish()
        }
    }
    
    // Manual map
    var doubled: [Int] = []
    for await n in numbers {
        doubled.append(n * 2)
    }
    
    // Manual filter
    let numbers2 = AsyncStream<Int> { cont in
        Task {
            for i in 1...10 { cont.yield(i) }
            cont.finish()
        }
    }
    
    var evens: [Int] = []
    for await n in numbers2 {
        if n % 2 == 0 {
            evens.append(n)
        }
    }
    
    // Manual reduce
    let numbers3 = AsyncStream<Int> { cont in
        Task {
            for i in 1...5 { cont.yield(i) }
            cont.finish()
        }
    }
    
    var sum = 0
    for await n in numbers3 {
        sum += n
    }
    print("Sum: \\(sum)") // 15
}

// CompactMap
func compactMapExample() async {
    let stream = AsyncStream<String> { cont in
        Task {
            cont.yield("1")
            cont.yield("abc")
            cont.yield("3")
            cont.finish()
        }
    }
    
    var numbers: [Int] = []
    for await str in stream {
        if let num = Int(str) {
            numbers.append(num)
        }
    }
    print(numbers) // [1, 3]
}`,
    explanation: 'AsyncSequence operators مثل Sequence هستن ولی async. باید manual پیاده‌سازی بشن یا از AsyncAlgorithms استفاده بشه.',
    explanationEn: 'AsyncSequence operators are like Sequence but async. Must be manually implemented or use AsyncAlgorithms.',
    quiz: [
      {
        question: 'آیا AsyncSequence.map() built-in هست؟',
        options: ['بله', 'خیر، باید manual یا AsyncAlgorithms', 'فقط در Swift 6', 'فقط در iOS 17'],
        correctIndex: 1,
        explanation: 'AsyncSequence operators built-in نیستن. باید manual یا از AsyncAlgorithms استفاده کرد.'
      }
    ]
  },
  {
    id: 67,
    title: 'Cancellation در AsyncSequence',
    titleEn: 'Cancellation in AsyncSequence',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'چطور cancellation در AsyncSequence کار میکنه.',
    descriptionEn: 'How cancellation works in AsyncSequence.',
    code: `import Foundation

// Cancellation در for await
func cancellableStream() async {
    let stream = AsyncStream<Int> { continuation in
        let task = Task {
            for i in 1...100 {
                if Task.isCancelled {
                    continuation.finish()
                    return
                }
                continuation.yield(i)
                try? await Task.sleep(for: .milliseconds(100))
            }
            continuation.finish()
        }
        
        continuation.onTermination = { _ in
            task.cancel()
        }
    }
    
    // در Task
    let consumer = Task {
        for await value in stream {
            print(value)
            if value == 5 {
                break // Stream cancel میشه
            }
        }
    }
    
    // یا از بیرون cancel
    try? await Task.sleep(for: .seconds(1))
    consumer.cancel()
}

// onTermination برای cleanup
func streamWithCleanup() -> AsyncStream<Data> {
    AsyncStream { continuation in
        let socket = openSocket()
        
        // وقتی stream تموم بشه
        continuation.onTermination = { @Sendable _ in
            closeSocket(socket)
        }
        
        // داده بفرست
        Task {
            while let data = await readFromSocket(socket) {
                continuation.yield(data)
            }
            continuation.finish()
        }
    }
}

// Break در for await
func breakExample() async {
    let stream = numberStream()
    
    for await n in stream {
        if n > 5 {
            break // onTermination صدا زده میشه
        }
        print(n)
    }
}

func numberStream() -> AsyncStream<Int> {
    AsyncStream { cont in
        Task {
            for i in 1...100 {
                cont.yield(i)
                try? await Task.sleep(for: .milliseconds(100))
            }
            cont.finish()
        }
    }
}

func openSocket() -> Int { return 0 }
func closeSocket(_ s: Int) {}
func readFromSocket(_ s: Int) async -> Data? { return nil }`,
    explanation: 'onTermination برای cleanup خیلی مهمه. وقتی consumer دیگه نخواد، resources آزاد بشن.',
    explanationEn: 'onTermination is crucial for cleanup. When consumer is done, resources should be freed.',
    quiz: [
      {
        question: 'break در for await چه اثری داره؟',
        options: ['هیچی', 'onTermination صدا زده میشه', 'Crash', 'Infinite loop'],
        correctIndex: 1,
        explanation: 'break باعث تموم شدن iteration و صدا زدن onTermination میشه.'
      }
    ]
  },
  {
    id: 68,
    title: 'NotificationCenter.notifications',
    titleEn: 'NotificationCenter.notifications',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'NotificationCenter یک async sequence برای notifications داره.',
    descriptionEn: 'NotificationCenter has an async sequence for notifications.',
    code: `import Foundation

// NotificationCenter async sequence
func observeNotifications() async {
    let center = NotificationCenter.default
    
    // Observe notification
    for await notification in center.notifications(named: .userLoggedIn) {
        if let user = notification.userInfo?["user"] as? String {
            print("User logged in: \\(user)")
        }
    }
}

// Observe multiple notifications
func observeMultiple() async {
    let center = NotificationCenter.default
    
    await withTaskGroup(of: Void.self) { group in
        group.addTask {
            for await _ in center.notifications(named: .userLoggedIn) {
                print("Login")
            }
        }
        
        group.addTask {
            for await _ in center.notifications(named: .userLoggedOut) {
                print("Logout")
            }
        }
    }
}

// Custom notifications
extension Notification.Name {
    static let dataUpdated = Notification.Name("dataUpdated")
    static let settingsChanged = Notification.Name("settingsChanged")
}

// Post notification
func postDataUpdate() {
    NotificationCenter.default.post(
        name: .dataUpdated,
        object: nil,
        userInfo: ["key": "value"]
    )
}

// در SwiftUI
import SwiftUI

class NotificationObserver {
    func observe() async {
        for await notification in NotificationCenter.default
            .notifications(named: UIApplication.didReceiveMemoryWarningNotification) {
            print("Memory warning!")
            clearCache()
        }
    }
    
    func clearCache() {
        // Clear cache
    }
}

import UIKit`,
    explanation: 'NotificationCenter.notifications یک async sequence هست که notifications رو stream میکنه.',
    explanationEn: 'NotificationCenter.notifications is an async sequence that streams notifications.',
    quiz: [
      {
        question: 'NotificationCenter.notifications چه نوعی هست؟',
        options: ['Array', 'AsyncSequence', 'Publisher', 'Closure'],
        correctIndex: 1,
        explanation: 'notifications یک AsyncSequence از Notification objects هست.'
      }
    ]
  },
  {
    id: 69,
    title: 'Timer و AsyncSequence',
    titleEn: 'Timer and AsyncSequence',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'ساخت timer با AsyncStream.',
    descriptionEn: 'Building a timer with AsyncStream.',
    code: `import Foundation

// Async Timer
struct AsyncTimer: AsyncSequence {
    typealias Element = Date
    
    let interval: Duration
    let clock: ContinuousClock
    
    init(interval: Duration, clock: ContinuousClock = .continuous) {
        self.interval = interval
        self.clock = clock
    }
    
    struct AsyncIterator: AsyncIteratorProtocol {
        let interval: Duration
        let clock: ContinuousClock
        
        mutating func next() async throws -> Date? {
            try await clock.sleep(for: interval)
            return Date()
        }
    }
    
    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator(interval: interval, clock: clock)
    }
}

// استفاده
func countdown() async {
    let timer = AsyncTimer(interval: .seconds(1))
    
    var count = 10
    for try await _ in timer {
        print("⏱ \\(count)")
        count -= 1
        if count <= 0 {
            print("🎉 Done!")
            break
        }
    }
}

// Simple interval stream
func intervalStream(every seconds: Double) -> AsyncStream<Date> {
    AsyncStream { continuation in
        let task = Task {
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(seconds))
                if Task.isCancelled { break }
                continuation.yield(Date())
            }
            continuation.finish()
        }
        
        continuation.onTermination = { _ in
            task.cancel()
        }
    }
}

// استفاده
func periodicUpdate() async {
    for await date in intervalStream(every: 5) {
        print("Update at: \\(date)")
        await refreshData()
    }
}

func refreshData() async {
    // Refresh
}

// Progress timer
func showProgress() async {
    let timer = intervalStream(every: 0.1)
    var progress = 0.0
    
    for await _ in timer {
        progress += 0.1
        print("Progress: \\(Int(progress * 100))%")
        if progress >= 1.0 {
            print("Complete!")
            break
        }
    }
}`,
    explanation: 'AsyncStream میتونه timer بسازه. با onTermination برای cleanup مناسب هست.',
    explanationEn: 'AsyncStream can build timers. With onTermination for proper cleanup.',
    quiz: [
      {
        question: 'چطور timer رو stop کنیم؟',
        options: ['timer.stop()', 'break در for await', 'timer.cancel()', 'نمیشه'],
        correctIndex: 1,
        explanation: 'break در for await باعث تموم شدن و cleanup میشه.'
      }
    ]
  },
  {
    id: 70,
    title: 'Quiz: AsyncSequence',
    titleEn: 'Quiz: AsyncSequence',
    category: 'async-sequence',
    categoryEn: 'AsyncSequence & Streams',
    description: 'آزمون AsyncSequence و AsyncStream.',
    descriptionEn: 'AsyncSequence and AsyncStream quiz.',
    code: `// تحلیل:
let stream = AsyncStream<Int> { continuation in
    for i in 1...5 {
        continuation.yield(i)
    }
    continuation.finish()
}

var collected: [Int] = []
for await value in stream {
    collected.append(value)
}
print(collected)

// سوال: خروجی چیه؟`,
    explanation: 'خروجی [1, 2, 3, 4, 5] هست. همه مقادیر yield شدن و بعد finish.',
    explanationEn: 'Output is [1, 2, 3, 4, 5]. All values yielded then finished.',
    quiz: [
      {
        question: 'AsyncStream چه protocol ای رو implement میکنه؟',
        options: ['Sequence', 'AsyncSequence', 'IteratorProtocol', 'Publisher'],
        correctIndex: 1,
        explanation: 'AsyncStream یک AsyncSequence هست.'
      },
      {
        question: 'Buffering policy .bufferingNewest(5) یعنی چه؟',
        options: ['5 تای اول', '5 تای آخر', '5 تا در ثانیه', '5 buffer'],
        correctIndex: 1,
        explanation: '.bufferingNewest(5) فقط 5 عنصر آخر رو نگه میداره.'
      }
    ]
  },

  // === ERROR HANDLING 71-80 ===
  {
    id: 71,
    title: 'Error Handling در Async',
    titleEn: 'Error Handling in Async',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'مدیریت خطا در کد async با throws و do-catch.',
    descriptionEn: 'Error handling in async code with throws and do-catch.',
    code: `import Foundation

enum AppError: Error {
    case network(String)
    case decoding
    case notFound
    case unauthorized
}

// Async throwing function
func fetchUser(id: Int) async throws -> String {
    guard id > 0 else {
        throw AppError.notFound
    }
    
    let url = URL(string: "https://api.example.com/user/\\(id)")!
    let (data, response) = try await URLSession.shared.data(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse else {
        throw AppError.network("Invalid response")
    }
    
    switch httpResponse.statusCode {
    case 200:
        return String(data: data, encoding: .utf8) ?? ""
    case 401:
        throw AppError.unauthorized
    case 404:
        throw AppError.notFound
    default:
        throw AppError.network("Status: \\(httpResponse.statusCode)")
    }
}

// استفاده با do-catch
func loadUser() async {
    do {
        let user = try await fetchUser(id: 1)
        print("User: \\(user)")
    } catch AppError.notFound {
        print("User not found")
    } catch AppError.unauthorized {
        print("Unauthorized")
    } catch AppError.network(let message) {
        print("Network error: \\(message)")
    } catch {
        print("Unknown error: \\(error)")
    }
}

// try? - خطا رو نادیده بگیر
func loadOptional() async {
    let user = try? await fetchUser(id: 1)
    // user: String? - nil اگه خطا باشه
}

// try! - crash اگه خطا باشه
// let user = try! await fetchUser(id: 1) // Dangerous!`,
    explanation: 'Error handling در async مثل sync هست. do-catch, try?, try! همه کار میکنن.',
    explanationEn: 'Error handling in async is like sync. do-catch, try?, try! all work.',
    quiz: [
      {
        question: 'try? چه کاری میکنه؟',
        options: ['Crash اگه خطا', 'Optional برمیگردونه', 'خطا رو print میکنه', 'Retry میکنه'],
        correctIndex: 1,
        explanation: 'try? نتیجه رو Optional میکنه. اگه خطا باشه nil برمیگردونه.'
      }
    ]
  },
  {
    id: 72,
    title: 'CancellationError',
    titleEn: 'CancellationError',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'CancellationError وقتی thrown میشه که task cancel بشه.',
    descriptionEn: 'CancellationError is thrown when a task is cancelled.',
    code: `import Foundation

func cancellableWork() async throws -> String {
    for i in 0..<100 {
        try Task.checkCancellation() // throws CancellationError
        
        try await Task.sleep(for: .milliseconds(100))
        // sleep هم CancellationError میده اگه cancel بشه
    }
    return "Done"
}

// Handle cancellation
func handleCancellation() async {
    let task = Task {
        try await cancellableWork()
    }
    
    // Cancel after 500ms
    try? await Task.sleep(for: .milliseconds(500))
    task.cancel()
    
    do {
        let result = try await task.value
        print(result)
    } catch is CancellationError {
        print("Task was cancelled - this is normal")
    } catch {
        print("Other error: \\(error)")
    }
}

// CancellationError vs other errors
func distinguishErrors() async {
    do {
        let result = try await someOperation()
        print(result)
    } catch is CancellationError {
        // Cancelled - don't treat as error
        print("Cancelled")
    } catch URLError.notConnectedToInternet {
        print("No internet")
    } catch {
        print("Error: \\(error)")
    }
}

func someOperation() async throws -> String {
    try await Task.sleep(for: .seconds(1))
    return "Result"
}

// نکته: CancellationError معمولاً نباید
// به عنوان error واقعی handle بشه
// چون cancellation یک عمل طبیعی هست`,
    explanation: 'CancellationError یک error خاص هست. معمولاً نباید به عنوان خطای واقعی handle بشه.',
    explanationEn: 'CancellationError is a special error. Usually shouldn\'t be treated as a real error.',
    quiz: [
      {
        question: 'CancellationError کی thrown میشه؟',
        options: ['Network error', 'وقتی task cancel بشه', 'Timeout', 'Decoding error'],
        correctIndex: 1,
        explanation: 'CancellationError وقتی thrown میشه که task cancel بشه و Task.checkCancellation() صدا زده بشه.'
      }
    ]
  },
  {
    id: 73,
    title: 'Error Recovery Strategies',
    titleEn: 'Error Recovery Strategies',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'استراتژی‌های مختلف برای recovery از خطاها.',
    descriptionEn: 'Different strategies for error recovery.',
    code: `import Foundation

// Strategy 1: Retry
func fetchWithRetry<T>(
    maxRetries: Int = 3,
    operation: () async throws -> T
) async throws -> T {
    var lastError: Error?
    
    for attempt in 0..<maxRetries {
        do {
            return try await operation()
        } catch is CancellationError {
            throw CancellationError() // Don't retry cancellation
        } catch {
            lastError = error
            let delay = pow(2.0, Double(attempt)) // Exponential backoff
            try? await Task.sleep(for: .seconds(delay))
        }
    }
    
    throw lastError!
}

// Strategy 2: Fallback
func fetchWithFallback() async -> String {
    do {
        return try await fetchFromPrimary()
    } catch {
        do {
            return try await fetchFromBackup()
        } catch {
            return "Default value"
        }
    }
}

// Strategy 3: Partial success
func fetchMultiple() async -> (success: [String], failures: [Error]) {
    await withTaskGroup(of: Result<String, Error>.self) { group in
        for url in urls {
            group.addTask {
                do {
                    return .success(try await fetchURL(url))
                } catch {
                    return .failure(error)
                }
            }
        }
        
        var successes: [String] = []
        var failures: [Error] = []
        
        for await result in group {
            switch result {
            case .success(let data):
                successes.append(data)
            case .failure(let error):
                failures.append(error)
            }
        }
        
        return (successes, failures)
    }
}

let urls: [URL] = []
func fetchURL(_ url: URL) async throws -> String { return "" }
func fetchFromPrimary() async throws -> String { throw URLError(.notConnectedToInternet) }
func fetchFromBackup() async throws -> String { return "Backup" }

// Strategy 4: Circuit breaker
actor CircuitBreaker {
    private var failureCount = 0
    private let threshold = 5
    private var isOpen = false
    
    func execute<T>(_ operation: () async throws -> T) async throws -> T {
        guard !isOpen else {
            throw AppError.network("Circuit breaker open")
        }
        
        do {
            let result = try await operation()
            failureCount = 0
            return result
        } catch {
            failureCount += 1
            if failureCount >= threshold {
                isOpen = true
                // Reset after delay
                Task {
                    try? await Task.sleep(for: .seconds(30))
                    failureCount = 0
                    isOpen = false
                }
            }
            throw error
        }
    }
}

enum AppError: Error {
    case network(String)
}`,
    explanation: 'استراتژی‌های مختلف: Retry, Fallback, Partial success, Circuit breaker.',
    explanationEn: 'Different strategies: Retry, Fallback, Partial success, Circuit breaker.',
    quiz: [
      {
        question: 'Exponential backoff یعنی چه؟',
        options: ['Retry فوری', 'تأخیر بین retries بیشتر میشه', 'فقط یکبار retry', 'بدون retry'],
        correctIndex: 1,
        explanation: 'Exponential backoff یعنی تأخیر بین هر retry بیشتر میشه (2, 4, 8, ...).'
      }
    ]
  },
  {
    id: 74,
    title: 'Result Type و Async',
    titleEn: 'Result Type and Async',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'استفاده از Result type با async functions.',
    descriptionEn: 'Using Result type with async functions.',
    code: `import Foundation

// Result با async
func fetchResult() async -> Result<String, Error> {
    do {
        let data = try await fetchData()
        return .success(data)
    } catch {
        return .failure(error)
    }
}

// Task.value هم Result برمیگردونه (indirectly)
func taskResult() async {
    let task = Task<String, Error> {
        try await fetchData()
    }
    
    do {
        let value = try await task.value
        print("Success: \\(value)")
    } catch {
        print("Error: \\(error)")
    }
}

// Collection of Results
func fetchAll() async -> [Result<String, Error>] {
    await withTaskGroup(of: Result<String, Error>.self) { group in
        for i in 1...5 {
            group.addTask {
                do {
                    let data = try await fetchData()
                    return .success(data)
                } catch {
                    return .failure(error)
                }
            }
        }
        
        var results: [Result<String, Error>] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}

// Process results
func processResults() async {
    let results = await fetchAll()
    
    let successes = results.compactMap { try? $0.get() }
    let failures = results.compactMap { 
        switch $0 {
        case .success: return nil
        case .failure(let error): return error
        }
    }
    
    print("Successes: \\(successes.count)")
    print("Failures: \\(failures.count)")
}

func fetchData() async throws -> String {
    return "data"
}

// Result.transform
extension Result {
    func asyncMap<U>(
        _ transform: (Success) async -> U
    ) async -> Result<U, Failure> {
        switch self {
        case .success(let value):
            return .success(await transform(value))
        case .failure(let error):
            return .failure(error)
        }
    }
}`,
    explanation: 'Result type برای جمع‌آوری نتایج موفق و ناموفق مفیده.',
    explanationEn: 'Result type is useful for collecting both successful and failed results.',
    quiz: [
      {
        question: 'مزیت Result type نسبت به throws چیه؟',
        options: ['سرعت', 'میشه collection ش کرد', 'ساده‌تر', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Result type رو میشه در array ذخیره کرد و بعداً process کرد.'
      }
    ]
  },
  {
    id: 75,
    title: 'Never و Async',
    titleEn: 'Never and Async',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'Never error type برای task هایی که خطا نمیدن.',
    descriptionEn: 'Never error type for tasks that don\'t throw.',
    code: `import Foundation

// Task<Int, Never> - خطا نمیده
let safeTask: Task<Int, Never> = Task {
    return 42
}

let value = await safeTask.value // Int, نه optional

// Task<Int, Error> - ممکنه خطا بده
let unsafeTask: Task<Int, Error> = Task {
    if Bool.random() {
        throw URLError(.badURL)
    }
    return 42
}

// try await لازمه
let result = try await unsafeTask.value

// @Sendable closure با Never
let closure: @Sendable () async -> String = {
    return "Hello"
}

// @Sendable closure با Error
let throwingClosure: @Sendable () async throws -> String = {
    throw URLError(.badURL)
}

// AsyncStream با Never
let safeStream: AsyncStream<Int> = AsyncStream { cont in
    cont.yield(1)
    cont.yield(2)
    cont.finish()
    // No error possible
}

// AsyncThrowingStream
let throwingStream: AsyncThrowingStream<Int, Error> = AsyncThrowingStream { cont in
    cont.yield(1)
    cont.finish(throwing: URLError(.badURL))
}

// وقتی Never استفاده کنیم:
// - عملیات قطعا موفق میشه
// - خطا معنا نداره
// - ساده‌تر API

// وقتی Error استفاده کنیم:
// - Network requests
// - File I/O
// - Decoding`,
    explanation: 'Never error type نشون میده عملیات هرگز خطا نمیده. API رو ساده‌تر میکنه.',
    explanationEn: 'Never error type indicates operation never fails. Simplifies API.',
    quiz: [
      {
        question: 'Task<Int, Never>.value چه نوعی داره؟',
        options: ['Int?', 'Int', 'Result<Int, Never>', 'Error'],
        correctIndex: 1,
        explanation: 'چون error Never هست، value مستقیماً Int برمیگردونه. try لازم نیست.'
      }
    ]
  },
  {
    id: 76,
    title: 'Error Propagation در TaskGroup',
    titleEn: 'Error Propagation in TaskGroup',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'خطاها در TaskGroup چطور propagate میشن.',
    descriptionEn: 'How errors propagate in TaskGroup.',
    code: `import Foundation

// withThrowingTaskGroup
func throwingGroup() async throws -> [String] {
    try await withThrowingTaskGroup(of: String.self) { group in
        for i in 1...5 {
            group.addTask {
                if i == 3 {
                    throw URLError(.badServerResponse)
                }
                return "Result \\(i)"
            }
        }
        
        var results: [String] = []
        for try await result in group {
            results.append(result)
        }
        return results
    }
}

// اگه یک task خطا بده:
// 1. خطا throw میشه
// 2. بقیه tasks cancel میشن
// 3. group تموم میشه

// مدیریت partial errors
func partialErrors() async -> [String] {
    await withTaskGroup(of: String?.self) { group in
        for i in 1...5 {
            group.addTask {
                do {
                    if i == 3 { throw URLError(.badServerResponse) }
                    return "Result \\(i)"
                } catch {
                    return nil // Error رو نادیده بگیر
                }
            }
        }
        
        var results: [String] = []
        for await result in group {
            if let r = result {
                results.append(r)
            }
        }
        return results
        // ["Result 1", "Result 2", "Result 4", "Result 5"]
    }
}

// Custom error aggregation
struct AggregatedError: Error {
    let errors: [Error]
}

func collectAllErrors() async throws -> [String] {
    try await withThrowingTaskGroup(of: Result<String, Error>.self) { group in
        for i in 1...5 {
            group.addTask {
                do {
                    if i == 3 { throw URLError(.badServerResponse) }
                    return .success("Result \\(i)")
                } catch {
                    return .failure(error)
                }
            }
        }
        
        var results: [String] = []
        var errors: [Error] = []
        
        for await result in group {
            switch result {
            case .success(let value): results.append(value)
            case .failure(let error): errors.append(error)
            }
        }
        
        if !errors.isEmpty && results.isEmpty {
            throw AggregatedError(errors: errors)
        }
        
        return results
    }
}`,
    explanation: 'در throwingTaskGroup، اولین خطا بقیه رو cancel میکنه. برای partial errors از non-throwing استفاده کنید.',
    explanationEn: 'In throwingTaskGroup, first error cancels rest. For partial errors use non-throwing version.',
    quiz: [
      {
        question: 'در withThrowingTaskGroup اگه یک task خطا بده چه میشه؟',
        options: ['فقط همون fail میشه', 'همه cancel و خطا throw میشه', 'چیزی نمیشه', 'Retry میشه'],
        correctIndex: 1,
        explanation: 'اولین خطا باعث cancel شدن بقیه tasks و throw خطا میشه.'
      }
    ]
  },
  {
    id: 77,
    title: 'Typed Throws',
    titleEn: 'Typed Throws',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'Swift 6 typed throws برای مشخص کردن نوع دقیق خطا.',
    descriptionEn: 'Swift 6 typed throws for specifying exact error type.',
    code: `import Foundation

// Swift 6: Typed throws
enum NetworkError: Error {
    case invalidURL
    case timeout
    case serverError(Int)
}

// Typed throw
func fetchData() throws(NetworkError) -> Data {
    // ...
    throw .timeout
}

// Async typed throw
func fetchAsync() async throws(NetworkError) -> String {
    throw .serverError(500)
}

// Catching typed errors
func handleTyped() async {
    do {
        let data = try await fetchAsync()
        print(data)
    } catch .timeout {
        print("Timed out")
    } catch .serverError(let code) {
        print("Server error: \\(code)")
    } catch .invalidURL {
        print("Invalid URL")
    }
}

// Generic typed throws
func process<T, E: Error>(
    _ value: T,
    transform: (T) throws(E) -> T
) throws(E) -> T {
    return try transform(value)
}

// Never = no error
func safeFunction() throws(Never) -> Int {
    return 42 // Can't throw
}

// مزایا:
// 1. Compiler نوع خطا رو میدونه
// 2. Exhaustive checking
// 3. بهتر از generic Error`,
    explanation: 'Typed throws در Swift 6 اجازه میده نوع دقیق خطا رو مشخص کنیم.',
    explanationEn: 'Typed throws in Swift 6 allows specifying exact error type.',
    quiz: [
      {
        question: 'مزیت typed throws چیه؟',
        options: ['سرعت', 'Compiler نوع خطا رو میدونه', 'کد کمتر', 'حافظه کمتر'],
        correctIndex: 1,
        explanation: 'Typed throws به compiler اجازه میده نوع خطا رو بدونه و exhaustive checking کنه.'
      }
    ]
  },
  {
    id: 78,
    title: 'Retry Pattern پیشرفته',
    titleEn: 'Advanced Retry Pattern',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'الگوهای پیشرفته retry با exponential backoff و jitter.',
    descriptionEn: 'Advanced retry patterns with exponential backoff and jitter.',
    code: `import Foundation

// Advanced retry with backoff
func retryWithBackoff<T>(
    maxRetries: Int = 3,
    baseDelay: Duration = .seconds(1),
    maxDelay: Duration = .seconds(30),
    operation: () async throws -> T
) async throws -> T {
    var attempt = 0
    
    while true {
        do {
            return try await operation()
        } catch is CancellationError {
            throw CancellationError()
        } catch {
            attempt += 1
            guard attempt < maxRetries else { throw error }
            
            // Exponential backoff
            let delay = min(
                baseDelay * pow(2.0, Double(attempt - 1)),
                maxDelay
            )
            
            // Add jitter (±25%)
            let jitter = Double.random(in: 0.75...1.25)
            let finalDelay = delay * jitter
            
            try await Task.sleep(for: finalDelay)
        }
    }
}

// Retry with condition
func retryIf<T>(
    maxRetries: Int = 3,
    shouldRetry: (Error) -> Bool,
    operation: () async throws -> T
) async throws -> T {
    for attempt in 0...maxRetries {
        do {
            return try await operation()
        } catch {
            if attempt == maxRetries || !shouldRetry(error) {
                throw error
            }
            try await Task.sleep(for: .seconds(Double(attempt + 1)))
        }
    }
    throw URLError(.unknown)
}

// استفاده
func loadWithRetry() async throws -> String {
    try await retryWithBackoff(maxRetries: 5) {
        let url = URL(string: "https://api.example.com/data")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return String(data: data, encoding: .utf8) ?? ""
    }
}

// Retry فقط برای network errors
func loadSmart() async throws -> String {
    try await retryIf(
        maxRetries: 3,
        shouldRetry: { error in
            // فقط network errors رو retry کن
            error is URLError
        }
    ) {
        let url = URL(string: "https://api.example.com/data")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return String(data: data, encoding: .utf8) ?? ""
    }
}

extension Duration {
    static func * (lhs: Duration, rhs: Double) -> Duration {
        let ns = Int64(Double(1_000_000_000) * rhs)
        return .nanoseconds(ns)
    }
}`,
    explanation: 'Exponential backoff با jitter از thundering herd problem جلوگیری میکنه.',
    explanationEn: 'Exponential backoff with jitter prevents thundering herd problem.',
    quiz: [
      {
        question: 'Jitter در retry چرا مهمه؟',
        options: ['سرعت بیشتر', 'جلوگیری از thundering herd', 'حافظه کمتر', 'کد ساده‌تر'],
        correctIndex: 1,
        explanation: 'Jitter باعث میشه request ها همزمان نشن و server overload نشه.'
      }
    ]
  },
  {
    id: 79,
    title: 'Error Handling Best Practices',
    titleEn: 'Error Handling Best Practices',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'بهترین روش‌ها برای مدیریت خطا در کد async.',
    descriptionEn: 'Best practices for error handling in async code.',
    code: `import Foundation

// ✅ DO: Define specific error types
enum RepositoryError: Error {
    case notFound(id: String)
    case network(underlying: Error)
    case decoding(field: String)
    case unauthorized
}

// ✅ DO: Handle CancellationError separately
func loadData() async {
    do {
        let data = try await fetchData()
        updateUI(data)
    } catch is CancellationError {
        // Normal cancellation, not an error
        return
    } catch RepositoryError.notFound {
        showError("Not found")
    } catch {
        showError("Unexpected: \\(error)")
    }
}

// ✅ DO: Propagate errors properly
func processOrder() async throws -> Order {
    let user = try await fetchUser() // throws
    let items = try await fetchItems() // throws
    let order = try await createOrder(user, items) // throws
    return order
}

// ❌ DON'T: Swallow errors silently
func badExample() async {
    let _ = try? await fetchData() // Error ignored!
}

// ✅ DO: Log and handle
func goodExample() async {
    do {
        let data = try await fetchData()
        processData(data)
    } catch {
        logger.error("Failed to fetch: \\(error)")
        showFallbackUI()
    }
}

// ❌ DON'T: Use try! in production
// let data = try! await fetchData() // CRASH!

// ✅ DO: Use guard with errors
func validateAndProcess() async throws {
    let input = try await getInput()
    
    guard !input.isEmpty else {
        throw ValidationError.emptyInput
    }
    
    try await process(input)
}

enum ValidationError: Error {
    case emptyInput
}

// ✅ DO: Provide context in errors
struct ContextError: Error {
    let underlying: Error
    let context: String
    let file: String
    let line: Int
}

func withContext<T>(
    _ context: String,
    file: String = #file,
    line: Int = #line,
    operation: () async throws -> T
) async throws -> T {
    do {
        return try await operation()
    } catch {
        throw ContextError(
            underlying: error,
            context: context,
            file: file,
            line: line
        )
    }
}

let logger = Logger()
struct Order { }
func fetchData() async throws -> String { return "" }
func fetchUser() async throws -> String { return "" }
func fetchItems() async throws -> [String] { return [] }
func createOrder(_ u: String, _ i: [String]) async throws -> Order { return Order() }
func updateUI(_ d: String) {}
func showError(_ m: String) {}
func processData(_ d: String) {}
func showFallbackUI() {}
func getInput() async throws -> String { return "" }
func process(_ s: String) async throws {}`,
    explanation: 'Best practices: specific errors, handle cancellation, provide context, don\'t swallow.',
    explanationEn: 'Best practices: specific errors, handle cancellation, provide context, don\'t swallow.',
    quiz: [
      {
        question: 'کدوم best practice نیست؟',
        options: ['Specific error types', 'Swallow errors با try?', 'Handle CancellationError separately', 'Provide context'],
        correctIndex: 1,
        explanation: 'Swallow errors با try? bad practice هست. باید handle یا log بشه.'
      }
    ]
  },
  {
    id: 80,
    title: 'Quiz: Error Handling',
    titleEn: 'Quiz: Error Handling',
    category: 'error-handling',
    categoryEn: 'Error Handling',
    description: 'آزمون Error Handling.',
    descriptionEn: 'Error Handling quiz.',
    code: `// تحلیل:
func mystery3() async throws -> String {
    try await withThrowingTaskGroup(of: String.self) { group in
        group.addTask { "A" }
        group.addTask { throw URLError(.badURL) }
        group.addTask { "C" }
        
        var results: [String] = []
        for try await r in group {
            results.append(r)
        }
        return results.joined()
    }
}

// سوال: چه اتفاقی میفته؟`,
    explanation: 'Task دوم خطا میده. بقیه cancel میشن و خطا throw میشه. results فقط شامل A هست (اگه قبل از خطا اجرا شده باشه).',
    explanationEn: 'Second task throws. Others cancelled and error thrown. Results may contain A if it ran before error.',
    quiz: [
      {
        question: 'try? await func() چه برمیگردونه اگه خطا بده؟',
        options: ['Error', 'nil', 'Crash', 'Empty string'],
        correctIndex: 1,
        explanation: 'try? خطا رو نادیده میگیره و nil برمیگردونه.'
      },
      {
        question: 'CancellationError رو چطور handle کنیم؟',
        options: ['مثل بقیه خطاها', 'جداگانه - normal هست', 'Ignor کنیم', 'Crash کنیم'],
        correctIndex: 1,
        explanation: 'CancellationError یک عمل normal هست و باید جداگانه handle بشه.'
      }
    ]
  },

  // === ADVANCED 81-90 ===
  {
    id: 81,
    title: 'Task Executor / Custom Executors',
    titleEn: 'Task Executors',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'Custom executors برای کنترل بیشتر روی scheduling.',
    descriptionEn: 'Custom executors for more control over scheduling.',
    code: `import Foundation

// Swift 5.9+: Custom executors
// actor با custom executor

actor CustomExecutorActor {
    // Default: cooperative thread pool
    
    // Methods run on this actor's executor
    func doWork() {
        // ...
    }
}

// Global actor با custom executor
@globalActor
actor MyGlobalActor {
    static let shared = MyGlobalActor()
}

// در عمل:
// - MainActor: main thread executor
// - Custom actors: cooperative pool
// - Task.detached: might use different pool

// Executor preferences
func executorDemo() async {
    // Default executor
    await defaultWork()
    
    // MainActor executor
    await MainActor.run {
        uiWork()
    }
}

func defaultWork() async {}
func uiWork() {}

// Priority affects executor behavior
Task(priority: .userInteractive) {
    // Might get more CPU time
}

Task(priority: .background) {
    // Lower priority in scheduling
}

// نکته: در Swift 6، custom task executors
// بیشتر کنترل میدن ولی پیچیده‌تر هستن`,
    explanation: 'Executors تعیین میکنن کد کجا اجرا بشه. MainActor یک executor خاص برای main thread هست.',
    explanationEn: 'Executors determine where code runs. MainActor is a special executor for main thread.',
    quiz: [
      {
        question: 'MainActor از چه executor ای استفاده میکنه؟',
        options: ['Cooperative pool', 'Main thread executor', 'Background pool', 'Custom'],
        correctIndex: 1,
        explanation: 'MainActor از main thread executor استفاده میکنه.'
      }
    ]
  },
  {
    id: 82,
    title: 'Async/Await با SwiftUI',
    titleEn: 'Async/Await with SwiftUI',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'بهترین روش‌ها برای استفاده async/await در SwiftUI.',
    descriptionEn: 'Best practices for using async/await in SwiftUI.',
    code: `import SwiftUI

// .task modifier
struct ContentView: View {
    @State var data: String = ""
    @State var isLoading = true
    
    var body: some View {
        VStack {
            if isLoading {
                ProgressView()
            } else {
                Text(data)
            }
        }
        .task {
            // خودکار cancel میشه وقتی view بره
            do {
                data = try await fetchData()
            } catch {
                data = "Error"
            }
            isLoading = false
        }
    }
}

// .task(id:) - re-run وقتی id عوض بشه
struct DetailView: View {
    let userId: Int
    @State var user: String = ""
    
    var body: some View {
        Text(user)
            .task(id: userId) {
                // Re-run وقتی userId عوض بشه
                user = await fetchUser(id: userId)
            }
    }
}

// @MainActor ViewModel
@MainActor
class ContentViewModel: ObservableObject {
    @Published var items: [String] = []
    @Published var isLoading = false
    
    func loadItems() async {
        isLoading = true
        items = await fetchItems()
        isLoading = false
    }
}

struct ListView: View {
    @StateObject var vm = ContentViewModel()
    
    var body: some View {
        List(vm.items, id: \\.self) { item in
            Text(item)
        }
        .task {
            await vm.loadItems()
        }
        .refreshable {
            await vm.loadItems()
        }
    }
}

func fetchData() async throws -> String { return "Hello" }
func fetchUser(id: Int) async -> String { return "User" }
func fetchItems() async -> [String] { return ["A", "B"] }`,
    explanation: '.task modifier بهترین راه برای async work در SwiftUI هست. خودکار cancel میشه.',
    explanationEn: '.task modifier is the best way for async work in SwiftUI. Automatically cancelled.',
    quiz: [
      {
        question: '.task modifier چه وقتی cancel میشه؟',
        options: ['هرگز', 'وقتی view disappear بشه', 'بعد از 10 ثانیه', 'دستی'],
        correctIndex: 1,
        explanation: '.task خودکار وقتی view از بین بره cancel میشه.'
      }
    ]
  },
  {
    id: 83,
    title: 'Concurrency Testing',
    titleEn: 'Concurrency Testing',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'تست کردن کد async و actors.',
    descriptionEn: 'Testing async code and actors.',
    code: `import XCTest

// Async test
class MyTests: XCTestCase {
    // Async test method
    func testFetchData() async throws {
        let result = try await fetchData()
        XCTAssertFalse(result.isEmpty)
    }
    
    // Test with timeout
    func testWithTimeout() async throws {
        try await withTimeout(seconds: 5) {
            let result = try await slowOperation()
            XCTAssertEqual(result, "expected")
        }
    }
    
    // Test actor
    func testCounter() async {
        let counter = Counter()
        
        // Concurrent increments
        await withTaskGroup(of: Void.self) { group in
            for _ in 0..<100 {
                group.addTask {
                    await counter.increment()
                }
            }
        }
        
        let count = await counter.count
        XCTAssertEqual(count, 100)
    }
}

// Mock repository
actor MockRepository {
    var fetchCallCount = 0
    var savedItems: [String] = []
    var mockData: [String] = ["Test"]
    
    func fetch() -> [String] {
        fetchCallCount += 1
        return mockData
    }
    
    func save(_ item: String) {
        savedItems.append(item)
    }
}

// Test with mock
class ViewModelTests: XCTestCase {
    func testViewModel() async {
        let mock = MockRepository()
        let vm = ViewModel(repository: mock)
        
        await vm.loadData()
        
        let callCount = await mock.fetchCallCount
        XCTAssertEqual(callCount, 1)
    }
}

actor Counter {
    var count = 0
    func increment() { count += 1 }
}

func fetchData() async throws -> String { return "data" }
func slowOperation() async throws -> String { return "expected" }
func withTimeout<T>(seconds: Double, operation: () async throws -> T) async throws -> T {
    try await operation()
}

protocol RepositoryProtocol {
    func fetch() async -> [String]
    func save(_ item: String) async
}

@MainActor
class ViewModel: ObservableObject {
    let repository: MockRepository
    init(repository: MockRepository) { self.repository = repository }
    func loadData() async {
        let _ = await repository.fetch()
    }
}`,
    explanation: 'XCTest از async test methods پشتیبانی میکنه. Actor testing با await.',
    explanationEn: 'XCTest supports async test methods. Actor testing with await.',
    quiz: [
      {
        question: 'آیا XCTest از async test پشتیبانی میکنه؟',
        options: ['بله', 'خیر', 'فقط در Swift 6', 'فقط macOS'],
        correctIndex: 0,
        explanation: 'XCTest از async test methods پشتیبانی میکنه.'
      }
    ]
  },
  {
    id: 84,
    title: 'Performance Considerations',
    titleEn: 'Performance Considerations',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'نکات performance در concurrency.',
    descriptionEn: 'Performance tips in concurrency.',
    code: `import Foundation

// ❌ Over-creating tasks
func badPerformance() async {
    for i in 0..<10000 {
        Task { // 10000 tasks!
            await process(i)
        }
    }
}

// ✅ Batch processing
func goodPerformance() async {
    await withTaskGroup(of: Void.self) { group in
        let batchSize = 100
        for batch in stride(from: 0, to: 10000, by: batchSize) {
            group.addTask {
                for i in batch..<(batch + batchSize) {
                    await process(i)
                }
            }
        }
    }
}

// ❌ Too many awaits
func tooManyAwaits() async {
    let a = await fetchA() // suspend
    let b = await fetchB() // suspend
    let c = await fetchC() // suspend
    // Sequential!
}

// ✅ Parallel
func parallelFetch() async {
    async let a = fetchA()
    async let b = fetchB()
    async let c = fetchC()
    let _ = await (a, b, c) // Parallel!
}

// Actor overhead
actor HeavyActor {
    var data: [Int] = []
    
    // هر فراخوانی overhead داره
    func addOne(_ value: Int) {
        data.append(value)
    }
}

// ✅ Batch operations
actor BatchActor {
    var data: [Int] = []
    
    func addBatch(_ values: [Int]) {
        data.append(contentsOf: values)
    }
}

// Memory considerations
// ❌ Retaining large data in tasks
func retainIssue() async {
    let largeData = Data(count: 100_000_000) // 100MB
    
    Task {
        // largeData retained until task completes
        await process(largeData)
    }
}

// ✅ Release early
func releaseEarly() async {
    let result = await withTaskGroup(of: Data.self) { group in
        group.addTask {
            return await generateData()
        }
        return await group.next()!
    }
    // large data released after group
    await process(result)
}

func process(_ i: Int) async {}
func fetchA() async -> Int { return 1 }
func fetchB() async -> Int { return 2 }
func fetchC() async -> Int { return 3 }
func generateData() async -> Data { return Data() }
func process(_ d: Data) async {}`,
    explanation: 'Batch processing، parallel fetch، و actor overhead رو در نظر بگیرید.',
    explanationEn: 'Consider batch processing, parallel fetch, and actor overhead.',
    quiz: [
      {
        question: 'چرا ساختن 10000 Task بد هست؟',
        options: ['خطا میده', 'Overhead زیاد', 'ممنوع هست', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'هر Task overhead داره. Batch processing بهتره.'
      }
    ]
  },
  {
    id: 85,
    title: 'Migration from GCD',
    titleEn: 'Migration from GCD',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'چطور کد GCD قدیمی رو به async/await مهاجرت بدیم.',
    descriptionEn: 'How to migrate old GCD code to async/await.',
    code: `import Foundation

// ❌ OLD: GCD
func oldWay() {
    DispatchQueue.global().async {
        let result = heavyWork()
        DispatchQueue.main.async {
            self.label.text = result
        }
    }
}

// ✅ NEW: async/await
func newWay() async {
    let result = await heavyWork()
    await MainActor.run {
        self.label.text = result
    }
}

// ❌ OLD: DispatchGroup
func oldGroup() {
    let group = DispatchGroup()
    
    group.enter()
    fetchA { group.leave() }
    
    group.enter()
    fetchB { group.leave() }
    
    group.notify(queue: .main) {
        print("All done")
    }
}

// ✅ NEW: TaskGroup
func newGroup() async {
    await withTaskGroup(of: Void.self) { group in
        group.addTask { await fetchA() }
        group.addTask { await fetchB() }
    }
    print("All done")
}

// ❌ OLD: DispatchSemaphore
func oldSemaphore() {
    let semaphore = DispatchSemaphore(value: 1)
    semaphore.wait()
    // critical section
    semaphore.signal()
}

// ✅ NEW: Actor
actor SafeResource {
    var data: Int = 0
    
    func modify() {
        // Only one at a time
        data += 1
    }
}

// ❌ OLD: Completion handlers
func oldAPI(completion: @escaping (String) -> Void) {
    fetchData { data in
        completion(data)
    }
}

// ✅ NEW: async
func newAPI() async -> String {
    return await fetchData()
}

// Bridging: old to new
func bridgedAPI() async -> String {
    await withCheckedContinuation { continuation in
        oldAPI { result in
            continuation.resume(returning: result)
        }
    }
}

// Bridging: new to old
func legacyAPI(completion: @escaping (String) -> Void) {
    Task {
        let result = await newAPI()
        completion(result)
    }
}

var label: AnyObject!
func heavyWork() async -> String { return "done" }
func heavyWork() -> String { return "done" }
func fetchA() async {}
func fetchB() async {}
func fetchA(completion: @escaping () -> Void) { completion() }
func fetchB(completion: @escaping () -> Void) { completion() }
func fetchData(completion: @escaping (String) -> Void) { completion("data") }
func fetchData() async -> String { return "data" }`,
    explanation: 'Migration guide: GCD -> async/await, DispatchGroup -> TaskGroup, Semaphore -> Actor.',
    explanationEn: 'Migration guide: GCD -> async/await, DispatchGroup -> TaskGroup, Semaphore -> Actor.',
    quiz: [
      {
        question: 'DispatchSemaphore رو با چی جایگزین کنیم؟',
        options: ['Task', 'Actor', 'TaskGroup', 'async let'],
        correctIndex: 1,
        explanation: 'Actor جایگزین modern برای DispatchSemaphore هست.'
      }
    ]
  },
  {
    id: 86,
    title: 'Concurrency در Server-Side Swift',
    titleEn: 'Concurrency in Server-Side Swift',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'استفاده از async/await در Vapor و server-side Swift.',
    descriptionEn: 'Using async/await in Vapor and server-side Swift.',
    code: `import Foundation
// import Vapor

// Vapor route handler
// app.get("users") { req async throws -> [User] in
//     let users = try await User.query(on: req.db).all()
//     return users
// }

// Concurrent database queries
func fetchDashboard() async throws -> DashboardData {
    async let users = countUsers()
    async let orders = countOrders()
    async let revenue = calculateRevenue()
    
    return DashboardData(
        userCount: await users,
        orderCount: await orders,
        revenue: await revenue
    )
}

// Middleware با async
// struct AuthMiddleware: AsyncMiddleware {
//     func respond(to req: Request, chaining to: AsyncResponder) async throws -> Response {
//         guard let token = req.headers.bearerAuthorization else {
//             throw Abort(.unauthorized)
//         }
//         let user = try await authenticate(token: token.token)
//         req.auth.login(user)
//         return try await to.respond(to: req)
//     }
// }

// Background jobs
func scheduleBackgroundJob() {
    Task.detached(priority: .background) {
        while !Task.isCancelled {
            await processQueue()
            try? await Task.sleep(for: .minutes(5))
        }
    }
}

// WebSocket با async
// app.webSocket("chat") { req, ws in
//     for try await message in ws.asyncMessages() {
//         await broadcast(message)
//     }
// }

struct DashboardData {
    let userCount: Int
    let orderCount: Int
    let revenue: Double
}

func countUsers() async -> Int { return 100 }
func countOrders() async -> Int { return 500 }
func calculateRevenue() async -> Double { return 9999.99 }
func processQueue() async {}
func broadcast(_ msg: String) async {}`,
    explanation: 'Server-side Swift هم از async/await استفاده میکنه. Vapor و Hummingbird پشتیبانی میکنن.',
    explanationEn: 'Server-side Swift also uses async/await. Vapor and Hummingbird support it.',
    quiz: [
      {
        question: 'کدوم framework server-side Swift از async/await پشتیبانی میکنه؟',
        options: ['Vapor', 'Express', 'Rails', 'Django'],
        correctIndex: 0,
        explanation: 'Vapor یکی از محبوب‌ترین server-side Swift frameworks هست.'
      }
    ]
  },
  {
    id: 87,
    title: 'Swift 6 Strict Concurrency',
    titleEn: 'Swift 6 Strict Concurrency',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'Swift 6 strict concurrency checking و تأثیرش.',
    descriptionEn: 'Swift 6 strict concurrency checking and its impact.',
    code: `import Foundation

// Swift 6: Strict concurrency by default
// - Data races detected at compile time
// - Sendable checking enforced
// - Actor isolation strict

// Before Swift 6: warnings
// Swift 6: errors

// Example:
class OldModel {
    var data: String = "" // Warning in Swift 5, Error in Swift 6
    
    func update() {
        data = "new" // Data race possible
    }
}

// Fix 1: Actor
actor NewModel {
    var data: String = ""
    
    func update() {
        data = "new" // Safe
    }
}

// Fix 2: @MainActor
@MainActor
class UIModel {
    var data: String = ""
    
    func update() {
        data = "new" // Safe - main thread only
    }
}

// Fix 3: Sendable + immutable
struct ImmutableModel: Sendable {
    let data: String
}

// Migration:
// 1. Enable strict concurrency in build settings
// 2. Fix errors one by one
// 3. Use @preconcurrency for gradual migration

// @preconcurrency import
// @preconcurrency import OldLibrary

// This suppresses Sendable warnings from old code
// while you migrate gradually

// Swift 6 guarantees:
// ✅ If it compiles, no data races
// ✅ Sendable enforced
// ✅ Actor isolation checked
// ✅ Region-based isolation`,
    explanation: 'Swift 6 strict concurrency تضمین میکنه اگه compile بشه، data race نداره.',
    explanationEn: 'Swift 6 strict concurrency ensures if it compiles, no data races.',
    quiz: [
      {
        question: 'تضمین اصلی Swift 6 concurrency چیه؟',
        options: ['سرعت بیشتر', 'اگه compile بشه data race نداره', 'کد کمتر', 'API بهتر'],
        correctIndex: 1,
        explanation: 'Swift 6 تضمین میکنه اگه کد compile بشه، data race نداره.'
      }
    ]
  },
  {
    id: 88,
    title: 'Observation Framework و Concurrency',
    titleEn: 'Observation Framework & Concurrency',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'ارتباط Observation framework (iOS 17) با concurrency.',
    descriptionEn: 'Relationship between Observation framework (iOS 17) and concurrency.',
    code: `import SwiftUI
import Observation

// @Observable - جایگزین ObservableObject
@Observable
class UserModel {
    var name: String = ""
    var age: Int = 0
    var isLoading: Bool = false
    
    // Async method
    func loadUser() async {
        isLoading = true
        let user = await fetchUser()
        name = user.name
        age = user.age
        isLoading = false
    }
}

// SwiftUI View
struct UserView: View {
    @State var model = UserModel()
    
    var body: some View {
        VStack {
            if model.isLoading {
                ProgressView()
            } else {
                Text("\\(model.name) - \\(model.age)")
            }
        }
        .task {
            await model.loadUser()
        }
    }
}

// @Observable خودکار main actor isolated نیست
// ولی property access از main thread safe هست
// چون Observation framework thread-safe هست

// ترکیب با @MainActor
@Observable
@MainActor
class StrictModel {
    var data: String = ""
    
    func update() async {
        let result = await fetchData()
        data = result // Safe - MainActor
    }
}

// بدون @MainActor
@Observable
class RelaxedModel {
    var data: String = ""
    
    func update() async {
        let result = await fetchData()
        // Observation framework handles thread safety
        self.data = result
    }
}

struct User { let name: String; let age: Int }
func fetchUser() async -> User { return User(name: "Ali", age: 25) }
func fetchData() async -> String { return "data" }`,
    explanation: '@Observable framework جدید Apple هست. با concurrency خوب کار میکنه.',
    explanationEn: '@Observable is Apple\'s new framework. Works well with concurrency.',
    quiz: [
      {
        question: '@Observable جایگزین چیه؟',
        options: ['@State', 'ObservableObject', '@Published', 'Combine'],
        correctIndex: 1,
        explanation: '@Observable جایگزین modern برای ObservableObject هست.'
      }
    ]
  },
  {
    id: 89,
    title: 'Distributed Actors',
    titleEn: 'Distributed Actors',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'Distributed actors برای ارتباط بین processes و machines.',
    descriptionEn: 'Distributed actors for communication between processes and machines.',
    code: `import Foundation
// import Distributed

// Distributed actor (Swift 5.7+)
// distributed actor Worker {
//     var processedCount: Int = 0
//     
//     distributed func process(_ item: String) -> String {
//         processedCount += 1
//         return "Processed: \\(item)"
//     }
//     
//     distributed func getStatus() -> Int {
//         return processedCount
//     }
// }

// Distributed actors:
// 1. Can communicate across process boundaries
// 2. Methods are implicitly async throws
// 3. Parameters must be Codable
// 4. Used with Distributed Actor System

// Example: Client-Server
// distributed actor Server {
//     distributed func handleRequest(_ req: Request) -> Response {
//         // Process request
//         return Response(data: "result")
//     }
// }

// distributed actor Client {
//     let server: Server
//     
//     func makeRequest() async throws {
//         let response = try await server.handleRequest(Request())
//         print(response)
//     }
// }

// Use cases:
// - Microservices
// - Cluster computing
// - Remote procedure calls
// - Multi-process apps

// Actor system
// class LocalActorSystem: ActorSystem {
//     // Manages actor lifecycle
//     // Handles message serialization
//     // Manages remote connections
// }

// Note: Distributed actors still evolving
// Main use: server-side Swift, microservices`,
    explanation: 'Distributed actors برای ارتباط بین processes مفیدن. هنوز در حال توسعه هستن.',
    explanationEn: 'Distributed actors for inter-process communication. Still evolving.',
    quiz: [
      {
        question: 'Distributed actors برای چه مفیدن؟',
        options: ['UI', 'ارتباط بین processes', 'File I/O', 'Database'],
        correctIndex: 1,
        explanation: 'Distributed actors برای ارتباط بین processes و machines مفیدن.'
      }
    ]
  },
  {
    id: 90,
    title: 'Quiz: Advanced Patterns',
    titleEn: 'Quiz: Advanced Patterns',
    category: 'advanced',
    categoryEn: 'Advanced Patterns',
    description: 'آزمون الگوهای پیشرفته.',
    descriptionEn: 'Advanced patterns quiz.',
    code: `// تحلیل:
@Observable
class Model {
    var data: String = ""
    
    func load() async {
        data = await fetchData()
    }
}

// سوال: آیا این code safe هست در Swift 6؟`,
    explanation: 'بستگی داره. @Observable thread-safe هست ولی اگه از چند thread همزمان modify بشه ممکنه مشکل داشته باشه.',
    explanationEn: 'Depends. @Observable is thread-safe but concurrent modification might be problematic.',
    quiz: [
      {
        question: 'Swift 6 strict concurrency چه تضمینی میده؟',
        options: ['سرعت', 'No data races اگه compile بشه', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Swift 6 تضمین میکنه اگه compile بشه، data race نداره.'
      },
      {
        question: 'Distributed actors برای چه مفیدن؟',
        options: ['UI', 'Inter-process communication', 'File I/O', 'Testing'],
        correctIndex: 1,
        explanation: 'Distributed actors برای ارتباط بین processes مفیدن.'
      }
    ]
  },

  // === REAL WORLD 91-100 ===
  {
    id: 91,
    title: 'پروژه: اپ آب و هوا',
    titleEn: 'Project: Weather App',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک اپ آب و هوا با async/await و SwiftUI.',
    descriptionEn: 'Building a weather app with async/await and SwiftUI.',
    code: `import SwiftUI

// Models
struct WeatherResponse: Codable {
    let name: String
    let main: Main
    let weather: [Weather]
}

struct Main: Codable {
    let temp: Double
    let humidity: Int
}

struct Weather: Codable {
    let description: String
    let icon: String
}

// Service
@MainActor
class WeatherService {
    private let apiKey = "YOUR_API_KEY"
    
    func fetchWeather(city: String) async throws -> WeatherResponse {
        let urlString = "https://api.openweathermap.org/data/2.5/weather?q=\\(city)&appid=\\(apiKey)&units=metric"
        guard let url = URL(string: urlString) else {
            throw URLError(.badURL)
        }
        
        let (data, response) = try await URLSession.shared.data(from: url)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }
        
        return try JSONDecoder().decode(WeatherResponse.self, from: data)
    }
    
    func fetchMultipleCities(_ cities: [String]) async -> [String: WeatherResponse?] {
        await withTaskGroup(of: (String, WeatherResponse?).self) { group in
            for city in cities {
                group.addTask {
                    let weather = try? await self.fetchWeather(city: city)
                    return (city, weather)
                }
            }
            
            var results: [String: WeatherResponse?] = [:]
            for await (city, weather) in group {
                results[city] = weather
            }
            return results
        }
    }
}

// ViewModel
@MainActor
class WeatherViewModel: ObservableObject {
    @Published var weather: WeatherResponse?
    @Published var isLoading = false
    @Published var error: String?
    @Published var city: String = "Tehran"
    
    private let service = WeatherService()
    
    func loadWeather() async {
        isLoading = true
        error = nil
        
        do {
            weather = try await service.fetchWeather(city: city)
        } catch {
            self.error = error.localizedDescription
        }
        
        isLoading = false
    }
}

// View
struct WeatherView: View {
    @StateObject var vm = WeatherViewModel()
    
    var body: some View {
        VStack(spacing: 20) {
            TextField("City", text: $vm.city)
                .textFieldStyle(.roundedBorder)
            
            Button("Search") {
                Task {
                    await vm.loadWeather()
                }
            }
            
            if vm.isLoading {
                ProgressView()
            } else if let error = vm.error {
                Text(error).foregroundColor(.red)
            } else if let weather = vm.weather {
                VStack {
                    Text(weather.name).font(.title)
                    Text("\\(Int(weather.main.temp))°C").font(.largeTitle)
                    Text(weather.weather.first?.description ?? "")
                    Text("Humidity: \\(weather.main.humidity)%")
                }
            }
        }
        .padding()
        .task {
            await vm.loadWeather()
        }
    }
}`,
    explanation: 'یک اپ کامل آب و هوا با service layer، ViewModel و View.',
    explanationEn: 'A complete weather app with service layer, ViewModel and View.',
    quiz: [
      {
        question: 'چرا WeatherService @MainActor هست؟',
        options: ['سرعت', 'برای safe UI update', 'مجبور نیست', 'فرقی نداره'],
        correctIndex: 1,
        explanation: '@MainActor تضمین میکنه UI updates safe هستن.'
      }
    ]
  },
  {
    id: 92,
    title: 'پروژه: Image Gallery',
    titleEn: 'Project: Image Gallery',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک image gallery با async image loading.',
    descriptionEn: 'Building an image gallery with async image loading.',
    code: `import SwiftUI

// Image Cache Actor
actor ImageCache {
    static let shared = ImageCache()
    private var cache: [URL: UIImage] = [:]
    
    func image(for url: URL) -> UIImage? {
        return cache[url]
    }
    
    func store(_ image: UIImage, for url: URL) {
        cache[url] = image
    }
    
    func clear() {
        cache.removeAll()
    }
}

// Image Loader
@MainActor
class ImageLoader: ObservableObject {
    @Published var image: UIImage?
    @Published var isLoading = false
    
    func load(from url: URL) async {
        // Check cache
        if let cached = await ImageCache.shared.image(for: url) {
            image = cached
            return
        }
        
        isLoading = true
        
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            if let uiImage = UIImage(data: data) {
                image = uiImage
                await ImageCache.shared.store(uiImage, for: url)
            }
        } catch {
            print("Failed to load: \\(error)")
        }
        
        isLoading = false
    }
}

// Async Image View
struct AsyncImageView: View {
    let url: URL
    @State private var image: UIImage?
    @State private var isLoading = true
    
    var body: some View {
        ZStack {
            if let image = image {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } else if isLoading {
                ProgressView()
            } else {
                Image(systemName: "photo")
                    .foregroundColor(.gray)
            }
        }
        .task(id: url) {
            await loadImage()
        }
    }
    
    private func loadImage() async {
        // Check cache first
        if let cached = await ImageCache.shared.image(for: url) {
            image = cached
            isLoading = false
            return
        }
        
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            if let uiImage = UIImage(data: data) {
                image = uiImage
                await ImageCache.shared.store(uiImage, for: url)
            }
        } catch {
            print("Error: \\(error)")
        }
        isLoading = false
    }
}

// Gallery View
struct GalleryView: View {
    let imageUrls: [URL]
    let columns = [GridItem(.adaptive(minimum: 100))]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 8) {
                ForEach(imageUrls, id: \\.self) { url in
                    AsyncImageView(url: url)
                        .frame(width: 100, height: 100)
                        .clipped()
                        .cornerRadius(8)
                }
            }
            .padding()
        }
    }
}`,
    explanation: 'Image gallery با actor cache و async loading. LazyVGrid برای performance.',
    explanationEn: 'Image gallery with actor cache and async loading. LazyVGrid for performance.',
    quiz: [
      {
        question: 'چرا ImageCache یک actor هست؟',
        options: ['سرعت', 'محافظت از mutable state', 'ساده‌تر', 'مجبور'],
        correctIndex: 1,
        explanation: 'Actor از mutable cache در برابر data races محافظت میکنه.'
      }
    ]
  },
  {
    id: 93,
    title: 'پروژه: Chat App',
    titleEn: 'Project: Chat App',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک اپ چت با WebSocket و AsyncStream.',
    descriptionEn: 'Building a chat app with WebSocket and AsyncStream.',
    code: `import SwiftUI

// Message model
struct ChatMessage: Identifiable, Sendable {
    let id: UUID
    let sender: String
    let text: String
    let timestamp: Date
}

// Chat Service with AsyncStream
actor ChatService {
    private var messageStream: AsyncStream<ChatMessage>.Continuation?
    private var messages: [ChatMessage] = []
    
    nonisolated func messageUpdates() -> AsyncStream<ChatMessage> {
        AsyncStream { continuation in
            Task {
                await self.registerStream(continuation)
            }
            
            continuation.onTermination = { @Sendable _ in
                Task {
                    await self.unregisterStream()
                }
            }
        }
    }
    
    private func registerStream(_ continuation: AsyncStream<ChatMessage>.Continuation) {
        messageStream = continuation
    }
    
    private func unregisterStream() {
        messageStream = nil
    }
    
    func sendMessage(_ text: String, from sender: String) async {
        let message = ChatMessage(
            id: UUID(),
            sender: sender,
            text: text,
            timestamp: Date()
        )
        
        messages.append(message)
        messageStream?.yield(message)
        
        // Send to server
        await sendToServer(message)
    }
    
    func receiveMessage(_ message: ChatMessage) {
        messages.append(message)
        messageStream?.yield(message)
    }
    
    func getHistory() -> [ChatMessage] {
        return messages
    }
    
    private func sendToServer(_ message: ChatMessage) async {
        // WebSocket send
        try? await Task.sleep(for: .milliseconds(100))
    }
}

// ViewModel
@MainActor
class ChatViewModel: ObservableObject {
    @Published var messages: [ChatMessage] = []
    @Published var inputText: String = ""
    
    private let chatService = ChatService()
    private let currentUser = "User"
    
    func startListening() async {
        for await message in await chatService.messageUpdates() {
            messages.append(message)
        }
    }
    
    func send() async {
        guard !inputText.isEmpty else { return }
        await chatService.sendMessage(inputText, from: currentUser)
        inputText = ""
    }
    
    func loadHistory() async {
        messages = await chatService.getHistory()
    }
}

// View
struct ChatView: View {
    @StateObject var vm = ChatViewModel()
    
    var body: some View {
        VStack {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack {
                        ForEach(vm.messages) { message in
                            MessageBubble(message: message)
                                .id(message.id)
                        }
                    }
                }
                .onChange(of: vm.messages.count) { _, _ in
                    if let last = vm.messages.last {
                        proxy.scrollTo(last.id, anchor: .bottom)
                    }
                }
            }
            
            HStack {
                TextField("Message", text: $vm.inputText)
                    .textFieldStyle(.roundedBorder)
                
                Button("Send") {
                    Task { await vm.send() }
                }
            }
            .padding()
        }
        .task {
            await vm.loadHistory()
            await vm.startListening()
        }
    }
}

struct MessageBubble: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.sender == "User" {
                Spacer()
            }
            VStack(alignment: message.sender == "User" ? .trailing : .leading) {
                Text(message.text)
                    .padding(10)
                    .background(message.sender == "User" ? Color.blue : Color.gray)
                    .foregroundColor(.white)
                    .cornerRadius(12)
            }
            if message.sender != "User" {
                Spacer()
            }
        }
        .padding(.horizontal)
    }
}`,
    explanation: 'Chat app با AsyncStream برای real-time messages و actor برای thread safety.',
    explanationEn: 'Chat app with AsyncStream for real-time messages and actor for thread safety.',
    quiz: [
      {
        question: 'چرا ChatService یک actor هست؟',
        options: ['سرعت', 'messages و stream thread-safe هستن', 'مجبور', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Actor تضمین میکنه messages و stream state thread-safe هستن.'
      }
    ]
  },
  {
    id: 94,
    title: 'پروژه: File Downloader',
    titleEn: 'Project: File Downloader',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک file downloader با progress و cancellation.',
    descriptionEn: 'Building a file downloader with progress and cancellation.',
    code: `import Foundation

// Download Task
struct DownloadTask: Identifiable {
    let id: UUID
    let url: URL
    let filename: String
    var progress: Double
    var state: DownloadState
    
    enum DownloadState {
        case pending
        case downloading
        case completed(URL)
        case failed(Error)
        case cancelled
    }
}

// Download Manager
actor DownloadManager {
    private var tasks: [UUID: (task: Task<Void, Never>, download: DownloadTask)] = [:]
    
    func addDownload(url: URL, filename: String) -> UUID {
        let id = UUID()
        var download = DownloadTask(
            id: id, url: url, filename: filename,
            progress: 0, state: .pending
        )
        
        let task = Task {
            await self.startDownload(id: id, url: url, filename: filename)
        }
        
        tasks[id] = (task, download)
        return id
    }
    
    private func startDownload(id: UUID, url: URL, filename: String) async {
        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            
            guard Task.isCancelled == false else {
                await self.updateState(id: id, state: .cancelled)
                return
            }
            
            // Save file
            let documentsDir = FileManager.default.urls(
                for: .documentDirectory, in: .userDomainMask
            )[0]
            let fileURL = documentsDir.appendingPathComponent(filename)
            try data.write(to: fileURL)
            
            await self.updateState(id: id, state: .completed(fileURL))
        } catch is CancellationError {
            await self.updateState(id: id, state: .cancelled)
        } catch {
            await self.updateState(id: id, state: .failed(error))
        }
    }
    
    private func updateState(id: UUID, state: DownloadTask.DownloadState) {
        if var entry = tasks[id] {
            entry.download.state = state
            tasks[id] = entry
        }
    }
    
    func cancelDownload(id: UUID) {
        tasks[id]?.task.cancel()
    }
    
    func getTask(id: UUID) -> DownloadTask? {
        return tasks[id]?.download
    }
    
    func getAllTasks() -> [DownloadTask] {
        return tasks.values.map { $0.download }
    }
}

// Usage
func downloadExample() async {
    let manager = DownloadManager()
    
    let urls = [
        (URL(string: "https://example.com/file1.zip")!, "file1.zip"),
        (URL(string: "https://example.com/file2.zip")!, "file2.zip"),
        (URL(string: "https://example.com/file3.zip")!, "file3.zip"),
    ]
    
    // Add downloads
    var ids: [UUID] = []
    for (url, filename) in urls {
        let id = await manager.addDownload(url: url, filename: filename)
        ids.append(id)
    }
    
    // Monitor progress
    for id in ids {
        if let task = await manager.getTask(id: id) {
            print("\\(task.filename): \\(task.state)")
        }
    }
    
    // Cancel one
    if let firstId = ids.first {
        await manager.cancelDownload(id: firstId)
    }
}`,
    explanation: 'Download manager با actor برای thread safety و Task برای cancellation.',
    explanationEn: 'Download manager with actor for thread safety and Task for cancellation.',
    quiz: [
      {
        question: 'چرا DownloadManager یک actor هست؟',
        options: ['سرعت', 'محافظت از tasks dictionary', 'مجبور', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Actor از mutable tasks dictionary محافظت میکنه.'
      }
    ]
  },
  {
    id: 95,
    title: 'پروژه: Data Pipeline',
    titleEn: 'Project: Data Pipeline',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک data processing pipeline با AsyncStream.',
    descriptionEn: 'Building a data processing pipeline with AsyncStream.',
    code: `import Foundation

// Pipeline stage
typealias Stage<I, O> = (AsyncStream<I>) -> AsyncStream<O>

// Create a stage
func makeStage<Input: Sendable, Output: Sendable>(
    transform: @escaping @Sendable (Input) async -> Output
) -> (AsyncStream<Input>) -> AsyncStream<Output> {
    return { input in
        AsyncStream { continuation in
            Task {
                for await value in input {
                    let result = await transform(value)
                    continuation.yield(result)
                }
                continuation.finish()
            }
        }
    }
}

// Pipeline
struct Pipeline<Input: Sendable, Output: Sendable> {
    let process: (AsyncStream<Input>) -> AsyncStream<Output>
    
    func pipe<NewOutput: Sendable>(
        _ stage: @escaping (AsyncStream<Output>) -> AsyncStream<NewOutput>
    ) -> Pipeline<Input, NewOutput> {
        Pipeline<Input, NewOutput> { input in
            stage(process(input))
        }
    }
    
    func execute(_ values: [Input]) async -> [Output] {
        let stream = AsyncStream<Input> { cont in
            for v in values { cont.yield(v) }
            cont.finish()
        }
        
        var results: [Output] = []
        for await result in process(stream) {
            results.append(result)
        }
        return results
    }
}

// Example pipeline
func processDataPipeline() async {
    // Stage 1: Parse strings to numbers
    let parse = makeStage { (input: String) -> Int? in
        Int(input)
    }
    
    // Stage 2: Double numbers
    let double = makeStage { (input: Int?) -> Int in
        (input ?? 0) * 2
    }
    
    // Stage 3: Convert to string
    let stringify = makeStage { (input: Int) -> String in
        "Result: \\(input)"
    }
    
    // Build pipeline
    let pipeline = Pipeline<String, Int?>(process: parse)
        .pipe(double)
        .pipe(stringify)
    
    // Execute
    let inputs = ["1", "2", "abc", "4", "5"]
    let results = await pipeline.execute(inputs)
    
    for result in results {
        print(result)
    }
    // Result: 2
    // Result: 4
    // Result: 0
    // Result: 8
    // Result: 10
}

// Real-world: ETL Pipeline
func etlPipeline() async {
    // Extract
    let extract: (AsyncStream<URL>) -> AsyncStream<Data> = { urls in
        AsyncStream { cont in
            Task {
                for await url in urls {
                    if let (data, _) = try? await URLSession.shared.data(from: url) {
                        cont.yield(data)
                    }
                }
                cont.finish()
            }
        }
    }
    
    // Transform
    let transform: (AsyncStream<Data>) -> AsyncStream<[String: Any]> = { dataStream in
        AsyncStream { cont in
            Task {
                for await data in dataStream {
                    if let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        cont.yield(json)
                    }
                }
                cont.finish()
            }
        }
    }
    
    // Load
    let load: (AsyncStream<[String: Any]>) -> AsyncStream<Bool> = { records in
        AsyncStream { cont in
            Task {
                for await record in records {
                    let success = await saveToDatabase(record)
                    cont.yield(success)
                }
                cont.finish()
            }
        }
    }
    
    print("ETL Pipeline ready")
}

func saveToDatabase(_ record: [String: Any]) async -> Bool { return true }`,
    explanation: 'Data pipeline با AsyncStream. هر stage یک AsyncStream میگیره و یکی برمیگردونه.',
    explanationEn: 'Data pipeline with AsyncStream. Each stage takes an AsyncStream and returns one.',
    quiz: [
      {
        question: 'مزیت pipeline pattern چیه؟',
        options: ['سرعت', 'Modularity و composability', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Pipeline pattern modular و composable هست. هر stage مستقل هست.'
      }
    ]
  },
  {
    id: 96,
    title: 'پروژه: Rate Limiter',
    titleEn: 'Project: Rate Limiter',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک rate limiter با actor.',
    descriptionEn: 'Building a rate limiter with actor.',
    code: `import Foundation

// Token Bucket Rate Limiter
actor RateLimiter {
    private var tokens: Double
    private let maxTokens: Double
    private let refillRate: Double // tokens per second
    private var lastRefill: Date
    
    init(maxTokens: Double, refillRate: Double) {
        self.tokens = maxTokens
        self.maxTokens = maxTokens
        self.refillRate = refillRate
        self.lastRefill = Date()
    }
    
    func allowRequest() async -> Bool {
        refill()
        
        if tokens >= 1 {
            tokens -= 1
            return true
        }
        
        // Wait for token
        let waitTime = (1 - tokens) / refillRate
        try? await Task.sleep(for: .seconds(waitTime))
        refill()
        
        if tokens >= 1 {
            tokens -= 1
            return true
        }
        
        return false
    }
    
    private func refill() {
        let now = Date()
        let elapsed = now.timeIntervalSince(lastRefill)
        tokens = min(maxTokens, tokens + elapsed * refillRate)
        lastRefill = now
    }
}

// API Client with rate limiting
class RateLimitedAPIClient {
    private let limiter: RateLimiter
    private let baseURL: URL
    
    init(baseURL: URL, requestsPerSecond: Double = 10) {
        self.baseURL = baseURL
        self.limiter = RateLimiter(
            maxTokens: requestsPerSecond,
            refillRate: requestsPerSecond
        )
    }
    
    func request<T: Decodable>(endpoint: String) async throws -> T {
        // Wait for rate limit
        while !(await limiter.allowRequest()) {
            try await Task.sleep(for: .milliseconds(100))
        }
        
        let url = baseURL.appendingPathComponent(endpoint)
        let (data, response) = try await URLSession.shared.data(from: url)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }
        
        return try JSONDecoder().decode(T.self, from: data)
    }
}

// Usage
func rateLimitedExample() async throws {
    let client = RateLimitedAPIClient(
        baseURL: URL(string: "https://api.example.com")!,
        requestsPerSecond: 5
    )
    
    // These requests will be rate limited
    async let r1: String = client.request(endpoint: "/users")
    async let r2: String = client.request(endpoint: "/posts")
    async let r3: String = client.request(endpoint: "/comments")
    
    let _ = try await (r1, r2, r3)
}`,
    explanation: 'Token bucket algorithm با actor. Thread-safe و configurable.',
    explanationEn: 'Token bucket algorithm with actor. Thread-safe and configurable.',
    quiz: [
      {
        question: 'چرا RateLimiter یک actor هست؟',
        options: ['سرعت', 'tokens mutable و shared هست', 'مجبور', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'tokens mutable state هست و از چند task دسترسی میشه.'
      }
    ]
  },
  {
    id: 97,
    title: 'پروژه: Caching Layer',
    titleEn: 'Project: Caching Layer',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک generic caching layer با actor.',
    descriptionEn: 'Building a generic caching layer with actor.',
    code: `import Foundation

// Generic Cache Actor
actor Cache<Key: Hashable & Sendable, Value: Sendable> {
    private var storage: [Key: CacheEntry<Value>] = [:]
    private let maxSize: Int
    private let ttl: TimeInterval
    
    struct CacheEntry<V> {
        let value: V
        let createdAt: Date
        
        func isExpired(ttl: TimeInterval) -> Bool {
            return Date().timeIntervalSince(createdAt) > ttl
        }
    }
    
    init(maxSize: Int = 100, ttl: TimeInterval = 300) {
        self.maxSize = maxSize
        self.ttl = ttl
    }
    
    func get(_ key: Key) -> Value? {
        guard let entry = storage[key] else { return nil }
        
        if entry.isExpired(ttl: ttl) {
            storage.removeValue(forKey: key)
            return nil
        }
        
        return entry.value
    }
    
    func set(_ key: Key, value: Value) {
        // Evict if full
        if storage.count >= maxSize {
            evictOldest()
        }
        
        storage[key] = CacheEntry(value: value, createdAt: Date())
    }
    
    func remove(_ key: Key) {
        storage.removeValue(forKey: key)
    }
    
    func clear() {
        storage.removeAll()
    }
    
    private func evictOldest() {
        // Remove expired first
        storage = storage.filter { !$0.value.isExpired(ttl: ttl) }
        
        // If still full, remove oldest
        if storage.count >= maxSize {
            let sorted = storage.sorted {
                $0.value.createdAt < $1.value.createdAt
            }
            let toRemove = sorted.prefix(storage.count - maxSize + 1)
            for (key, _) in toRemove {
                storage.removeValue(forKey: key)
            }
        }
    }
    
    var count: Int { storage.count }
}

// Cache-aside pattern
class CachedRepository {
    private let cache = Cache<String, [String]>(maxSize: 50, ttl: 600)
    
    func fetchItems(category: String) async throws -> [String] {
        // Check cache
        if let cached = await cache.get(category) {
            return cached
        }
        
        // Fetch from source
        let items = try await fetchFromServer(category: category)
        
        // Store in cache
        await cache.set(category, value: items)
        
        return items
    }
    
    private func fetchFromServer(category: String) async throws -> [String] {
        // Network call
        return ["Item 1", "Item 2"]
    }
    
    func invalidate(category: String) async {
        await cache.remove(category)
    }
}

// Usage
func cachingExample() async throws {
    let repo = CachedRepository()
    
    // First call - fetches from server
    let items1 = try await repo.fetchItems(category: "books")
    
    // Second call - from cache
    let items2 = try await repo.fetchItems(category: "books")
    
    // Invalidate
    await repo.invalidate(category: "books")
    
    // Third call - fetches again
    let items3 = try await repo.fetchItems(category: "books")
}`,
    explanation: 'Generic cache با TTL و max size. Cache-aside pattern برای repository.',
    explanationEn: 'Generic cache with TTL and max size. Cache-aside pattern for repository.',
    quiz: [
      {
        question: 'TTL در cache یعنی چه؟',
        options: ['Total Load Limit', 'Time To Live - مدت اعتبار', 'Thread Lock', 'Transfer Limit'],
        correctIndex: 1,
        explanation: 'TTL یعنی Time To Live. بعد از این مدت، cache entry منقضی میشه.'
      }
    ]
  },
  {
    id: 98,
    title: 'پروژه: Event Bus',
    titleEn: 'Project: Event Bus',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک event bus با AsyncStream.',
    descriptionEn: 'Building an event bus with AsyncStream.',
    code: `import Foundation

// Event protocol
protocol AppEvent: Sendable {
    var id: UUID { get }
    var timestamp: Date { get }
}

// Concrete events
struct UserLoggedIn: AppEvent {
    let id = UUID()
    let timestamp = Date()
    let userId: String
}

struct DataUpdated: AppEvent {
    let id = UUID()
    let timestamp = Date()
    let entity: String
}

struct ErrorOccurred: AppEvent {
    let id = UUID()
    let timestamp = Date()
    let error: String
}

// Event Bus
actor EventBus {
    private var subscribers: [UUID: AsyncStream<AnyAppEvent>.Continuation] = [:]
    
    enum AnyAppEvent: Sendable {
        case userLoggedIn(UserLoggedIn)
        case dataUpdated(DataUpdated)
        case errorOccurred(ErrorOccurred)
    }
    
    func subscribe() -> AsyncStream<AnyAppEvent> {
        let id = UUID()
        
        return AsyncStream { continuation in
            Task {
                await self.addSubscriber(id: id, continuation: continuation)
            }
            
            continuation.onTermination = { @Sendable _ in
                Task {
                    await self.removeSubscriber(id: id)
                }
            }
        }
    }
    
    private func addSubscriber(id: UUID, continuation: AsyncStream<AnyAppEvent>.Continuation) {
        subscribers[id] = continuation
    }
    
    private func removeSubscriber(id: UUID) {
        subscribers.removeValue(forKey: id)
    }
    
    func publish(_ event: AnyAppEvent) {
        for (_, continuation) in subscribers {
            continuation.yield(event)
        }
    }
    
    // Convenience methods
    func notifyLogin(userId: String) {
        publish(.userLoggedIn(UserLoggedIn(userId: userId)))
    }
    
    func notifyDataUpdate(entity: String) {
        publish(.dataUpdated(DataUpdated(entity: entity)))
    }
    
    func notifyError(_ error: String) {
        publish(.errorOccurred(ErrorOccurred(error: error)))
    }
}

// Usage
@MainActor
class DashboardViewModel: ObservableObject {
    @Published var loginCount = 0
    @Published var lastError: String?
    
    private let eventBus: EventBus
    
    init(eventBus: EventBus) {
        self.eventBus = eventBus
    }
    
    func startListening() async {
        let stream = await eventBus.subscribe()
        
        for await event in stream {
            switch event {
            case .userLoggedIn:
                loginCount += 1
            case .errorOccurred(let e):
                lastError = e.error
            case .dataUpdated:
                await refreshData()
            }
        }
    }
    
    func refreshData() async {
        // Refresh
    }
}

// Logger subscriber
func startLogger(eventBus: EventBus) async {
    let stream = await eventBus.subscribe()
    
    for await event in stream {
        switch event {
        case .userLoggedIn(let e):
            print("[LOG] User \\(e.userId) logged in")
        case .dataUpdated(let e):
            print("[LOG] Data updated: \\(e.entity)")
        case .errorOccurred(let e):
            print("[LOG] Error: \\(e.error)")
        }
    }
}`,
    explanation: 'Event bus با AsyncStream. Multiple subscribers میتونن events رو receive کنن.',
    explanationEn: 'Event bus with AsyncStream. Multiple subscribers can receive events.',
    quiz: [
      {
        question: 'مزیت event bus چیه؟',
        options: ['سرعت', 'Decoupling بین components', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Event bus components رو decouple میکنه. نیازی به direct reference نیست.'
      }
    ]
  },
  {
    id: 99,
    title: 'پروژه: Background Sync',
    titleEn: 'Project: Background Sync',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'ساخت یک background sync manager.',
    descriptionEn: 'Building a background sync manager.',
    code: `import Foundation

// Sync State
enum SyncState: Sendable {
    case idle
    case syncing(progress: Double)
    case completed(Date)
    case failed(Error)
}

// Sync Manager
actor SyncManager {
    private var state: SyncState = .idle
    private var syncTask: Task<Void, Never>?
    private let syncInterval: TimeInterval
    private var lastSync: Date?
    
    private var stateListeners: [UUID: AsyncStream<SyncState>.Continuation] = [:]
    
    init(syncInterval: TimeInterval = 300) { // 5 minutes
        self.syncInterval = syncInterval
    }
    
    // Start periodic sync
    func startAutoSync() {
        syncTask?.cancel()
        
        syncTask = Task {
            while !Task.isCancelled {
                await performSync()
                
                try? await Task.sleep(for: .seconds(syncInterval))
            }
        }
    }
    
    // Stop sync
    func stopAutoSync() {
        syncTask?.cancel()
        syncTask = nil
    }
    
    // Manual sync
    func performSync() async {
        await updateState(.syncing(progress: 0))
        
        do {
            // Step 1: Upload local changes
            await updateState(.syncing(progress: 0.25))
            try await uploadChanges()
            
            // Step 2: Download remote changes
            await updateState(.syncing(progress: 0.5))
            try await downloadChanges()
            
            // Step 3: Resolve conflicts
            await updateState(.syncing(progress: 0.75))
            try await resolveConflicts()
            
            // Step 4: Update local database
            await updateState(.syncing(progress: 1.0))
            try await updateLocalDB()
            
            lastSync = Date()
            await updateState(.completed(Date()))
        } catch is CancellationError {
            await updateState(.idle)
        } catch {
            await updateState(.failed(error))
        }
    }
    
    // State observation
    func observeState() -> AsyncStream<SyncState> {
        AsyncStream { continuation in
            let id = UUID()
            Task {
                await self.addListener(id: id, continuation: continuation)
                // Send current state
                continuation.yield(await self.getState())
            }
            
            continuation.onTermination = { @Sendable _ in
                Task {
                    await self.removeListener(id: id)
                }
            }
        }
    }
    
    private func addListener(id: UUID, continuation: AsyncStream<SyncState>.Continuation) {
        stateListeners[id] = continuation
    }
    
    private func removeListener(id: UUID) {
        stateListeners.removeValue(forKey: id)
    }
    
    private func updateState(_ newState: SyncState) {
        state = newState
        for (_, listener) in stateListeners {
            listener.yield(newState)
        }
    }
    
    func getState() -> SyncState {
        return state
    }
    
    // Sync operations
    private func uploadChanges() async throws {
        try? await Task.sleep(for: .seconds(1))
    }
    
    private func downloadChanges() async throws {
        try? await Task.sleep(for: .seconds(1))
    }
    
    private func resolveConflicts() async throws {
        try? await Task.sleep(for: .milliseconds(500))
    }
    
    private func updateLocalDB() async throws {
        try? await Task.sleep(for: .milliseconds(500))
    }
}

// Usage
func syncExample() async {
    let manager = SyncManager(syncInterval: 60)
    
    // Observe state
    Task {
        let stream = await manager.observeState()
        for await state in stream {
            switch state {
            case .idle:
                print("Idle")
            case .syncing(let progress):
                print("Syncing: \\(Int(progress * 100))%")
            case .completed(let date):
                print("Completed at \\(date)")
            case .failed(let error):
                print("Failed: \\(error)")
            }
        }
    }
    
    // Start auto sync
    await manager.startAutoSync()
    
    // Or manual sync
    await manager.performSync()
}`,
    explanation: 'Sync manager با state observation و auto sync. Actor برای thread safety.',
    explanationEn: 'Sync manager with state observation and auto sync. Actor for thread safety.',
    quiz: [
      {
        question: 'چرا syncTask رو cancel میکنیم قبل از start جدید؟',
        options: ['سرعت', 'جلوگیری از duplicate tasks', 'مجبور', 'فرقی نداره'],
        correctIndex: 1,
        explanation: 'Cancel قبلی جلوگیری میکنه از اجرای همزمان چند sync.'
      }
    ]
  },
  {
    id: 100,
    title: 'جمع‌بندی و مسیر یادگیری',
    titleEn: 'Summary & Learning Path',
    category: 'realworld',
    categoryEn: 'Real-world Projects',
    description: 'جمع‌بندی کل دوره و مسیر ادامه یادگیری.',
    descriptionEn: 'Course summary and continued learning path.',
    code: `import Foundation

// === خلاصه Modern Concurrency in Swift ===

// 1. async/await
// - توابع async میتونن suspend بشن
// - await نقطه suspension هست
// - کد خطی و خواناتر

// 2. Structured Concurrency
// - TaskGroup برای parallel work
// - Cancellation propagation
// - Error handling

// 3. Actors
// - محافظت از mutable state
// - @MainActor برای UI
// - Reentrancy awareness

// 4. Sendable
// - Thread-safe data transfer
// - @Sendable closures
// - Swift 6 strict checking

// 5. AsyncSequence
// - AsyncStream
// - for await
// - AsyncAlgorithms

// === مسیر یادگیری ===

// سطح مبتدی:
// ✅ async/await basics
// ✅ Task و async let
// ✅ MainActor

// سطح متوسط:
// ✅ TaskGroup
// ✅ Actors
// ✅ Sendable
// ✅ AsyncStream

// سطح پیشرفته:
// ✅ Custom Executors
// ✅ Distributed Actors
// ✅ Swift 6 Strict Concurrency
// ✅ Performance optimization

// منابع:
// - Swift.org concurrency documentation
// - WWDC sessions on concurrency
// - Swift Evolution proposals
// - "100 Days of SwiftUI" by Paul Hudson
// - Swift Forums

// تمرین:
// 1. یک اپ بسازید با async/await
// 2. Actor برای state management
// 3. AsyncStream برای real-time data
// 4. تست‌های async بنویسید
// 5. کد GCD رو migrate کنید

print("🎉 تبریک! شما Modern Concurrency in Swift رو یاد گرفتید!")
print("حالا وقت عمل هست. پروژه بسازید!")`,
    explanation: 'تبریک! شما تمام 100 درس رو تموم کردید. حالا وقت عمل و ساختن پروژه هست!',
    explanationEn: 'Congratulations! You completed all 100 lessons. Now it\'s time to practice and build projects!',
    quiz: [
      {
        question: 'کدوم مفهوم برای محافظت از mutable state هست؟',
        options: ['async/await', 'TaskGroup', 'Actor', 'Sendable'],
        correctIndex: 2,
        explanation: 'Actor ها از mutable state در برابر data races محافظت میکنن.'
      },
      {
        question: 'Swift 6 چه تضمینی میده؟',
        options: ['سرعت بیشتر', 'No data races اگه compile بشه', 'حافظه کمتر', 'کد کمتر'],
        correctIndex: 1,
        explanation: 'Swift 6 تضمین میکنه اگه کد compile بشه، data race نداره.'
      },
      {
        question: 'بهترین راه یادگیری چیه؟',
        options: ['فقط خوندن', 'ساختن پروژه', 'فقط ویدیو', 'حفظ کردن'],
        correctIndex: 1,
        explanation: 'ساختن پروژه بهترین راه یادگیری هست. تئوری رو عملی کنید!'
      }
    ]
  }
];
