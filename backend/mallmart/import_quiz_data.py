import json
from mallmart.models import QuizQuestion  # Update to your app name

with open("quiz_questions.json") as f:
    data = json.load(f)

for q in data:
    QuizQuestion.objects.create(
        question=q["question"],
        options=q["options"],
        answer=q["answer"]
    )

print("✅ Quiz questions loaded successfully!")
