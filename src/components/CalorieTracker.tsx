import type { Activity } from "../types"
import { CalorieDisplay } from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

    const totalCaloriesConsumed = activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)
    const totalCaloriesBurned = activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)
    const netCalories = totalCaloriesConsumed - totalCaloriesBurned

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-net rounded-full" />
                <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-net">
                    Summary
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CalorieDisplay calories={totalCaloriesConsumed} text="Consumed" color="food" />
                <CalorieDisplay calories={totalCaloriesBurned} text="Burned" color="exercise" />
                <CalorieDisplay calories={netCalories} text="Net" color="net" />
            </div>
        </div>
    )
}
