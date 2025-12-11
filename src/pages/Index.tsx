import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import PaymentTerminal from '@/components/PaymentTerminal';

const packages = [
  { price: 450, coins: '500', popular: false },
  { price: 910, coins: '1,000', popular: false },
  { price: 1820, coins: '2,000', popular: true },
  { price: 2720, coins: '3,000', popular: false },
  { price: 4535, coins: '5,000', popular: false },
  { price: 9100, coins: '10,000', popular: false },
  { price: 13600, coins: '15,000', popular: false },
  { price: 18100, coins: '20,000', popular: false },
  { price: 22620, coins: '25,000', popular: false },
  { price: 45240, coins: '50,000', popular: false },
];

const faqItems = [
  {
    question: 'Как купить валюту?',
    answer: 'Выберите нужный пакет, нажмите кнопку "Купить", укажите ваш ID игры Saya, заведите стрим и монеты получены.',
  },
  {
    question: 'Безопасна ли оплата?',
    answer: 'Да, мы используем защищённые платёжные системы. Все транзакции зашифрованы и безопасны.',
  },
  {
    question: 'Как быстро придут монеты?',
    answer: 'Монеты зачисляются мгновенно после успешной оплаты. В редких случаях это может занять до 5 минут.',
  },
  {
    question: 'Можно ли вернуть средства?',
    answer: 'Возврат возможен в течение 14 дней, если монеты не были использованы. Свяжитесь с поддержкой для оформления возврата.',
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyClick = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: 'Оплата прошла успешно! 🎉',
      description: `${selectedPackage?.coins} монет зачислены на ваш счёт`,
    });
    setIsPaymentOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-gaming rounded-lg flex items-center justify-center animate-glow">
                <Icon name="Coins" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-gaming bg-clip-text text-transparent">
                Saya
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('packages')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'packages' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Пакеты
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О игре
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'faq' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('support')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'support' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Поддержка
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 animate-scale-in">
            <div className="w-20 h-20 bg-gradient-gaming rounded-full flex items-center justify-center animate-glow mx-auto">
              <Icon name="Sparkles" size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Games & Party & Chat
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Покупай игровую валюту Saya и получай доступ ко всем возможностям игры
          </p>
        </div>
      </section>

      <section id="packages" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4">Выбери свой пакет</h3>
          <p className="text-center text-muted-foreground mb-12">
            Все цены указаны с учётом комиссии
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in ${
                  pkg.popular ? 'border-primary border-2 shadow-lg shadow-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-gaming text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Coins" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{pkg.coins}</CardTitle>
                  <CardDescription className="text-sm">монет в приложении</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold bg-gradient-gaming bg-clip-text text-transparent mb-2">
                    {pkg.price} ₽
                  </div>
                  <p className="text-xs text-muted-foreground">с учётом комиссии</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleBuyClick(pkg)}
                    className={`w-full font-semibold ${
                      pkg.popular ? 'bg-gradient-gaming hover:opacity-90' : ''
                    }`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-12">О игре Saya</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gamepad2" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Игры</h4>
              <p className="text-muted-foreground">
                Множество увлекательных мини-игр для всей компании
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-secondary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Вечеринки</h4>
              <p className="text-muted-foreground">
                Создавай комнаты и устраивай вечеринки с друзьями
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={32} className="text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Чат</h4>
              <p className="text-muted-foreground">
                Общайся с игроками в реальном времени
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-4xl font-bold text-center mb-12">Частые вопросы</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="support" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="w-20 h-20 bg-gradient-gaming rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Headphones" size={40} className="text-white" />
          </div>
          <h3 className="text-4xl font-bold mb-6">Поддержка</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Наша команда всегда готова помочь вам с любыми вопросами. Мы отвечаем в течение 24 часов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-gaming">
              <Icon name="Mail" size={20} className="mr-2" />
              Написать в поддержку
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Онлайн чат
            </Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-12">Контакты</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">gogleplaydonat1@gmail.com</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="MessageSquare" size={24} className="text-secondary" />
                </div>
                <CardTitle>Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">@SayaGAMeOFFICIAL</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="Globe" size={24} className="text-accent" />
                </div>
                <CardTitle>Сайт</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">saya.chat</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Saya. Games & Party & Chat. Все права защищены.</p>
        </div>
      </footer>

      <PaymentTerminal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={selectedPackage?.price || 0}
        description={`${selectedPackage?.coins} монет`}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}