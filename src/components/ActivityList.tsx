import { type Dispatch } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import type { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    const getCategoryName = (category: Activity['category']) =>
        categories.find(cat => cat.id === category)?.name ?? ''

    const isEmptyActivities = activities.length === 0

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-exercise rounded-full" />
                <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-exercise">
                    Activity Log
                </h2>
            </div>

            {isEmptyActivities ? (
                <div className="bg-surface border border-border rounded-2xl p-12 text-center">
                    <p className="font-body text-sm text-muted">No activities recorded yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map(activity => (
                        <div
                            key={activity.id}
                            className="group bg-surface border border-border rounded-2xl p-5 flex items-center justify-between hover:border-accent/20 hover:bg-surface-2 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className={`w-1 shrink-0 h-12 rounded-full ${activity.category === 1 ? 'bg-food' : 'bg-exercise'}`} />
                                <div className="space-y-1 min-w-0">
                                    <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-widest ${activity.category === 1 ? 'text-food' : 'text-exercise'}`}>
                                        {getCategoryName(Number(activity.category))}
                                    </span>
                                    <p className="font-body text-base text-primary font-medium leading-tight truncate">
                                        {activity.name}
                                    </p>
                                    <p className="font-display text-xl tracking-wide text-primary">
                                        {activity.calories}{' '}
                                        <span className="font-body text-xs font-normal text-muted uppercase tracking-wider">cal</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                                    className="p-2 rounded-lg hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
                                    title="Edit"
                                >
                                    <PencilSquareIcon className="h-5 w-5 text-muted hover:text-primary transition-colors duration-200" />
                                </button>
                                <button
                                    onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                                    className="p-2 rounded-lg hover:bg-surface-2 transition-colors duration-200 cursor-pointer"
                                    title="Delete"
                                >
                                    <XCircleIcon className="h-5 w-5 text-muted hover:text-red-400 transition-colors duration-200" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
