import { useReducer, useEffect, useState, useCallback } from "react"
import { Form } from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import { ActivityList } from "./components/ActivityList"
import { CalorieTracker } from "./components/CalorieTracker"
import { ConfirmModal } from "./components/ConfirmModal"

export const App = () => {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' ? 'dark' : 'light'
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const canDeleteAll = () => state.activities.length > 0

  const handleDeleteAll = useCallback(() => {
    dispatch({ type: 'delete-all' })
    setShowDeleteModal(false)
  }, [dispatch])

  return (
    <div className="relative min-h-screen">
      <header className="border-b border-border transition-[border-color] duration-300">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="font-display text-2xl tracking-widest text-primary uppercase">
            Calorie Tracker
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-accent border border-border hover:border-accent/50 rounded-lg transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              disabled={!canDeleteAll()}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete All
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Form dispatch={dispatch} state={state} />
        </section>

        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CalorieTracker activities={state.activities} />
        </section>

        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
      </main>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAll}
        title="Delete All"
        message="Are you sure you want to delete all recorded activities? This action cannot be undone."
      />
    </div>
  )
}
