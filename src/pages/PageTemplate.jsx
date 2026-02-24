const pageNames = [
    'AQI', 'Weather', 'Predictions', 'Alerts', 'Trends',
    'Health', 'Awareness', 'CarbonFootprint', 'Feedback', 'Reports', 'About'
]

// Note: I'll create them one by one or in a loop if I could, 
// but since I'm in EXECUTION mode I'll just provide a template for one and then build properly.
// For now, I'll create individual files to satisfy the imports in App.jsx.

export default function GenericPage({ name }) {
    return (
        <div>
            <h1>{name} Page</h1>
            <p>Content for {name} is coming soon...</p>
        </div>
    )
}
