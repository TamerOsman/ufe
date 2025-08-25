
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BOT_NAME = "UFE";

const initialMessages = [
    { sender: BOT_NAME, text: "Hi, I'm UFE! Ask me anything." },
];

export default function HomePage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((msgs) => [
            ...msgs,
            { sender: "You", text: input },
            { sender: BOT_NAME, text: getBotReply(input) },
        ]);
        setInput("");
    };

    const getBotReply = (userInput: string) => {
        // Placeholder: echo user's message. Replace with AI logic later.
        return `You said: ${userInput}`;
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center">
            <Card className="w-full max-w-xl h-[60vh] flex flex-col justify-between shadow-lg">
                <CardContent className="overflow-y-auto flex-1 space-y-2">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg px-4 py-3 text-sm max-w-[80%] ${
                                msg.sender === "You"
                                    ? "bg-primary text-white ml-auto"
                                    : "bg-muted text-foreground mr-auto"
                            }`}
                        >
                            <span className="font-bold mr-2">{msg.sender}:</span> {msg.text}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </CardContent>
                <div className="p-4 border-t flex gap-2 bg-background">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} type="button">
                        Send
                    </Button>
                </div>
            </Card>
        </main>
    );
}
