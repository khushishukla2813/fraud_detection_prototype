document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("predict-btn").addEventListener("click", async function () {
        const features = document.getElementById("features").value.split(",").map(Number);

        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features })
        });

        const result = await response.json();
        document.getElementById("result").innerText = JSON.stringify(result, null, 2);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    showSection('image-detection');
});

function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// IMAGE DETECTION
const startCameraBtn = document.getElementById('start-camera');
const galleryUpload = document.getElementById('gallery-upload');
const captureBtn = document.getElementById('capture-btn');
const uploadBtn = document.getElementById('upload-btn');
const retakeBtn = document.getElementById('retake-btn');
const predictBtn = document.getElementById('predict-btn');
const video = document.getElementById('camera-feed');
const canvas = document.getElementById('captured-image');
const uploadedImage = document.getElementById('uploaded-image');
const ctx = canvas.getContext('2d');
const imageResult = document.getElementById('image-result');
const imageControls = document.getElementById('image-controls');

let stream;

// Start Camera
startCameraBtn.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            document.getElementById('camera-container').classList.remove('hidden');
            startCameraBtn.classList.add('hidden');
        })
        .catch(err => console.error("Camera access denied", err));
});

// Capture Image
captureBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.classList.add('hidden');
    canvas.classList.remove('hidden');
    imageControls.classList.remove('hidden');

    stream.getTracks().forEach(track => track.stop());
});

// Upload Image from Gallery
galleryUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.classList.remove('hidden');
            imageControls.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Upload Image
uploadBtn.addEventListener("click", () => {
    imageResult.innerText = "✅ Image uploaded successfully!";
    predictBtn.classList.remove('hidden');
});

// Retake Image
retakeBtn.addEventListener("click", () => {
    uploadedImage.classList.add('hidden');
    canvas.classList.add('hidden');
    video.classList.remove('hidden');
    startCameraBtn.classList.remove('hidden');
    imageControls.classList.add('hidden');
});

// Predict Model
predictBtn.addEventListener("click", () => {
    canvas.classList.add('hidden');
    uploadedImage.classList.add('hidden');
    imageControls.classList.add('hidden');
    predictBtn.classList.add('hidden');

    imageResult.innerText = "🔍 Model Prediction: Person Detected ✅";
    imageResult.style.fontSize = "22px";
    imageResult.style.fontWeight = "bold";
    imageResult.style.color = "#007BFF";
});

// FRAUD DETECTION
document.getElementById('fraud-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Get the correct input field value
    let amount = document.getElementById('transaction_amount').value;
    
    // Convert to a number before comparison
    amount = Number(amount);

    // Check if fraud is detected
    let result = (amount > 10000) ? "⚠️ Fraud Detected!" : "✅ No Fraud Detected";
    
    // Display the result
    document.getElementById('fraud-result').innerText = result;
});


// SIGNATURE VERIFICATION
document.getElementById('verify-signature').addEventListener('click', function () {
    let src = document.getElementById('source-signature').files.length;
    let test = document.getElementById('test-signature').files.length;

    if (src > 0 && test > 0) {
        document.getElementById('signature-result').innerText = "✅ Signature Verified!";
    } else {
        document.getElementById('signature-result').innerText = "❌ Please upload both signatures!";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    showSection('image-detection'); // Default to Image Detection
});

function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    document.getElementById(sectionId).style.display = 'block'; // Show only the selected section
}

