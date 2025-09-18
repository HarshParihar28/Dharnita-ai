
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getFinancialAdvice } from '../../services/geminiService';
import { useSpeech } from '../../hooks/useSpeech';
import Button from '../ui/Button';
import { Send, Mic, Bot, User, Volume2, Loader2 } from 'lucide-react';
import type { ChatMessage } from '../../types';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const renderContent = () => {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-sm rounded px-1 py-0.5">$1</code>')
            .replace(/(\r\n|\n|\r)/gm, "<br/>");
    };

    return <p dangerouslySetInnerHTML={{ __html: renderContent() }} />;
};

const ChatPage: React.FC = () => {
    const context = useAppContext();
    const { isListening, transcript, startListening, stopListening, speak, setTranscript, isApiSupported } = useSpeech();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript]);
    
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleAction = (action: string, payload: any) => {
        if (action === 'addTransaction') {
            context.addTransaction({
                description: payload.description,
                amount: payload.amount,
                category: payload.category || 'Other',
                accountId: context.accounts[0].id,
            });
        } else if (action === 'addGoal') {
            context.addGoal({
                name: payload.name,
                targetAmount: payload.targetAmount,
                deadline: payload.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });
        } else if (action === 'addTodo') {
            context.addTodo(payload.task);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: `msg_${Date.now()}`, role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setTranscript('');
        setIsLoading(true);

        const aiResponseText = await getFinancialAdvice(input, {
            accounts: context.accounts,
            transactions: context.transactions,
            goals: context.goals,
            investments: context.investments,
            todos: context.todos,
        });
        
        try {
            const cleanedResponse = aiResponseText.replace(/```json\n?|\n?```/g, "").trim();
            const jsonResponse = JSON.parse(cleanedResponse);
            if (jsonResponse.action && jsonResponse.payload) {
                handleAction(jsonResponse.action, jsonResponse.payload);
                const confirmationText = `I've successfully completed the action: ${jsonResponse.action}.`;
                 const assistantMessage: ChatMessage = { id: `msg_${Date.now() + 1}`, role: 'assistant', text: confirmationText };
                setMessages(prev => [...prev, assistantMessage]);
                speak(confirmationText);
            } else {
                 throw new Error("Not an action object");
            }
        } catch (error) {
            const assistantMessage: ChatMessage = { id: `msg_${Date.now() + 1}`, role: 'assistant', text: aiResponseText };
            setMessages(prev => [...prev, assistantMessage]);
            speak(aiResponseText);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
            <h2 className="text-3xl font-bold text-white mb-6">AI Assistant</h2>
            
            <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-6 mb-6 space-y-6">
                 {messages.length === 0 && (
                    <div className="text-center text-gray-400">
                        <Bot size={48} className="mx-auto mb-4"/>
                        <p>Ask me anything about your finances!</p>
                        <p className="text-sm">e.g., "How much did I spend on groceries this month?" or "Add 'review insurance' to my to-do list"</p>
                    </div>
                 )}
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center"><Bot size={20} className="text-white"/></div>}
                        <div className={`max-w-xl p-4 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'}`}>
                           <MarkdownRenderer content={msg.text}/>
                           {msg.role === 'assistant' && (
                                <button onClick={() => speak(msg.text)} className="mt-2 text-gray-400 hover:text-white">
                                    <Volume2 size={16} />
                                </button>
                           )}
                        </div>
                        {msg.role === 'user' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"><User size={20} className="text-white"/></div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-4">
                         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center"><Bot size={20} className="text-white"/></div>
                         <div className="max-w-xl p-4 rounded-lg bg-gray-700 text-gray-200 flex items-center">
                            <Loader2 className="animate-spin mr-2"/> Thinking...
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask your financial assistant..."}
                    className="flex-grow bg-gray-700 border-none rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                />
                {isApiSupported && (
                    <Button type="button" variant="ghost" onClick={isListening ? stopListening : startListening} disabled={isLoading}>
                       <Mic className={isListening ? 'text-danger animate-pulse' : 'text-gray-400'}/>
                    </Button>
                )}
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send size={18}/>
                </Button>
            </form>
        </div>
    );
};

export default ChatPage;
