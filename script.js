// 🛑🛑🛑 انتبه: استبدل هذا الرابط برابط الـ Web App الخاص بك من Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxo9Zn9L16bI0sylIaVFr4rr7COZ1zgxkIvhiBm3q0fIzzrZS5zmNGJ33aqxkCxNTACkg/exec";

const form = document.querySelector('.client-intake-form');
const submitButton = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للفورم

    // 🔥 Anti-Spam Check (Honeypot)
    // إذا قام البوت بتعبئة الحقل المخفي، نوقف العملية ونوهمه بالنجاح
    const honeypot = document.getElementById('website_url_check');
    if (honeypot && honeypot.value !== "") {
        console.log("Spam bot detected.");
        showSuccessMessage(); // إظهار نجاح مزيف للبوت
        form.reset();
        return;
    }

    // إظهار حالة التحميل
    submitButton.disabled = true;
    submitButton.textContent = 'جاري الإرسال...';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        // 1. تجميع بيانات الفورم
        const formData = new FormData(form);
        
        // إزالة حقل الـ Honeypot من البيانات المرسلة لتنظيف الداتا
        formData.delete('website_url_check');

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // التحقق من أن الرابط قد تم تغييره
        if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_GOES_HERE") {
            throw new Error("الرجاء استبدال SCRIPT_URL برابط Google Apps Script Web App الخاص بك (اتبع ملف التعليمات).");
        }

        // 2. إرسال البيانات إلى Google Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // 3. إظهار رسالة النجاح (بافتراض أن الإرسال تم)
        showSuccessMessage();
        form.reset(); // إفراغ الفورم

    } catch (error) {
        console.error('Error:', error);
        showErrorMessage(error.message);
    } finally {
        // إعادة الزر إلى حالته الطبيعية
        submitButton.disabled = false;
        submitButton.textContent = 'إرسال النموذج';
    }
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function showErrorMessage(message = "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.") {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}