
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isArabic: boolean;
}

const ChatBot = ({ isArabic }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat opens
      const welcomeMessage: Message = {
        id: '1',
        text: isArabic 
          ? 'مرحباً! أنا مساعدك الذكي في نظام كاش إي آر بي. كيف يمكنني مساعدتك اليوم؟'
          : 'Hello! I\'m your Cash ERP AI assistant. How can I help you today?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isArabic]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue, isArabic);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string, isArabic: boolean): string => {
    const input = userInput.toLowerCase();
    
    // Simple keyword-based responses (in a real app, this would be connected to an AI API)
    if (input.includes('invoice') || input.includes('فاتورة')) {
      return isArabic 
        ? 'لإنشاء فاتورة جديدة، انقر على "فاتورة جديدة" في قسم الإجراءات السريعة، أو اذهب إلى وحدة المبيعات.'
        : 'To create a new invoice, click "New Invoice" in the Quick Actions section, or go to the Sales module.';
    }
    
    if (input.includes('vat') || input.includes('ضريبة')) {
      return isArabic
        ? 'نظام كاش إي آر بي متوافق بالكامل مع ضريبة القيمة المضافة السعودية. يمكنك مراجعة حالة الامتثال في الشريط الجانبي.'
        : 'Cash ERP is fully compliant with Saudi VAT regulations. You can check your compliance status in the sidebar.';
    }
    
    if (input.includes('report') || input.includes('تقرير')) {
      return isArabic
        ? 'يمكنك إنشاء التقارير المالية من قسم الإجراءات السريعة أو وحدة التقارير. التقارير متوفرة باللغة العربية والإنجليزية.'
        : 'You can generate financial reports from Quick Actions or the Reports module. Reports are available in both Arabic and English.';
    }
    
    if (input.includes('help') || input.includes('مساعدة')) {
      return isArabic
        ? 'أنا هنا لمساعدتك! يمكنني مساعدتك في الفواتير، التقارير، ضريبة القيمة المضافة، إدارة المخزون، والمزيد. ما الذي تحتاج مساعدة فيه؟'
        : 'I\'m here to help! I can assist with invoicing, reports, VAT, inventory management, and more. What do you need help with?';
    }
    
    return isArabic
      ? 'شكراً لسؤالك. يمكنني مساعدتك في استخدام نظام كاش إي آر بي. حاول أن تسأل عن الفواتير، التقارير، أو أي وظيفة أخرى في النظام.'
      : 'Thank you for your question. I can help you use Cash ERP system. Try asking about invoices, reports, or any other system feature.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${isArabic ? 'left-6' : 'right-6'} z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className={`fixed bottom-6 ${isArabic ? 'left-6' : 'right-6'} z-50 w-96 h-[500px] bg-white/95 backdrop-blur-md border-0 shadow-2xl flex flex-col`}>
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">
                {isArabic ? 'مساعد كاش إي آر بي' : 'Cash ERP Assistant'}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? (isArabic ? 'justify-start' : 'justify-end') : (isArabic ? 'justify-end' : 'justify-start')}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`flex ${isArabic ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1"
                  dir={isArabic ? 'rtl' : 'ltr'}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
