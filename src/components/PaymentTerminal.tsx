import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PaymentTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onSuccess: () => void;
}

export default function PaymentTerminal({ 
  isOpen, 
  onClose, 
  amount, 
  description,
  onSuccess 
}: PaymentTerminalProps) {
  const [step, setStep] = useState<'method' | 'card' | 'processing' | 'success'>('method');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCardExpiry(formatExpiry(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardCvv(value);
    }
  };

  const handleMethodSelect = () => {
    if (!email) {
      toast({
        title: 'Ошибка',
        description: 'Укажите email для получения чека',
        variant: 'destructive',
      });
      return;
    }
    if (paymentMethod === 'card') {
      setStep('card');
    } else {
      handlePayment();
    }
  };

  const handlePayment = () => {
    if (step === 'card') {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length !== 16) {
        toast({
          title: 'Ошибка',
          description: 'Неверный номер карты',
          variant: 'destructive',
        });
        return;
      }
      if (!cardExpiry || cardExpiry.length !== 5) {
        toast({
          title: 'Ошибка',
          description: 'Неверный срок действия',
          variant: 'destructive',
        });
        return;
      }
      if (cardCvv.length !== 3) {
        toast({
          title: 'Ошибка',
          description: 'Неверный CVV код',
          variant: 'destructive',
        });
        return;
      }
    }

    setStep('processing');
    
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    }, 2500);
  };

  const handleClose = () => {
    setStep('method');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setEmail('');
    setPaymentMethod('card');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'method' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  <Icon name="ShoppingCart" size={20} className="text-white" />
                </div>
                <DialogTitle>Оплата через Robokassa</DialogTitle>
              </div>
              <DialogDescription>
                {description} • {amount} ₽
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Email для чека</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Способ оплаты</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="CreditCard" size={20} />
                      <span>Банковская карта</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="sbp" id="sbp" />
                    <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="Smartphone" size={20} />
                      <span>СБП</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="yandex" id="yandex" />
                    <Label htmlFor="yandex" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="Wallet" size={20} />
                      <span>ЮMoney</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
                <div className="flex gap-2">
                  <Icon name="Shield" size={16} className="flex-shrink-0 mt-0.5" />
                  <p>Демо-режим: деньги не списываются. Для настоящих платежей подключите Robokassa.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Отмена
              </Button>
              <Button onClick={handleMethodSelect} className="flex-1">
                Продолжить
              </Button>
            </div>
          </>
        )}

        {step === 'card' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  <Icon name="CreditCard" size={20} className="text-white" />
                </div>
                <DialogTitle>Данные карты</DialogTitle>
              </div>
              <DialogDescription>
                К оплате: {amount} ₽
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="mt-1.5"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Срок действия</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    className="mt-1.5"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={cardCvv}
                    onChange={handleCvvChange}
                    className="mt-1.5"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
                <div className="flex gap-2">
                  <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                  <p>Используйте любые данные - это демо-версия платёжного терминала</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('method')} className="flex-1">
                Назад
              </Button>
              <Button onClick={handlePayment} className="flex-1">
                Оплатить {amount} ₽
              </Button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <DialogTitle className="text-center mb-2">Обработка платежа...</DialogTitle>
            <DialogDescription className="text-center">
              Пожалуйста, подождите
            </DialogDescription>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircle2" size={40} className="text-green-600" />
            </div>
            <DialogTitle className="text-center mb-2">Оплата успешна! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
