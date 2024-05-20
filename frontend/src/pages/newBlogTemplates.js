const contentTemplate = `<div class="col">
<h1>SwiftUI Tutorial: Adding a Background to a View</h1>
<p>In SwiftUI, you can add a background to a view using the <code>background()</code> modifier. This is a versatile tool that can significantly enhance the visual appeal of your user interface. Let's explore how to add and customize backgrounds in SwiftUI.</p>

<h2>Step 1: Create a Basic View</h2>
<p>First, let's start by creating a basic SwiftUI view. This will serve as our foundation. We will build upon this by adding a background in subsequent steps:</p>
<div class="code-block">
    <pre>import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
}
}</pre>
</div>
<p>In this initial setup, we simply display a text view with the message "Hello, SwiftUI!".</p>

<h2>Step 2: Add a Background</h2>
<p>Next, use the <code>background()</code> modifier to add a background to the view. You can use a color, image, or another view as the background. Let's start with a color background:</p>
<div class="code-block">
    <pre>import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
        .background(Color.blue) // Example with color
}
}</pre>
</div>
<p>In this example, we add a blue background color to the text view.</p>
<p>You can also use an image as the background. For this, ensure you have an image named "background" in your asset catalog:</p>
<div class="code-block">
    <pre>import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
        .background(Image("background")) // Example with image
}
}</pre>
</div>
<p>Here, we add an image as the background of the text view.</p>

<h2>Step 3: Customize the Background</h2>
<p>Now, let's customize the background further by applying additional modifiers. We can add a corner radius and padding to the text view:</p>
<div class="code-block">
    <pre><code class="language-swift">import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
        .background(Color.blue)
        .cornerRadius(10) // Adding corner radius
        .padding() // Adding padding
}
}
    </code></pre>
</div>
<p>In this example, we add a corner radius of 10 points and some padding around the text view.</p>

<h2>Step 4: Combining Multiple Modifiers</h2>
<p>SwiftUI allows you to combine multiple background modifiers to create layered effects. For instance, you can use both color and image backgrounds together:</p>
<div class="code-block">
    <pre><code class="language-swift">import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
        .background(Color.blue) // Base color background
        .background(Image("background")) // Layered image background
        .cornerRadius(10)
        .padding()
}
}
    </code></pre>
</div>
<p>In this example, we first add a blue color as the base background and then layer an image on top of it.</p>

<h2>Step 5: Using Shape Backgrounds</h2>
<p>Besides colors and images, you can also use shapes as backgrounds. This can be particularly useful for creating custom button designs or other UI components:</p>
<div class="code-block">
    <pre><code class="language-swift">import SwiftUI

struct ContentView: View {
var body: some View {
    Text("Hello, SwiftUI!")
        .padding()
        .background(Circle().fill(Color.blue)) // Circle shape background
        .padding()
}
}
    </code></pre>
</div>
<p>In this example, we use a circular shape with a blue fill as the background for the text view.</p>

<h2>Step 6: Applying Backgrounds to Complex Views</h2>
<p>Backgrounds can be applied to more complex views as well. For instance, let's create a VStack with multiple text views and apply a background to it:</p>
<div class="code-block">
    <pre><code class="language-swift">import SwiftUI

struct ContentView: View {
var body: some View {
    VStack {
        Text("Welcome to SwiftUI!")
        Text("Let's add some backgrounds.")
    }
    .padding()
    .background(Color.green) // Background for the VStack
    .cornerRadius(15)
}
}
    </code></pre>
</div>
<p>Here, we create a VStack containing two text views and apply a green background with a corner radius to the entire stack.</p>

<h2>Step 7: Backgrounds with Conditional Logic</h2>
<p>Sometimes, you may want to change the background based on certain conditions. SwiftUI makes this easy with the ternary operator:</p>
<div class="code-block">
    <pre><code class="language-swift">import SwiftUI

struct ContentView: View {
@State private var isHighlighted = false

var body: some View {
    Text("Tap to Highlight")
        .padding()
        .background(isHighlighted ? Color.yellow : Color.gray)
        .cornerRadius(10)
        .onTapGesture {
            isHighlighted.toggle()
        }
}
}
    </code></pre>
</div>
<p>In this example, the background color toggles between yellow and gray when the text view is tapped.</p>

<p>With these steps, you've learned how to add and customize backgrounds in SwiftUI using various modifiers and techniques. Feel free to experiment with different backgrounds and modifiers to create unique and visually appealing user interfaces!</p>
</div>`

const stylesTemplate = `/* General Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2, h3, h4, h5, h6 {
    color: #2c3e50;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

p {
    color: #4a4a4a;
    margin-bottom: 1rem;
}

a {
    color: #3498db;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Title Background Styles */
.title-background {
    background-color: #3498db;
    padding: 2rem;
    border-radius: 8px 8px 0 0;
    color: white;
    text-align: center;
    margin: -2rem -2rem 2rem -2rem;
}

.title-container h1 {
    margin: 0;
    font-size: 2rem;
}

.title-container h5 {
    margin: 0.5rem 0 0;
    font-size: 1.2rem;
    font-style: italic;
    color: #ecf0f1;
}

/* Code Block Styles */
.code-block {
    background-color: #f8f9fa;
    border-radius: 4px;
    overflow-x: auto;
}

pre {
    margin: 0;
}

/* Section Heading Styles */
h2 {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

/* Step Number Styles */
.step-number {
    background-color: #3498db;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    display: inline-block;
    font-weight: bold;
}

.step {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.step h2 {
    margin: 0;
    font-size: 1.5rem;
    flex: 1;
}`

export { stylesTemplate, contentTemplate }