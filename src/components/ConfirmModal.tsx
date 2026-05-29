import { useEffect } from "react"

type ConfirmModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
        }
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div
                className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full animate-modal-in shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <h3
                    id="modal-title"
                    className="font-display text-2xl tracking-wide text-primary uppercase mb-2"
                >
                    {title}
                </h3>
                <p className="font-body text-sm text-muted mb-8 leading-relaxed">
                    {message}
                </p>
                <div className="flex items-center gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-body text-sm font-medium text-muted border border-border hover:border-accent/50 hover:text-primary transition-all duration-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 rounded-xl font-body text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:scale-[0.97] transition-all duration-300 cursor-pointer"
                    >
                        Delete All
                    </button>
                </div>
            </div>
        </div>
    )
}
