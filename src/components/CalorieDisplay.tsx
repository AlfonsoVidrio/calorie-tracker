type CalorieDisplayProps = {
    calories: number
    text: string
    color?: 'food' | 'exercise' | 'net'
}

export const CalorieDisplay = ({ calories, text, color = 'food' }: CalorieDisplayProps) => {
    const colorClasses: Record<string, string> = {
        food: 'text-food',
        exercise: 'text-exercise',
        net: 'text-net'
    }

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 text-center space-y-3 hover:border-accent/20 transition-all duration-300">
            <span className={`block font-display text-6xl md:text-7xl leading-none tracking-wide ${colorClasses[color]}`}>
                {calories}
            </span>
            <span className="block font-body text-xs uppercase tracking-[0.2em] text-muted">
                {text}
            </span>
        </div>
    )
}
