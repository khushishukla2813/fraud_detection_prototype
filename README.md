# **Signature Forgery & Fraud Detection**  

## **Overview**  
This project implements an AI-based fraud detection system with a specific focus on **signature forgery detection**. The system processes signature images, extracts key features, and trains a neural network to classify whether a signature is genuine or forged. Additionally, it includes fraud detection mechanisms to identify suspicious activities based on signature analysis.  

The model is built using **deep learning** and **computer vision** techniques, leveraging **image processing** and **statistical analysis** to enhance accuracy.  

---

## **Project Features**  
✅ **Signature Image Preprocessing** – Converts images to grayscale and binary format, removes noise, and extracts the signature portion.  
✅ **Feature Extraction** – Extracts critical signature features such as **ratio, centroid, eccentricity, solidity, skewness, and kurtosis**.  
✅ **Neural Network Model** – A multilayer perceptron (MLP) is trained to classify signatures as genuine or forged.  
✅ **Fraud Detection** – Identifies potential fraud cases by analyzing inconsistencies in signature data.  
✅ **CSV-based Data Storage** – Stores extracted features in CSV format for training and evaluation.  
✅ **Model Training & Testing** – Uses TensorFlow to train and evaluate the fraud detection model.  
✅ **Performance Evaluation** – Measures accuracy, precision, and recall for fraud detection.  

---

## **Code Structure**  

### **1️⃣ Libraries Used**  
- **NumPy** – Numerical operations  
- **Pandas** – CSV file handling  
- **Matplotlib** – Image visualization  
- **SciPy & Skimage** – Image processing and region properties extraction  
- **TensorFlow** – Deep learning model for signature classification  
- **OS** – File and directory management  

---

### **2️⃣ Functions & Modules**  

#### **📌 Image Processing & Preprocessing**  
- `rgb2grey(img)`: Converts RGB images to grayscale.  
- `grey2bin(img)`: Converts grayscale images to binary using Otsu’s thresholding.  
- `preproc(path, img=None, display=True)`:  
   - Converts the image to grayscale & binary.  
   - Extracts only the signature part from the image using a bounding box.  

#### **📌 Feature Extraction**  
- `Ratio(img)`: Computes the ratio of white pixels to total pixels.  
- `Centroid(img)`: Calculates the signature’s center of mass.  
- `EccentricitySolidity(img)`: Extracts signature eccentricity & solidity.  
- `SkewKurtosis(img)`: Computes the skewness and kurtosis of the signature.  
- `getFeatures(path, img=None, display=False)`: Extracts all features and formats them for analysis.  

#### **📌 Data Handling & CSV Generation**  
- `makeCSV()`: Generates CSV files with extracted signature features for training & testing.  
- `getCSVFeatures(path, img=None, display=False)`: Extracts & stores signature features in CSV format.  
- `readCSV(train_path, test_path, type2=False)`: Reads CSV data and prepares it for model training.  

#### **📌 Fraud Detection & Signature Classification**  
- `multilayer_perceptron(x)`: Defines the architecture of the deep learning model.  
- `trainAndTest(rate=0.001, epochs=1700, neurons=7, display=False)`:  
   - Trains the neural network on signature features.  
   - Evaluates model accuracy.  
- `evaluate(train_path, test_path, type2=False)`:  
   - Loads dataset from CSV files.  
   - Trains & evaluates fraud detection accuracy.  

---

## **🛠️ Workflow**  

### **1️⃣ Image Preprocessing**  
✔ Convert the input signature image to grayscale.  
✔ Convert grayscale image to binary using Otsu's thresholding.  
✔ Extract only the signature portion using bounding box detection.  

### **2️⃣ Feature Extraction**  
✔ Extract key features:  
   - Signature ratio, centroid, eccentricity, solidity, skewness, kurtosis.  
✔ Store the extracted features in CSV files for training & testing.  

### **3️⃣ Model Training & Fraud Detection**  
✔ Train a neural network (MLP) on extracted signature features.  
✔ Evaluate performance using accuracy, precision, and recall metrics.  
✔ Detect fraudulent signatures using statistical analysis & deep learning predictions.  

---

## **📌 Usage**  

### **Training the Model**  
1️⃣ **Prepare Training Data**  
- Store **genuine** and **forged** signatures in `real/` and `forged/` folders.  
- Run `makeCSV()` to generate training & testing feature datasets.  

2️⃣ **Train the Model**  
```python
train_accuracy, test_accuracy, evaluation_time = trainAndTest()
```
- This function will **train & evaluate** the fraud detection model.  
- Outputs accuracy & evaluation time.  

### **Testing a Signature**  
```python
testing("path/to/test/signature.jpg")
```
- Extracts features from a test signature & saves it in a CSV file.  

### **Evaluate a Custom Signature**  
```python
train_person_id = input("Enter person's ID: ")
test_image_path = input("Enter path of signature image: ")

train_path = f'Features/Training/training_{train_person_id}.csv'
testing(test_image_path)
test_path = 'TestFeatures/testcsv.csv'

train_accuracy, test_accuracy, evaluation_time = trainAndTest()
print(f"Training Accuracy: {train_accuracy}")
print(f"Testing Accuracy: {test_accuracy}")
print(f"Evaluation Time: {evaluation_time}")
```
- Trains the model on a custom dataset.  
- Evaluates performance on a new test signature.  

---

## **🔍 Example Output**  
```
Training Accuracy: 98.5%
Testing Accuracy: 96.2%
Time taken for evaluation: 2.5s
```
- The model successfully classifies signatures with **high accuracy**.  

---

## **🚀 Customization & Enhancements**  
- Modify the **neural network layers & hyperparameters** to improve accuracy.  
- Integrate **real-time signature verification** for banking & financial applications.  
- Expand the fraud detection model to detect **anomalies in financial transactions**.  

---

## **📝 Notes**  
- The project is designed using **TensorFlow v1** (`tf.compat.v1`).  
- Consider upgrading to **TensorFlow v2** for improved performance.  

---

## **🌟 Conclusion**  
This AI-powered **Signature Forgery & Fraud Detection System** provides an effective way to classify signatures and detect fraud. The model can be **customized & optimized** for financial security applications, legal document verification, and banking fraud detection.  

