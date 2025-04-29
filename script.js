let savedData = JSON.parse(localStorage.getItem('myForm')) || [];

  let editingIndex = -1;

  function formatDate(dateStr) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [year, month, day] = dateStr.split("-");
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  }
  
  function saveData() {
      const formData = {
        airline: document.getElementById('airline').value,
        tripType: document.querySelector('input[name="tripType"]:checked')?.value || '',
        thefrom: document.getElementById('thefrom').value,
        theto: document.getElementById('theto').value,
        airport: document.getElementById('airport').value,
        timeDep: document.getElementById('timeDep').value,
        timeRtrn: document.getElementById('timeRtrn').value,
        dateDep: document.getElementById('dateDep').value,
        dateRtrn: document.getElementById('dateRtrn').value,
        price: document.getElementById('price').value,
        seatType: document.getElementById('seatType').value,
        kilo: document.getElementById('kilo').value,
      };
    
      // Save new or edited data
      if (editingIndex === -1) {
        savedData.push(formData); // Add new entry
      } else {
        savedData[editingIndex] = formData; // Edit existing
        editingIndex = -1;
      }
    
      // Store updated data to localStorage
      localStorage.setItem('myForm', JSON.stringify(savedData));
    
      // Reset form after save
      document.getElementById('myForm').reset();
    
      // Hide preview (optional)
      document.getElementById('previewForm').style.display = 'none';
  }
  
  // ✅ Place this outside, at the top or just above previewData()
  function buildPreviewRow(label, value) {
      return `
        <div style="font-weight: 600; color: #343a40;">${label}:</div>
        <div style="color: #495057;">${value}</div>
      `;
  }
  // Your previewData function
  function previewData() {
    document.getElementById('previewForm').style.display = 'block';
    const previewDisplay = document.getElementById('previewDisplay');
    previewDisplay.innerHTML = '';
  
    const storedData = JSON.parse(localStorage.getItem('myForm')) || [];
  
    storedData.forEach((data, index) => {
        previewDisplay.innerHTML += `
          <h3 style="text-align:center; color:#13813A; border-radius: 12px 12px 0px 12px; padding:12px;  background-color:rgb(230, 230, 229); width:100%; margin-bottom: 15px; font-size: 1.3rem;">${getAirlineName(data.airline)}</h3>
          
          <div style="position: relative; margin-top:0.6%; border-radius: 12px; border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h2 style="font-weight:500; text-align:left; color:green; padding: 0px 0px 2px 0px; width:102%; border-bottom:1.5px solid green;">ពត៌មានហោះហើរ</h2>
            <button onclick="editEntry(${index})" style="position: absolute; top: 11px; right: 11px; font-size: 14px; padding: 4px 8px; background-color: #C4892B; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
            
            <div style="font-size:17px; margin-top:3%; display: grid; grid-template-columns: max-content 1fr; row-gap: 10px; column-gap: 15px;">

              ${buildPreviewRow('From', data.thefrom)}
              ${buildPreviewRow('To', data.theto)}              
              ${buildPreviewRow('Trip Type', data.tripType)}
              ${buildPreviewRow('Airport', data.airport)}
              ${buildPreviewRow('Departure Time', data.timeDep)}
              ${buildPreviewRow('Return Time', data.timeRtrn)}
              ${buildPreviewRow('Departure Date', data.dateDep)}
              ${buildPreviewRow('Return Date', data.dateRtrn)}
              ${buildPreviewRow('Price', data.price + '$')}
              ${buildPreviewRow('Seat Type', data.seatType)}
              ${buildPreviewRow('Baggage', data.kilo + 'Kg')}
            </div>
          </div>
        `;
    });
    
  }
  
  function editEntry(index) {
      const data = savedData[index];
      editingIndex = index;
    
      document.getElementById('airline').value = data.airline;      
      document.getElementById('thefrom').value = data.thefrom;
      document.getElementById('theto').value = data.theto;
      document.querySelector(`input[name="tripType"][value="${data.tripType}"]`).checked = true;
      document.getElementById('airport').value = data.airport;
      document.getElementById('timeDep').value = data.timeDep;
      document.getElementById('timeRtrn').value = data.timeRtrn;
      document.getElementById('dateDep').value = data.dateDep;
      document.getElementById('dateRtrn').value = data.dateRtrn;
      document.getElementById('price').value = data.price;
      document.getElementById('seatType').value = data.seatType;
      document.getElementById('kilo').value = data.kilo;
    
      // Scroll to form (optional)
      document.getElementById('myForm').scrollIntoView({ behavior: 'smooth' });
    
      // Hide preview while editing (optional)
      document.getElementById('previewForm').style.display = 'none';
  }
  
  
  function clearAllData() {
    savedData = [];
    document.getElementById('myForm').reset();
    document.getElementById('previewDisplay').innerHTML = '';
    document.getElementById('previewForm').style.display = 'none';
    localStorage.removeItem('myForm');
    editingIndex = -1; // Optional if you’re using edit
  }
  
  function getAirlineName(airlineValue) {
      switch (airlineValue) {
        case 'cambodia_airways':
          return 'Cambodia Airways';
        case 'sky_angkor':
          return 'Sky Angkor Airlines';
        case 'air_cambodia':
          return 'Air Cambodia';
        case 'air_asia':
          return 'Air Asia';
        case 'bangkok_airways':
          return 'Bangkok Airways';
        case 'thai_airways':
          return 'Thai Airways';
        case 'vietjet_air':
          return 'Vietjet Air';
        case 'Emirates':
          return 'Emirates';
        case 'singapore_Airlines':
          return 'Singapore Ailines';
        default:
          return 'Unknown Airline';
      }
  }
  
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 10;
    const labelWidth = 50;
    let y = 80; // Start lower below header image
  
    const headerImg = new Image();
    headerImg.src = 'img/header.jpg';
  
    const footerImg = new Image();
    footerImg.src = 'img/footer.jpg';
  
    headerImg.onload = () => {
      footerImg.onload = () => {
  
        const renderPageHeaderFooter = () => {
          doc.addImage(headerImg, 'JPEG', 0, 0, pageWidth, 70); // header height adjusted
          doc.addImage(footerImg, 'JPEG', 0, pageHeight - 73, pageWidth, 73);
        };
  
        renderPageHeaderFooter(); // Draw once per page
  
        savedData.forEach((data, index) => {
          if (y > pageHeight - 60) {
            doc.addPage();
            renderPageHeaderFooter();
            y = 80; // Reset Y
          }
  
          // Airline title
          doc.setFontSize(22);
          doc.setTextColor('#007bff');
          const airlineName = getAirlineName(data.airline);
          const airlineTextWidth = doc.getTextWidth(airlineName);
          const airlineX = (pageWidth - airlineTextWidth) / 2;
          doc.text(airlineName, airlineX, y);
          y += 5;
          doc.setDrawColor('#007bff');
          doc.line(margin, y, pageWidth - margin, y);
          y += 10;
  
          // Info content
          doc.setFontSize(12);
          doc.setTextColor('#333');
  
          const addRow = (label, value) => {
            doc.setFont(undefined, 'bold');
            doc.setTextColor('#000');
            doc.text(label, margin, y);
  
            doc.setFont(undefined, 'normal');
            doc.setTextColor('#000');
            doc.text(value, margin + labelWidth, y);
  
            y += lineHeight + 2;
          };
  
          // English rows

          addRow('From', `:  ${data.thefrom}`);
          addRow('To', `:  ${data.theto}`);          
          addRow('Trip Type',`:  ${data.tripType}`);
          addRow('Airport', `:  ${data.airport}`);
          addRow('Departure Time', `:  ${data.timeDep}`);
          addRow('Return Time', `:  ${data.timeRtrn}`);
          addRow('Departure Date', `:  ${formatDate(data.dateDep)}`);
          addRow('Return Date', `:  ${formatDate(data.dateRtrn)}`);
          addRow('Price', `:  ${data.price}$`);
          addRow('Seat Type', `:  ${data.seatType}`);
          addRow('Baggage', `:  ${data.kilo} Kg`);
  
          y += -2;
          doc.setDrawColor('#ccc');
          doc.line(margin, y, pageWidth - margin, y);
          y += 15;
        });
  
        doc.save('ព័ត៌មានហោះហើរ.pdf');
      };
    };
  }
  
  



    

   
    