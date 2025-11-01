import { CodeSuggestion as CodeSuggestionType } from "@/types/ai"
import { useState } from "react"
import { FiCheck, FiX, FiChevronDown, FiChevronUp, FiPlay } from "react-icons/fi"

interface CodeSuggestionProps {
    suggestion: CodeSuggestionType
    onAccept: (suggestionId: string) => void
    onReject: (suggestionId: string) => void
}

function CodeSuggestion({
    suggestion,
    onAccept,
    onReject,
}: CodeSuggestionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (suggestion.status !== "pending") {
        return null
    }

    return (
        <div className="my-3 rounded-md border-2 border-primary bg-dark p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary">
                        💡 Code Suggestion
                    </span>
                    <span className="text-xs text-gray-400">
                        for {suggestion.fileName}
                    </span>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-white"
                >
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </button>
            </div>

            <p className="mb-3 text-sm text-gray-300">{suggestion.explanation}</p>

            <div className="mb-3 rounded-md bg-green-900/20 border border-green-700 p-2 text-xs text-green-300">
                <div className="flex items-center gap-2 mb-1">
                    <FiPlay className="text-green-400" />
                    <span className="font-semibold">Compiler Ready</span>
                </div>
                <p className="text-green-200">
                    This code is executable and ready to run in the code compiler!
                </p>
            </div>

            {isExpanded && (
                <div className="mb-3 space-y-2">
                    <div className="rounded bg-darkHover p-2 border border-red-900/50">
                        <p className="mb-1 text-xs font-semibold text-red-400">
                            ❌ Original Code:
                        </p>
                        <pre className="max-h-32 overflow-auto text-xs">
                            <code>{suggestion.originalCode || "(empty)"}</code>
                        </pre>
                    </div>
                    <div className="rounded bg-darkHover p-2 border border-green-900/50">
                        <p className="mb-1 text-xs font-semibold text-green-400">
                            ✅ Suggested Code:
                        </p>
                        <pre className="max-h-32 overflow-auto text-xs">
                            <code>{suggestion.suggestedCode}</code>
                        </pre>
                    </div>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={() => onAccept(suggestion.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    title="Accept and apply to file (code will be ready to run)"
                >
                    <FiCheck /> Accept & Apply
                </button>
                <button
                    onClick={() => onReject(suggestion.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    title="Reject and remove suggestion"
                >
                    <FiX /> Reject
                </button>
            </div>
        </div>
    )
}

export default CodeSuggestion
