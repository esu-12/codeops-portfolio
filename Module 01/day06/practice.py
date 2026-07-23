# ==========================================
# DAY 06 PRACTICE
# SOLID Principles & Design Patterns
# ==========================================


# =====================================================
# Exercise 1: Spot the SRP Violation
# =====================================================

print("=" * 60)
print("Exercise 1: Single Responsibility Principle (SRP)")
print("=" * 60)


# Report only stores report data
class Report:

    def __init__(self, title, content):
        self.title = title
        self.content = content


# Responsible for saving reports
class ReportSaver:

    def save(self, report):
        print(f"Saving report: {report.title}")


# Responsible for emailing reports
class ReportEmailer:

    def send(self, report):
        print(f"Emailing report: {report.title}")


report = Report("Monthly Sales", "Sales increased by 10%.")

saver = ReportSaver()
emailer = ReportEmailer()

saver.save(report)
emailer.send(report)


# =====================================================
# Exercise 2: Open/Closed Principle (OCP)
# =====================================================

print("\n" + "=" * 60)
print("Exercise 2: Open/Closed Principle (OCP)")
print("=" * 60)


class Shape:

    def area(self):
        pass


class Circle(Shape):

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.1416 * self.radius ** 2


class Square(Shape):

    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):

    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


shapes = [
    Circle(5),
    Square(4),
    Triangle(6, 3)
]

for shape in shapes:
    print("Area =", shape.area())


# =====================================================
# Exercise 3: Singleton
# =====================================================

print("\n" + "=" * 60)
print("Exercise 3: Singleton")
print("=" * 60)


class AppSettings:

    _instance = None

    def __new__(cls):

        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"

        return cls._instance


settings1 = AppSettings()
settings2 = AppSettings()

print("Currency:", settings1.currency)
print("Same object?", settings1 is settings2)


# =====================================================
# Exercise 4: Factory Pattern
# =====================================================

print("\n" + "=" * 60)
print("Exercise 4: Factory Pattern")
print("=" * 60)


class Circle:

    def draw(self):
        print("Drawing Circle")


class Square:

    def draw(self):
        print("Drawing Square")


class Triangle:

    def draw(self):
        print("Drawing Triangle")


class ShapeFactory:

    @staticmethod
    def create(kind):

        if kind.lower() == "circle":
            return Circle()

        elif kind.lower() == "square":
            return Square()

        elif kind.lower() == "triangle":
            return Triangle()

        else:
            raise ValueError("Unknown shape")


shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

shape1.draw()
shape2.draw()
shape3.draw()


# =====================================================
# Exercise 5: Observer Pattern
# =====================================================

print("\n" + "=" * 60)
print("Exercise 5: Observer Pattern")
print("=" * 60)


class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)


class MobileSubscriber:

    def update(self, news):
        print("Mobile:", news)


class EmailSubscriber:

    def update(self, news):
        print("Email:", news)


agency = NewsAgency()

mobile = MobileSubscriber()
email = EmailSubscriber()

agency.subscribe(mobile)
agency.subscribe(email)

agency.notify("Breaking News: Python Day 06 Completed!")


print("\n" + "=" * 60)
print("End of Day 06 Practice")
print("=" * 60)