import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { categories } from '../data/categories'
import type { ChangeEvent, Dispatch, FormEvent } from 'react'
import type { Activity } from '../types'
import type { ActivityActions, ActivityState } from '../reducers/activity-reducer'

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 0,
    name: '',
    calories: 0
}

export const Form = ({ dispatch, state }: FormProps) => {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id == state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? Math.max(0, Number(e.target.value) || 0) : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories, category } = activity
        return name.trim() !== '' && calories > 0 && category > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form className="bg-surface border border-border rounded-2xl p-8 space-y-6 transition-all duration-300" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 bg-accent rounded-full" />
                <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Register Activity
                </h2>
            </div>

            <div className="space-y-2">
                <label htmlFor="category" className="font-body text-xs font-medium uppercase tracking-wider text-muted">
                    Category
                </label>
                <div className="relative">
                    <select
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                        className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-primary font-body text-sm outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 cursor-pointer appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '16px'
                        }}
                    >
                        <option value={0} disabled className="bg-dark">Select category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id} className="bg-dark">
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="font-body text-xs font-medium uppercase tracking-wider text-muted">
                    Activity
                </label>
                <input
                    id="name"
                    type="text"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="e.g., Orange juice, Running, Salad..."
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-primary font-body text-sm placeholder-muted outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="calories" className="font-body text-xs font-medium uppercase tracking-wider text-muted">
                    Calories
                </label>
                <input
                    id="calories"
                    type="number"
                    min="0"
                    value={activity.calories || ''}
                    onChange={handleChange}
                    placeholder="e.g., 250"
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-primary font-body text-sm placeholder-muted outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                />
            </div>

            <input
                type="submit"
                value={activity.category === 1 ? "Save Food Entry" : "Save Exercise Entry"}
                disabled={!isValidActivity()}
                className="w-full bg-btn text-dark font-display text-lg tracking-wider py-4 rounded-xl cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:scale-[0.98] transition-all duration-300 uppercase"
            />
        </form>
    )
}
