const contentTemplate = `<div class="col">
    <h1>SwiftUI Tutorial: Adding a Background to a View</h1>
    <div class="profile-container">
        <img class="profile-picture" src="https://firebasestorage.googleapis.com/v0/b/onlinestore-4abc5.appspot.com/o/images%2Fimage0%20(2).jpeg?alt=media&token=f55f33db-c512-45d5-9831-78db0736991b" alt="Profile Picture">
        <p>Luke Thompson</p>
    </div>
    <p>In SwiftUI, adding a background to a view is simple and versatile using the <code>background()</code> modifier. This can significantly enhance your UI’s visual appeal. Let's explore how to add and customize backgrounds in SwiftUI.</p>

    <h2>Step 1: Create a Basic View</h2>
    <p>We’ll start with a basic SwiftUI view as our foundation:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
    }
}
        </pre>
    </div>
    <p>This initial setup displays a text view with the message "Hello, SwiftUI!".</p>

    <h2>Step 2: Add a Background</h2>
    <p>Use the <code>background()</code> modifier to add a background. You can use a color, image, or another view:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .background(Color.blue) // Example with color
    }
}
        </pre>
    </div>
    <p>In this example, we add a blue background color to the text view.</p>
    <p>You can also use an image as the background:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .background(Image("background")) // Example with image
    }
}
        </pre>
    </div>
    <p>Here, we add an image as the background of the text view.</p>

    <h2>Step 3: Customize the Background</h2>
    <p>Customize the background further by applying additional modifiers like <code>cornerRadius</code> and <code>padding</code>:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .background(Color.blue)
            .cornerRadius(10) // Adding corner radius
            .padding() // Adding padding
    }
}
       </pre>
    </div>
    <p>This example adds a corner radius of 10 points and padding around the text view.</p>

    <h2>Step 4: Combining Multiple Modifiers</h2>
    <p>SwiftUI allows combining multiple background modifiers for layered effects:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .background(Color.blue) // Base color background
            .background(Image("background")) // Layered image background
            .cornerRadius(10)
            .padding()
    }
}
       </pre>
    </div>
    <p>In this example, we first add a blue color as the base background and then layer an image on top of it.</p>

    <h2>Step 5: Using Shape Backgrounds</h2>
    <p>Besides colors and images, you can also use shapes as backgrounds. This can be particularly useful for creating custom button designs or other UI components:</p>
    <div class="code-block">
        <pre>import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .padding()
            .background(Circle().fill(Color.blue)) // Circle shape background
            .padding()
    }
}
        </pre>
    </div>
    <p>In this example, we use a circular shape with a blue fill as the background for the text view.</p>

    <h2>Step 6: Applying Backgrounds to Complex Views</h2>
    <p>Backgrounds can be applied to more complex views as well. For instance, let's create a VStack with multiple text views and apply a background to it:</p>
    <div class="code-block">
        <pre>import SwiftUI

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
        </pre>
    </div>
    <p>Here, we create a VStack containing two text views and apply a green background with a corner radius to the entire stack.</p>

    <h2>Step 7: Backgrounds with Conditional Logic</h2>
    <p>Sometimes, you may want to change the background based on certain conditions. SwiftUI makes this easy with the ternary operator:</p>
    <div class="code-block">
        <pre>import SwiftUI

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
        </pre>
    </div>
    <p>In this example, the background color toggles between yellow and gray when the text view is tapped.</p>

    <p>With these steps, you've learned how to add and customize backgrounds in SwiftUI using various modifiers and techniques. Feel free to experiment with different backgrounds and modifiers to create unique and visually appealing user interfaces!</p>
</div>`

const stylesTemplate = `/* General Styles */
body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background: #f9f9f9;
    color: #333;
}

.article {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #111;
}

h2 {
    font-size: 1.75rem;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #111;
}

p {
    margin-bottom: 20px;
    font-size: 1.125rem;
    color: #555;
}

code {
    background: #f4f4f4;
    padding: 2px 4px;
    border-radius: 4px;
}

/* Profile Container */
.profile-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.profile-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.author-name {
    font-size: 1.125rem;
    font-weight: bold;
    color: #333;
}

/* Code Block */
.code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 20px;
}

.code-block pre {
    margin: 0;
}

.code-block code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
}

/* Specific Elements */
h2 {
    border-bottom: 2px solid #e9e9e9;
    padding-bottom: 5px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .article {
        margin: 20px;
        padding: 15px;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    p, .author-name {
        font-size: 1rem;
    }
}
`

export { stylesTemplate, contentTemplate }