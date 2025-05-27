"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Terminal, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CodeExecutor } from "@/components/code-executor"

interface CodeExample {
  id: string
  title: string
  language: string
  description: string
  code: string
  color: string
}

const codeExamples: CodeExample[] = [
  {
    id: "javascript",
    title: "Basic Operations",
    language: "JavaScript",
    description: "Simple number addition and greeting message",
    code: `// JavaScript - Adding Numbers and Greeting
function addNumbers(a, b) {
  return a + b;
}

function greetUser(name = "User") {
  return \`Hello, \${name}!\`;
}

// Demonstrate the functions
const num1 = 15;
const num2 = 25;
const sum = addNumbers(num1, num2);

console.log(\`Adding \${num1} + \${num2} = \${sum}\`);
console.log(greetUser());
console.log(greetUser("Alex"));

// Additional example
const result = addNumbers(100, 200);
console.log(\`100 + 200 = \${result}\`);`,
    color: "#F7DF1E",
  },
  {
    id: "python",
    title: "Basic Operations",
    language: "Python",
    description: "Simple number addition and greeting message",
    code: `# Python - Adding Numbers and Greeting
def add_numbers(a, b):
    """Add two numbers and return the result"""
    return a + b

def greet_user(name="User"):
    """Greet a user with a personalized message"""
    return f"Hello, {name}!"

# Demonstrate the functions
num1 = 15
num2 = 25
sum_result = add_numbers(num1, num2)

print(f"Adding {num1} + {num2} = {sum_result}")
print(greet_user())
print(greet_user("Alex"))

# Additional examples
result = add_numbers(100, 200)
print(f"100 + 200 = {result}")

# Using different data types
float_result = add_numbers(3.14, 2.86)
print(f"3.14 + 2.86 = {float_result}")`,
    color: "#3776AB",
  },
  {
    id: "cpp",
    title: "Basic Operations",
    language: "C++",
    description: "Simple number addition and greeting message",
    code: `// C++ - Adding Numbers and Greeting
#include <iostream>
#include <string>

// Function to add two numbers
int addNumbers(int a, int b) {
    return a + b;
}

// Function to greet user
std::string greetUser(const std::string& name = "User") {
    return "Hello, " + name + "!";
}

int main() {
    // Demonstrate the functions
    int num1 = 15;
    int num2 = 25;
    int sum = addNumbers(num1, num2);
    
    std::cout << "Adding " << num1 << " + " << num2 << " = " << sum << std::endl;
    std::cout << greetUser() << std::endl;
    std::cout << greetUser("Alex") << std::endl;
    
    // Additional examples
    int result = addNumbers(100, 200);
    std::cout << "100 + 200 = " << result << std::endl;
    
    // Using different numbers
    int largeSum = addNumbers(1000, 2000);
    std::cout << "1000 + 2000 = " << largeSum << std::endl;
    
    return 0;
}`,
    color: "#00599C",
  },
]

export function InteractiveDemo() {
  const [activeExample, setActiveExample] = useState(codeExamples[0])
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full mb-6">
            <Code className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Live Code Playground
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interact with real code examples. Edit, run, and see the results instantly in a safe execution environment.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Language Selector */}
            <div
              className={`lg:col-span-3 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <Card className="bg-gradient-to-br from-background to-background/50 border-orange-500/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-orange-500" />
                    Examples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {codeExamples.map((example) => (
                    <Button
                      key={example.id}
                      variant={activeExample.id === example.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto p-4 ${
                        activeExample.id === example.id
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                          : "hover:bg-orange-500/10"
                      }`}
                      onClick={() => {
                        setActiveExample(example)
                      }}
                    >
                      <div>
                        <div className="font-semibold">{example.title}</div>
                        <div className="text-xs opacity-80">{example.language}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Live Code Executor */}
            <div
              className={`lg:col-span-9 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <CodeExecutor
                key={activeExample.id}
                language={activeExample.language}
                initialCode={activeExample.code}
                title={activeExample.title}
                description={activeExample.description}
                color={activeExample.color}
              />
            </div>
          </div>

          {/* Features Showcase */}
          <div
            className={`grid sm:grid-cols-3 gap-6 mt-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="bg-gradient-to-br from-background to-orange-500/5 border-orange-500/20 text-center p-6">
              <Code className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Execution</h3>
              <p className="text-sm text-muted-foreground">Run code safely in an isolated environment</p>
            </Card>
            <Card className="bg-gradient-to-br from-background to-orange-500/5 border-orange-500/20 text-center p-6">
              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">See output immediately with real-time feedback</p>
            </Card>
            <Card className="bg-gradient-to-br from-background to-orange-500/5 border-orange-500/20 text-center p-6">
              <Terminal className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">Modify code and experiment with different approaches</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
