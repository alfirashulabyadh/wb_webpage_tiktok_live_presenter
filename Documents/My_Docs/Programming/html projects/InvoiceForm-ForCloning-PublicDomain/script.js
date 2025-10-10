// --- Product Data ---
    const mattressTypes = [
        {name: "فوليوم", height: 23, price: 310000},
        {name: "فوليوم باندا", height: 23, price: 325000},
        {name: "باندا دريم", height: 22, price: 375000},
        {name: "ألترا فوليوم", height: 27, price: 550000},
        {name: "هايبر فوليوم", height: 27, price: 700000},
        {name: "فيسكو فوم", height: 26, price: 600000},
        {name: "فيسكو سبرنك", height: 30, price: 850000},
        {name: "لاتكس شعر الحصان", height: 30, price: 1750000},
        {name: "لاتكس جوز الهند", height: 30, price: 1750000}
    ];
    // Detailed configuration for mattress types: heights -> measurements -> width/length/price
    const mattressDetailsMap = {
        "فوليوم": {
            heights: [
                {h:20, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:155000, default:true},
                    {label:'100x200', w:100, l:200, price:180000},
                    {label:'120x200', w:120, l:200, price:235000}
                ]},
                {h:23, default:true, measurements:[
                    {label:'160x200', w:160, l:200, price:310000},
                    {label:'180x200', w:180, l:200, price:310000, default:true}
                ]},
                {h:25, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:200000},
                    {label:'100x200', w:100, l:200, price:230000},
                    {label:'120x200', w:120, l:200, price:300000},
                    {label:'160x200', w:160, l:200, price:350000},
                    {label:'180x200', w:180, l:200, price:350000, default:true}
                ]},
                {h:30, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:230000},
                    {label:'100x200', w:100, l:200, price:270000},
                    {label:'120x200', w:120, l:200, price:360000},
                    {label:'160x200', w:160, l:200, price:425000},
                    {label:'180x200', w:180, l:200, price:425000, default:true}
                ]}
            ], id: "mattVol"
        },
        "فوليوم باندا": {
            heights: [
                {h:20, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:170000, default:true},
                    {label:'100x200', w:100, l:200, price:200000},
                    {label:'120x200', w:120, l:200, price:250000}
                ]},
                {h:23, default:true, measurements:[
                    {label:'160x200', w:160, l:200, price:325000},
                    {label:'180x200', w:180, l:200, price:325000, default:true}
                ]},
                {h:25, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:225000},
                    {label:'100x200', w:100, l:200, price:250000},
                    {label:'120x200', w:120, l:200, price:320000},
                    {label:'160x200', w:160, l:200, price:370000},
                    {label:'180x200', w:180, l:200, price:370000, default:true}
                ]},
                {h:30, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:260000},
                    {label:'100x200', w:100, l:200, price:300000},
                    {label:'120x200', w:120, l:200, price:380000},
                    {label:'160x200', w:160, l:200, price:450000},
                    {label:'180x200', w:180, l:200, price:450000, default:true}
                ]}
            ], id: "mattVolP"
        },
        "ألترا فوليوم": {
            heights: [
                {h:25, default:true, measurements:[
                    {label:'90x190', w:90, l:190, price:275000, default:true},
                    {label:'100x200', w:100, l:200, price:300000},
                    {label:'120x200', w:120, l:200, price:350000}
                ]},
                {h:27, default:false, measurements:[
                    {label:'160x200', w:160, l:200, price:550000},
                    {label:'180x200', w:180, l:200, price:550000, default:true}
                ]}
            ], id: "mattUltra"
        },
        "باندا دريم": {
            heights: [
                {h:20, default:false, measurements:[
                    {label:'90x190', w:90, l:190, price:190000, default:true},
                    {label:'100x200', w:100, l:200, price:230000},
                    {label:'120x200', w:120, l:200, price:300000}
                ]},
                {h:22, default:true, measurements:[
                    {label:'160x200', w:160, l:200, price:375000},
                    {label:'180x200', w:180, l:200, price:375000, default:true}
                ]}
            ], id: "mattDream"
        },
        "فيسكو فوم": {
            fixedHeightText: 'الارتفاع: 26 سم',
            measurements:[
                {label:'90x190', w:90, l:190, price:325000},
                {label:'100x200', w:100, l:200, price:375000},
                {label:'120x200', w:120, l:200, price:425000},
                {label:'160x200', w:160, l:200, price:600000},
                {label:'180x200', w:180, l:200, price:600000, default:true}
            ], id: "mattVisFoam"
        },
        "هايبر فوليوم": {
            fixedHeightText: 'الارتفاع: 27 سم',
            measurements:[
                {label:'90x190', w:90, l:190, price:375000},
                {label:'100x200', w:100, l:200, price:400000},
                {label:'120x200', w:120, l:200, price:500000},
                {label:'160x200', w:160, l:200, price:700000},
                {label:'180x200', w:180, l:200, price:700000, default:true}
            ], id: "mattHyper"
        },
        "فيسكو سبرنك": {
            fixedHeightText: 'الارتفاع: 30 سم',
            measurements:[
                {label:'90x190', w:90, l:190, price:450000},
                {label:'100x200', w:100, l:200, price:475000},
                {label:'120x200', w:120, l:200, price:525000},
                {label:'160x200', w:160, l:200, price:850000},
                {label:'180x200', w:180, l:200, price:850000, default:true}
            ], id: "mattVisSpring"
        },
        "لاتكس شعر الحصان": {
            fixedHeightText: 'الارتفاع: 30 سم',
            measurements:[
                {label:'90x190', w:90, l:190, price:770000},
                {label:'100x200', w:100, l:200, price:970000},
                {label:'120x200', w:120, l:200, price:1160000},
                {label:'160x200', w:160, l:200, price:1750000},
                {label:'180x200', w:180, l:200, price:1750000, default:true}
            ], id: "mattHorse"
        },
        "لاتكس جوز الهند": {
            fixedHeightText: 'الارتفاع: 30 سم',
            measurements:[
                {label:'90x190', w:90, l:190, price:770000},
                {label:'100x200', w:100, l:200, price:970000},
                {label:'120x200', w:120, l:200, price:1160000},
                {label:'160x200', w:160, l:200, price:1750000},
                {label:'180x200', w:180, l:200, price:1750000, default:true}
            ], id: "mattCoconut"
        }
    };
    const pillowTypes = [
        {name: "وسادة المايكروفايبر", id: "pilMiF", weight: 1000, price: 15000},
        {name: "الوسادة الفندقية", id: "pilHF", weight: 1300, price: 25000},
        {name: "وسادة الفراش الأبيض", id: "pilWB", weight: 1500, price: 30000},
        {name: "وسادة سليب الفراش الأبيض", id: "pilSwb", weight: null, price: 65000},
        {name: "وسادة الميموري فوم - كبير", id: "pilMFbig", weight: null, price: 35000},
        {name: "وسادة الميموري فوم - وسط", id: "pilMFmid", weight: null, price: 25000},
        {name: "وسادة عجين الميموري فوم", id: "pilMFdough", weight: null, price: 30000},
        {name: "وسادة جلاتينية", id: "pilGel", weight: null, price: 50000},
        {name: "وسادة سليب", id: "pilSleep", weight: null, price: 50000},
        {name: "وسادة ستار هوتيل", id: "pilSH", weight: 1300, price: 40000}
    ];
    const duvetTypes = [
        {name: "لحاف رويال ريست", id: "duvRR", width: 200, length: 230, price: 250000},
        {name: "لحاف لينيا نفر", id: "duvLN", width: 170, length: 230, price: 75000},
        {name: "لحاف لينيا نفرين", id: "duvLN2", width: 240, length: 260, price: 110000},
        {name: "اللحاف الفندقي النفر", id: "duvHFtwin", width: 170, length: 230, price: 55000},
        {name: "اللحاف الفندقي النفرين", id: "duvHFking", width: 240, length: 260, price: 65000}
    ];
    const setTypes = [
        {name: "طقم لحاف الفراش الأبيض", id: "setduv", price: 40000},
        {name: "طقم شرشف الفراش الأبيض – حجم نفرين", id: "setsheetKing", price: 35000},
        {name: "طقم شرشف الفراش الأبيض – حجم نفر", id: "setsheetTwin", price: 22000}
    ];
    const productTypeList = [
        "فراش", "وسادة", "واتربروف", "لحاف", "طقم", "منشفة", "برنص", "كوشة", "أخرى"
    ];

    const prodIDsList = {
        "فراش": "mattress",
        "وسادة": "pillow",
        "واتربروف": "waterproof",
        "لحاف": "duvet",
        "طقم": "set",
        "منشفة": "towel",
        "برنص": "bathrobe",
        "كوشة": "cushion",
        // "أخرى": "other"
    };

    const productEmojis = {
        "فراش": "☁",
        "وسادة": "🎐",
        "واتربروف": "💧",
        "default": "#️⃣"
    };
    // --- State ---
    let products = [
        {id: 1, type: null, details: {}}
    ];
    let productIdCounter = 2;
    // --- DOM Elements ---
    const productsArea = document.getElementById('productsArea');
    const addProductBtn = document.getElementById('addProductBtn');
    const totalAmountEl = document.getElementById('totalAmount');
    const deliveryCostEl = document.getElementById('deliveryCost');
    const deliveryDaysEl = document.getElementById('deliveryDays');
    const continueBtn = document.getElementById('continueBtn');
    const backBtn = document.getElementById('backBtn');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const submitBtn = document.getElementById('submitBtn');
    const snackbar = document.getElementById('snackbar');
    // Pencil/Check toggle for total amount
    const totalAmount = document.getElementById('totalAmount');
    const totalAmountInput = document.getElementById('totalAmountInput');
    const editTotalBtn = document.getElementById('editTotalBtn');
    const editTotalIcon = document.getElementById('editTotalIcon');

        editTotalBtn.addEventListener('click', function() {
            if (totalAmount.style.display !== 'none') {
                // Switch to edit mode
                let currentValue = totalAmount.textContent.trim();
                // Convert Arabic numerals to Western numerals
                let arabicToWestern = s => s.replace(/[\u0660-\u0669]/g, d => '0123456789'["\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d)]);
                let standardValue = arabicToWestern(currentValue).replace(/,/g, '').replace(/\s+/g, '');


                totalAmount.style.display = 'none';
                totalAmountInput.style.display = 'inline-block';
                totalAmountInput.value = reverseFormatNumber(currentValue);
                editTotalIcon.textContent = '✔️';
                totalAmountInput.focus();
            } else {
                // Save and switch to view mode
                let value = parseInt(totalAmountInput.value, 10);
                if (isNaN(value) || value < 0) value = 0;
                totalAmount.textContent = formatNumber(value);
                totalAmount.style.display = 'inline';
                totalAmountInput.style.display = 'none';
                editTotalIcon.textContent = '✏️';
                updateRemainingAmount();
            }
        });


    totalAmountInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            editTotalBtn.click();
        }
    });
    // --- Helper Functions ---
    function formatNumber(n) {
        return n ? n.toLocaleString('ar-IQ') : '';
    }

    // Converts Arabic-Indic numerals in a string to standard Western numerals
    function standardNum(str) {
        if (typeof str !== 'string' ) str = String(str);
        // Arabic-Indic digits: \u0660-\u0669
        return str.replace(/[\u0660-\u0669]/g, d => '0123456789'["\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d)]);
    }
    function parseNumber(str) {
        return Number(String(str).replace(/,/g, '')) || 0;
    }

    // ...existing helper functions...

    function reverseFormatNumber(formattedNumber) {
    if (typeof formattedNumber !== 'string' || formattedNumber === '') {
        return NaN; // Or throw an error for invalid input
    }

    // 1. Convert Arabic numerals to Latin numerals
    const arabicToLatinMap = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
        '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
    };

    let latinNumeralsAndSeparators = '';
    for (let i = 0; i < formattedNumber.length; i++) {
        const char = formattedNumber[i];
        if (arabicToLatinMap[char]) {
            latinNumeralsAndSeparators += arabicToLatinMap[char];
        } else {
            latinNumeralsAndSeparators += char; // Keep other characters (separators)
        }
    }

    // 2. Remove the Arabic Thousands Separator (٬ - U+066C)
    //    and replace the Arabic Decimal Separator (٫ - U+066B) with a standard period (.)
    const cleanNumberString = latinNumeralsAndSeparators
        .replace(/٬/g, '') // Remove Arabic thousands separator (U+066C)
        .replace(/٫/g, '.'); // Replace Arabic decimal separator (U+066B) with period

    // 3. Convert to a number
    return parseFloat(cleanNumberString);
}

    function getProductEmoji(type) {
        if (productEmojis[type]) return productEmojis[type];
        return productEmojis['default'];
    }
    // --- Product UI Rendering ---
    function renderProducts() {
        productsArea.innerHTML = '';
        products.forEach((prod, idx) => {
            const prodDiv = document.createElement('div');
            prodDiv.className = 'section';
            prodDiv.style.position = 'relative';
            prodDiv.style.marginBottom = '18px';
            // Product header label (e.g., "المنتج الأول" or "المنتج رقم 11")
            function arabicOrdinal(n) {
                const map = {
                    1: 'الأول',2: 'الثاني',3: 'الثالث',4: 'الرابع',5: 'الخامس',
                    6: 'السادس',7: 'السابع',8: 'الثامن',9: 'التاسع',10: 'العاشر'
                };
                return map[n] || null;
            }
            function formatProductLabel(n) {
                const ord = arabicOrdinal(n);
                if (ord) return 'المنتج ' + ord;
                return 'المنتج رقم ' + n;
            }
            const header = document.createElement('div');
            header.className = 'product-header';
            header.textContent = formatProductLabel(idx + 1);
            prodDiv.appendChild(header);
            // Remove button
            if (products.length > 1) {
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'remove-product-btn';
                removeBtn.title = 'حذف المنتج';
                removeBtn.innerHTML = '&times;';
                removeBtn.onclick = () => { products.splice(idx,1); renderProducts(); updateTotal(); };
                prodDiv.appendChild(removeBtn);
            }
            // Product type buttons
            const btnsDiv = document.createElement('div');
            btnsDiv.className = 'product-types';
            productTypeList.forEach(type => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'product-type-btn' + (prod.type === type ? ' selected' : '');
                btn.textContent = type;
                btn.onclick = () => {
                    prod.type = type;
                    // Set default values for details based on type
                    prod.details = {};
                    if (type === "فراش") {
                        prod.details.mattressType = mattressTypes[0].name;
                        prod.details.height = mattressTypes[0].height;
                        prod.details.price = mattressTypes[0].price;
                        prod.details.length = 200;
                        prod.details.width = 180;
                        prod.details.qty = 1;
                        prod.details.personWeight = "60 – 80 كغ";
                        prod.details.warranty = 5;
                    } else if (type === "وسادة") {
                        prod.details.pillowType = pillowTypes[1].name;
                        prod.details.weight = pillowTypes[1].weight;
                        prod.details.price = pillowTypes[1].price;
                        prod.details.qty = 1;
                    } else if (type === "واتربروف") {
                        prod.details.length = 200;
                        prod.details.width = 180;
                        prod.details.price = 45000;
                        prod.details.qty = 1;
                        // default to 180x200 quick-select for واتربروف
                        prod.details.wpId = 'wp180';
                    } else if (type === "لحاف") {
                        // default to first duvet type
                        const d = duvetTypes[0];
                        prod.details.duvetType = d.name;
                        prod.details.width = d.width;
                        prod.details.length = d.length;
                        prod.details.price = d.price;
                        prod.details.qty = 1;
                    } else {
                        prod.details.qty = 1;
                    }
                    if (type === "طقم") {
                        const s = setTypes[0];
                        prod.details.setType = s.name;
                        prod.details.price = s.price;
                        prod.details.qty = 1;
                    }
                    renderProducts();
                    updateTotal();
                };
                btnsDiv.appendChild(btn);
            });
            prodDiv.appendChild(btnsDiv);
            // Product details
            if (prod.type) {
                prodDiv.appendChild(renderProductFields(prod, idx));
            }
            productsArea.appendChild(prodDiv);
        });
        // wire the event capsule buttons after re-render
        try { setupEventCapsule(); } catch(e) {}
    }
    // Wire event capsule buttons (also called on initial load)
    function setupEventCapsule() {
        const caps = document.querySelectorAll('.event-capsule-btn');
        // Sync initial state from checked radio
        const checked = document.querySelector('input[name="eventMode"]:checked');
        if (checked) {
            caps.forEach(x => x.classList.remove('selected'));
            const found = Array.from(caps).find(c => c.dataset.value === checked.value);
            if (found) found.classList.add('selected');
        }
        caps.forEach(b => {
            // remove existing to avoid duplicate bindings
            b.replaceWith(b.cloneNode(true));
        });
        // re-query after cloning
        const caps2 = document.querySelectorAll('.event-capsule-btn');
        caps2.forEach(b => {
            b.addEventListener('click', function() {
                caps2.forEach(x => x.classList.remove('selected'));
                this.classList.add('selected');
                const v = this.dataset.value;
                const r = document.querySelector('input[name="eventMode"][value="' + v + '"]');
                if (r) r.checked = true;
            });
        });
    }
    function renderProductFields(prod, idx) {
        const wrap = document.createElement('div');
        // Helper: description checkbox and field
        function renderDescriptionSection() {
            const descDiv = document.createElement('div');
            descDiv.className = 'field-group';
            descDiv.style.marginBottom = '10px';
            // Checkbox
            const descLabel = document.createElement('label');
            descLabel.style.display = 'inline-flex';
            descLabel.style.alignItems = 'center';
            descLabel.style.cursor = 'pointer';
            const descCheckbox = document.createElement('input');
            descCheckbox.type = 'checkbox';
            descCheckbox.checked = !!prod.details.description;
            descCheckbox.style.marginLeft = '6px';
            descLabel.appendChild(descCheckbox);
            descLabel.appendChild(document.createTextNode('تضمين وصف'));
            descDiv.appendChild(descLabel);
            // Description input
            const descInputDiv = document.createElement('div');
            descInputDiv.className = 'field-group';
            descInputDiv.style.marginTop = '6px';
            descInputDiv.style.display = descCheckbox.checked ? '' : 'none';
            const descInputLabel = document.createElement('label');
            descInputLabel.textContent = 'الوصف:';
            // Use textarea for multi-line
            const descInput = document.createElement('textarea');
            descInput.className = 'product-description-input';
            descInput.value = prod.details.description || '';
            descInput.placeholder = 'الوصف';
            descInput.rows = 3;
            descInput.oninput = function() {
                prod.details.description = this.value;
            };
            descInputDiv.appendChild(descInputLabel);
            descInputDiv.appendChild(descInput);
            // measurement buttons are shown only for specific product types (e.g., واتربروف)
            // they will be appended by the product-specific renderer when needed
            descDiv.appendChild(descInputDiv);
            descCheckbox.addEventListener('change', function() {
                descInputDiv.style.display = this.checked ? '' : 'none';
                if (!this.checked) prod.details.description = '';
            });
            return descDiv;
        }
        // فراش
        if (prod.type === "فراش") {
            // نوع الفراش
            const mattressGroup = document.createElement('div');
            mattressGroup.className = 'field-group';
            const label = document.createElement('label');
            label.textContent = "نوع الفراش";
            mattressGroup.appendChild(label);
            const select = document.createElement('select');
            mattressTypes.forEach((m, i) => {
                const opt = document.createElement('option');
                opt.value = m.name;
                opt.textContent = m.name;
                select.appendChild(opt);
            });
            select.value = prod.details.mattressType || mattressTypes[0].name;
            select.onchange = function() {
                prod.details.mattressType = this.value;
                // set default height/price
                const m = mattressTypes.find(x=>x.name===this.value);
                prod.details.height = m.height;
                prod.details.price = m.price;
                // clear any previous chosen sub-options
                delete prod.details._mattressHeightChoice;
                delete prod.details._mattressMeasureChoice;
                renderProducts();
                updateTotal();
            };
            mattressGroup.appendChild(select);
            // --- dynamic height / measurements UI (inserted below select)
            const mattressOptionsDiv = document.createElement('div');
            mattressOptionsDiv.className = 'mattress-options';
            mattressGroup.appendChild(mattressOptionsDiv);
            wrap.appendChild(mattressGroup);
            // Populate mattressOptionsDiv based on selected mattress type
            (function(){
                const cfg = mattressDetailsMap[prod.details.mattressType || mattressTypes[0].name];
                const container = mattressGroup.querySelector('.mattress-options');
                container.innerHTML = '';
                if (!cfg) return;
                // if has fixedHeightText, show it and measurement buttons
                if (cfg.fixedHeightText) {
                    const p = document.createElement('div');
                    // mark this fixed-height text so we can hide it during custom measurement mode
                    p.className = 'field-group fixed-height-text';
                    p.textContent = cfg.fixedHeightText;
                    container.appendChild(p);
                    // measurements
                    const measureLabel = document.createElement('label');
                    measureLabel.className = 'measure-label';
                    measureLabel.textContent = 'القياس';
                    container.appendChild(measureLabel);
                    const measDiv = document.createElement('div');
                    measDiv.className = 'sizes-container';
                    cfg.measurements.forEach(m => {
                        const b = document.createElement('button');
                        b.type = 'button';
                        b.className = 'size-select-btn';
                        b.textContent = m.label;
                        b.onclick = function() {
                            prod.details.width = m.w;
                            prod.details.length = m.l;
                            // keep height from fixed text if needed
                            prod.details.price = m.price;
                            // mark selection
                            prod.details._mattressMeasureChoice = m.label;
                            // update computed id (inline to avoid adding another helper)
                            try {
                                if (prod.type === "فراش") {
                                    const mtName = prod.details && prod.details.mattressType;
                                    const cfg = mattressDetailsMap[mtName];
                                    const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                                    const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                                    const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                    if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                                    else if (h) prod.details.id = `${baseId}${h}`;
                                    else prod.details.id = baseId;
                                } else if (prod.type === "وسادة") {
                                    const pName = prod.details && prod.details.pillowType;
                                    const p = pillowTypes.find(x => x.name === pName);
                                    prod.details.id = (p && p.id) ? p.id : (prod.details && prod.details.id) || prodIDsList["وسادة"] || prod.id;
                                } else if (prod.type === "واتربروف") {
                                    if (prod.details && prod.details.wpId) prod.details.id = prod.details.wpId;
                                    else {
                                        const base = prodIDsList["واتربروف"] || (prod.details && prod.details.id) || prod.id || 'waterproof';
                                        const wv = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                        const lv = prod.details && prod.details.length ? parseNumber(prod.details.length) : null;
                                        prod.details.id = `${base}${wv?`_${wv}`:''}${lv?`_${lv}`:''}`;
                                    }
                                } else if (prod.type === "لحاف") {
                                    const dName = prod.details && prod.details.duvetType;
                                    const d = duvetTypes.find(x => x.name === dName);
                                    const base = (d && d.id) ? d.id : (prodIDsList["لحاف"] || (prod.details && prod.details.id) || prod.id);
                                    const wv = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                    const lv = prod.details && prod.details.length ? parseNumber(prod.details.length) : null;
                                    prod.details.id = `${base}${wv?`_${wv}`:''}${lv?`_${lv}`:''}`;
                                } else if (prod.type === "طقم") {
                                    const sName = prod.details && prod.details.setType;
                                    const s = setTypes.find(x => x.name === sName);
                                    prod.details.id = (s && s.id) ? s.id : (prod.details && prod.details.id) || prodIDsList["طقم"] || prod.id;
                                } else {
                                    prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prodIDsList[prod.type] || prod.id || (prod.details && prod.details.type));
                                }
                            } catch (e) {
                                prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type);
                            }
                            renderProducts();
                            updateTotal();
                        };
                        // mark active if this measurement is selected, or if it's the default and no selection yet
                        if (!prod.details.customMeasure && (prod.details._mattressMeasureChoice === m.label || (m.default && !prod.details._mattressMeasureChoice))) {
                            prod.details.width = m.w;
                            prod.details.length = m.l;
                            prod.details.price = m.price;
                            prod.details._mattressMeasureChoice = m.label;
                            b.classList.add('size-select-active');
                        }
                        measDiv.appendChild(b);
                    });
                    container.appendChild(measDiv);
                    return;
                }
                // otherwise render heights then measurements
                const heights = cfg.heights || [];
                if (heights.length) {
                    // add a visible label above the heights buttons
                    const heightsLabel = document.createElement('label');
                    heightsLabel.className = 'heights-label';
                    heightsLabel.textContent = 'الارتفاع';
                    container.appendChild(heightsLabel);
                    const heightsDiv = document.createElement('div');
                    heightsDiv.className = 'heights-container';
                    heights.forEach(hObj => {
                        const hb = document.createElement('button');
                        hb.type = 'button';
                        // reuse size-select-btn so heights share the same visual style as measurements
                        hb.className = 'size-select-btn';
                        hb.textContent = String(hObj.h);
                        hb.onclick = function() {
                            // set chosen height key
                            prod.details._mattressHeightChoice = hObj.h;
                            prod.details.height = hObj.h;
                            // clear previous measure choice to allow default for this height
                            delete prod.details._mattressMeasureChoice;
                            // update computed id (inline)
                            try {
                                const mtName = prod.details && prod.details.mattressType;
                                const cfg = mattressDetailsMap[mtName];
                                const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                                const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                                const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                                else if (h) prod.details.id = `${baseId}${h}`;
                                else prod.details.id = baseId;
                            } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
                            renderProducts();
                            updateTotal();
                        };
                        // default selection
                        if (!prod.details.customMeasure && ((hObj.default && (prod.details._mattressHeightChoice===undefined)) || prod.details._mattressHeightChoice===hObj.h)) {
                            // mark active with the same active class used by measurement buttons
                            hb.classList.add('size-select-active');
                            prod.details._mattressHeightChoice = hObj.h;
                            prod.details.height = hObj.h;
                        }
                        heightsDiv.appendChild(hb);
                    });
                    container.appendChild(heightsDiv);
                    // find selected height object
                    const chosen = heights.find(x=>x.h===prod.details._mattressHeightChoice) || heights[0];
                    // render measurements for chosen height
                    const measureLabel = document.createElement('label');
                    measureLabel.className = 'measure-label';
                    measureLabel.textContent = 'القياس';
                    container.appendChild(measureLabel);
                    const measDiv = document.createElement('div');
                    measDiv.className = 'sizes-container';
                    (chosen.measurements||[]).forEach(m => {
                        const b = document.createElement('button');
                        b.type = 'button';
                        b.className = 'size-select-btn';
                        b.textContent = m.label;
                        b.onclick = function() {
                            prod.details.width = m.w;
                            prod.details.length = m.l;
                            prod.details.price = m.price;
                            prod.details._mattressMeasureChoice = m.label;
                            // update computed id (inline)
                            try {
                                const mtName = prod.details && prod.details.mattressType;
                                const cfg = mattressDetailsMap[mtName];
                                const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                                const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                                const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                                else if (h) prod.details.id = `${baseId}${h}`;
                                else prod.details.id = baseId;
                            } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
                            renderProducts();
                            updateTotal();
                        };
                        // mark active if this measurement is selected, or if it's the default and no selection yet
                        if (!prod.details.customMeasure && (prod.details._mattressMeasureChoice === m.label || (m.default && !prod.details._mattressMeasureChoice))) {
                            prod.details.width = m.w;
                            prod.details.length = m.l;
                            prod.details.price = m.price;
                            prod.details._mattressMeasureChoice = m.label;
                            b.classList.add('size-select-active');
                        }
                        measDiv.appendChild(b);
                    });
                    container.appendChild(measDiv);
                }
            })();
            // --- قياس خاص checkbox (switch between quick-select and custom inputs)
            const customMeasDiv = document.createElement('div');
            customMeasDiv.className = 'field-group custom-meas';
            const customLabel = document.createElement('label');
            customLabel.style.display = 'inline-flex';
            customLabel.style.alignItems = 'center';
            customLabel.style.cursor = 'pointer';
            const customCheckbox = document.createElement('input');
            customCheckbox.type = 'checkbox';
            customCheckbox.style.marginLeft = '6px';
            customCheckbox.checked = !!prod.details.customMeasure;
            customLabel.appendChild(customCheckbox);
            customLabel.appendChild(document.createTextNode('قياس خاص'));
            customMeasDiv.appendChild(customLabel);
            mattressGroup.appendChild(customMeasDiv);

            // الطول والعرض والارتفاع (hidden by default unless customMeasure is true)
            const sizeRow = document.createElement('div');
            sizeRow.className = 'input-row';
            // الطول
            const lengthGroup = document.createElement('div');
            lengthGroup.className = 'field-group';
            const lengthLabel = document.createElement('label');
            lengthLabel.textContent = "الطول";
            lengthGroup.appendChild(lengthLabel);
            const lengthInput = document.createElement('input');
            lengthInput.type = 'number';
            lengthInput.min = 1;
            lengthInput.value = prod.details.length || 200;
            lengthInput.oninput = function() {
                prod.details.length = parseNumber(this.value);
                // If user manually edited dimensions, clear any "suggested"
                // measurement markers so future rendering won't override manual values.
                try { delete prod.details._mattressMeasureChoice; } catch(e) {}
                try { delete prod.details._mattressHeightChoice; } catch(e) {}
                updateTotal();
                try {
                    const mtName = prod.details && prod.details.mattressType;
                    const cfg = mattressDetailsMap[mtName];
                    const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                    const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                    const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                    if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                    else if (h) prod.details.id = `${baseId}${h}`;
                    else prod.details.id = baseId;
                } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
            };
            lengthGroup.appendChild(lengthInput);
            sizeRow.appendChild(lengthGroup);
            // العرض
            const widthGroup = document.createElement('div');
            widthGroup.className = 'field-group';
            const widthLabel = document.createElement('label');
            widthLabel.textContent = "العرض";
            widthGroup.appendChild(widthLabel);
            const widthInput = document.createElement('input');
            widthInput.type = 'number';
            widthInput.min = 1;
            widthInput.value = prod.details.width || 180;
            widthInput.oninput = function() {
                prod.details.width = parseNumber(this.value);
                // Clear suggested-choice flags when user types a custom width
                try { delete prod.details._mattressMeasureChoice; } catch(e) {}
                try { delete prod.details._mattressHeightChoice; } catch(e) {}
                updateTotal();
                try {
                    const mtName = prod.details && prod.details.mattressType;
                    const cfg = mattressDetailsMap[mtName];
                    const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                    const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                    const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                    if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                    else if (h) prod.details.id = `${baseId}${h}`;
                    else prod.details.id = baseId;
                } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
            };
            widthGroup.appendChild(widthInput);
            sizeRow.appendChild(widthGroup);
            // الارتفاع
            const heightGroup = document.createElement('div');
            heightGroup.className = 'field-group';
            const heightLabel = document.createElement('label');
            heightLabel.textContent = "الارتفاع";
            heightGroup.appendChild(heightLabel);
            const heightInput = document.createElement('input');
            heightInput.type = 'number';
            heightInput.min = 1;
            // default from mattress type
            let selectedMattress = mattressTypes.find(x=>x.name=== (prod.details.mattressType || mattressTypes[0].name));
            heightInput.value = prod.details.height || selectedMattress.height;
            heightInput.oninput = function() {
                prod.details.height = parseNumber(this.value);
                // Clear suggested-choice flags when user types a custom height
                try { delete prod.details._mattressHeightChoice; } catch(e) {}
                try { delete prod.details._mattressMeasureChoice; } catch(e) {}
                updateTotal();
                try {
                    const mtName = prod.details && prod.details.mattressType;
                    const cfg = mattressDetailsMap[mtName];
                    const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                    const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                    const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                    if (h && w) prod.details.id = `${baseId}${h}_${w}`;
                    else if (h) prod.details.id = `${baseId}${h}`;
                    else prod.details.id = baseId;
                } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
            };
            heightGroup.appendChild(heightInput);
            sizeRow.appendChild(heightGroup);
            // default visibility depends on customMeasure flag
            const isCustom = !!prod.details.customMeasure;
            sizeRow.style.display = isCustom ? '' : 'none';
            wrap.appendChild(sizeRow);
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || selectedMattress.price;
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                // Manual price edits should persist and override suggested choices
                try { delete prod.details._mattressMeasureChoice; } catch(e) {}
                try { delete prod.details._mattressHeightChoice; } catch(e) {}
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            // make price read-only unless custom measurement mode is enabled
            priceInput.readOnly = !isCustom;
            if (priceInput.readOnly) priceInput.classList.add('readonly');
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // --- move description to appear above "وزن الأشخاص" per user request
            wrap.appendChild(renderDescriptionSection());

            // وزن الأشخاص
            const weightGroup = document.createElement('div');
            weightGroup.className = 'field-group';
            const weightLabel = document.createElement('label');
            weightLabel.textContent = "وزن الأشخاص";
            weightGroup.appendChild(weightLabel);
            const weightSelect = document.createElement('select');
            ["أقل من 60 كغ","60 – 80 كغ","80 – 100 كغ","أكثر من 100 كغ"].forEach(val=>{
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = val;
                weightSelect.appendChild(opt);
            });
            weightSelect.value = prod.details.personWeight || "60 – 80 كغ";
            weightSelect.onchange = function() {
                prod.details.personWeight = this.value;
            };
            weightGroup.appendChild(weightSelect);
            wrap.appendChild(weightGroup);

            // --- Wire up the custom-measure checkbox behavior ---
            (function(){
                // helper: restore quick-select choices into prod.details
                function restoreQuickSelection() {
                    try {
                        const mtName = prod.details && prod.details.mattressType;
                        const cfg = mattressDetailsMap[mtName];
                        if (!cfg) return;
                        // fixedHeightText case -> measurements[]
                        if (cfg.fixedHeightText && Array.isArray(cfg.measurements)) {
                            let chosen = null;
                            if (prod.details._mattressMeasureChoice) {
                                chosen = cfg.measurements.find(m=>m.label===prod.details._mattressMeasureChoice);
                            }
                            if (!chosen) chosen = cfg.measurements.find(m=>m.default) || cfg.measurements[0];
                            if (chosen) {
                                prod.details.width = chosen.w;
                                prod.details.length = chosen.l;
                                prod.details.price = chosen.price;
                                prod.details._mattressMeasureChoice = chosen.label;
                            }
                        } else if (Array.isArray(cfg.heights)) {
                            const heights = cfg.heights;
                            let hObj = null;
                            if (prod.details._mattressHeightChoice) {
                                hObj = heights.find(h=>h.h==prod.details._mattressHeightChoice);
                            }
                            if (!hObj) hObj = heights.find(h=>h.default) || heights[0];
                            const measures = hObj && hObj.measurements ? hObj.measurements : [];
                            let chosen = null;
                            if (prod.details._mattressMeasureChoice) chosen = measures.find(m=>m.label===prod.details._mattressMeasureChoice);
                            if (!chosen) chosen = measures.find(m=>m.default) || measures[0];
                            if (hObj && chosen) {
                                prod.details.height = hObj.h;
                                prod.details.width = chosen.w;
                                prod.details.length = chosen.l;
                                prod.details.price = chosen.price;
                                prod.details._mattressHeightChoice = hObj.h;
                                prod.details._mattressMeasureChoice = chosen.label;
                            }
                        }
                    } catch(e) { /* ignore */ }
                }

                // find the measurement containers inside mattressOptionsDiv to hide/show
                const optionsContainer = mattressGroup.querySelector('.mattress-options');
                const heightsContainer = optionsContainer ? optionsContainer.querySelector('.heights-container') : null;
                const sizesContainer = optionsContainer ? optionsContainer.querySelector('.sizes-container') : null;

                function applyMode(customOn) {
                    // show/hide quick-select containers (heights and sizes)
                    if (heightsContainer) heightsContainer.style.display = customOn ? 'none' : '';
                    if (optionsContainer) {
                        const allSizes = optionsContainer.querySelectorAll('.sizes-container');
                        allSizes.forEach(n => n.style.display = customOn ? 'none' : '');
                    } else if (sizesContainer) {
                        sizesContainer.style.display = customOn ? 'none' : '';
                    }

                    // also hide the labels for heights/measurement if present
                    const heightsLabel = optionsContainer ? optionsContainer.querySelector('.heights-label') : null;
                    const measureLabel = optionsContainer ? optionsContainer.querySelector('.measure-label') : null;
                    if (heightsLabel) heightsLabel.style.display = customOn ? 'none' : '';
                    if (measureLabel) measureLabel.style.display = customOn ? 'none' : '';

                    // show/hide manual size inputs
                    sizeRow.style.display = customOn ? '' : 'none';
                    // price readonly toggling
                    priceInput.readOnly = !customOn;
                    if (priceInput.readOnly) priceInput.classList.add('readonly'); else priceInput.classList.remove('readonly');
                    // when switching off custom, restore quick selection values as authoritative
                    if (!customOn) {
                        restoreQuickSelection();
                        // update visual active state of buttons to match restored choices
                        if (optionsContainer) {
                            // measurements
                            const measureBtns = optionsContainer.querySelectorAll('.sizes-container .size-select-btn');
                            measureBtns.forEach(btn => {
                                const txt = btn.textContent && btn.textContent.trim();
                                btn.classList.toggle('size-select-active', txt === prod.details._mattressMeasureChoice);
                            });
                            // heights
                            const heightBtns = optionsContainer.querySelectorAll('.heights-container .size-select-btn');
                            heightBtns.forEach(btn => {
                                const txt = btn.textContent && btn.textContent.trim();
                                btn.classList.toggle('size-select-active', txt === String(prod.details._mattressHeightChoice));
                            });
                            // fixed-height text (if exists) should be visible now
                            const fixedText = optionsContainer.querySelector('.fixed-height-text');
                            if (fixedText) fixedText.style.display = '';
                        }
                    } else {
                        // when entering custom mode, hide any active visual state on quick-select buttons
                        if (optionsContainer) {
                            const allBtns = optionsContainer.querySelectorAll('.size-select-btn');
                            allBtns.forEach(b => b.classList.remove('size-select-active'));
                            const fixedText = optionsContainer.querySelector('.fixed-height-text');
                            if (fixedText) fixedText.style.display = 'none';
                        }
                    }
                    updateTotal();
                }

                // initial application
                applyMode(!!prod.details.customMeasure);

                customCheckbox.addEventListener('change', function() {
                    prod.details.customMeasure = !!this.checked;
                    applyMode(prod.details.customMeasure);
                });
            })();
            // الضمان
            const warrantyGroup = document.createElement('div');
            warrantyGroup.className = 'field-group input-row';
            const warrantyLabel = document.createElement('label');
            warrantyLabel.textContent = "الضمان (سنة)";
            warrantyLabel.style.flex = "1";
            warrantyGroup.appendChild(warrantyLabel);
            const warrantyInputGroup = document.createElement('div');
            warrantyInputGroup.className = 'input-number-group';
            const warrantyMinus = document.createElement('button');
            warrantyMinus.type = 'button';
            warrantyMinus.className = 'input-number-btn';
            warrantyMinus.innerHTML = '&#8722;';
            warrantyMinus.onclick = function() {
                let val = parseFloat(prod.details.warranty || 5);
                if (val > 0.5) {
                    val = val === 1 ? 0.5 : Math.max(0.5, val-1);
                    prod.details.warranty = val;
                    renderProducts();
                }
            };
            warrantyInputGroup.appendChild(warrantyMinus);
            const warrantyInput = document.createElement('input');
            warrantyInput.type = 'number';
            warrantyInput.min = 0.5;
            warrantyInput.max = 10;
            warrantyInput.step = 0.5;
            warrantyInput.value = prod.details.warranty || 5;
            warrantyInput.oninput = function() {
                let v = parseFloat(this.value);
                if (v < 0.5) v = 0.5;
                if (v > 10) v = 10;
                prod.details.warranty = v;
            };
            warrantyInputGroup.appendChild(warrantyInput);
            const warrantyPlus = document.createElement('button');
            warrantyPlus.type = 'button';
            warrantyPlus.className = 'input-number-btn';
            warrantyPlus.innerHTML = '&#43;';
            warrantyPlus.onclick = function() {
                let val = parseFloat(prod.details.warranty || 5);
                if (val < 10) {
                    val = val === 0.5 ? 1 : Math.min(10, val+1);
                    prod.details.warranty = val;
                    renderProducts();
                }
            };
            warrantyInputGroup.appendChild(warrantyPlus);
            warrantyGroup.appendChild(warrantyInputGroup);
            wrap.appendChild(warrantyGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // وسادة
        else if (prod.type === "وسادة") {
            // نوع الوسادة
            const pillowGroup = document.createElement('div');
            pillowGroup.className = 'field-group';
            const label = document.createElement('label');
            label.textContent = "نوع الوسادة";
            pillowGroup.appendChild(label);
            const select = document.createElement('select');
            pillowTypes.forEach((p, i) => {
                const opt = document.createElement('option');
                opt.value = p.name;
                opt.textContent = p.name;
                select.appendChild(opt);
            });
            select.value = prod.details.pillowType || pillowTypes[0].name;
            select.onchange = function() {
                prod.details.pillowType = this.value;
                // set default weight/price
                const p = pillowTypes.find(x=>x.name===this.value);
                prod.details.weight = p.weight;
                prod.details.price = p.price;
                renderProducts();
                updateTotal();
            };
            pillowGroup.appendChild(select);
            wrap.appendChild(pillowGroup);
            // --- وصف ---
            wrap.appendChild(renderDescriptionSection());
            // الوزن (إلا جلاتينية وسليب)
            let selectedPillow = pillowTypes.find(x=>x.name=== (prod.details.pillowType || pillowTypes[0].name));
            if (selectedPillow.weight !== null) {
                const weightGroup = document.createElement('div');
                weightGroup.className = 'field-group input-row';
                const weightLabel = document.createElement('label');
                weightLabel.textContent = "وزن الوسادة (غرام)";
                weightLabel.style.flex = "1";
                weightGroup.appendChild(weightLabel);
                const weightInputGroup = document.createElement('div');
                weightInputGroup.className = 'input-number-group';
                const weightMinus = document.createElement('button');
                weightMinus.type = 'button';
                weightMinus.className = 'input-number-btn';
                weightMinus.innerHTML = '&#8722;';
                weightMinus.onclick = function() {
                    let val = parseNumber(prod.details.weight || selectedPillow.weight || 1000);
                    if (val > 500) {
                        val = Math.max(500, val-100);
                        prod.details.weight = val;
                        renderProducts();
                    }
                };
                weightInputGroup.appendChild(weightMinus);
                const weightInput = document.createElement('input');
                weightInput.type = 'number';
                weightInput.min = 500;
                weightInput.max = 3500;
                weightInput.step = 100;
                weightInput.value = prod.details.weight || selectedPillow.weight || 1000;
                weightInput.oninput = function() {
                    let v = parseNumber(this.value);
                    if (v < 500) v = 500;
                    if (v > 3500) v = 3500;
                    prod.details.weight = v;
                };
                weightInputGroup.appendChild(weightInput);
                const weightPlus = document.createElement('button');
                weightPlus.type = 'button';
                weightPlus.className = 'input-number-btn';
                weightPlus.innerHTML = '&#43;';
                weightPlus.onclick = function() {
                    let val = parseNumber(prod.details.weight || selectedPillow.weight || 1000);
                    if (val < 3500) {
                        val = Math.min(3500, val+100);
                        prod.details.weight = val;
                        renderProducts();
                    }
                };
                weightInputGroup.appendChild(weightPlus);
                weightGroup.appendChild(weightInputGroup);
                wrap.appendChild(weightGroup);
            }
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || selectedPillow.price;
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // واتربروف
        else if (prod.type === "واتربروف") {
            // --- وصف ---
            wrap.appendChild(renderDescriptionSection());
            // Measurement quick-select buttons for واتربروف (appear under description)
            (function(){
                const sizes = [
                    {id: 'wp200', label: '200x200', width: 200, length: 200, price: 55000},
                    {id: 'wp180', label: '180x200', width: 180, length: 200, price: 45000},
                    {id: 'wp160', label: '160x200', width: 160, length: 200, price: 45000},
                    {id: 'wp120', label: '120x200', width: 120, length: 200, price: 40000},
                    {id: 'wp100', label: '100x200', width: 100, length: 200, price: 35000},
                    {id: 'wp90',  label: '90x190',  width: 90,  length: 190, price: 35000}
                ];
                const sizesDiv = document.createElement('div');
                sizesDiv.className = 'sizes-container';
                sizes.forEach(s => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'size-select-btn';
                    b.dataset.wpId = s.id;
                    b.textContent = s.label;
                    // visual styling handled by CSS (.size-select-btn and .size-select-active)
                    b.onclick = function(e) {
                        // set defaults on product
                        prod.details.width = s.width;
                        prod.details.length = s.length;
                        prod.details.price = s.price;
                        prod.details.wpId = s.id; // save id for JSON
                        // visually mark selected button via class
                        Array.from(sizesDiv.querySelectorAll('button')).forEach(btn => btn.classList.remove('size-select-active'));
                        this.classList.add('size-select-active');
                        // update computed id (inline)
                        try {
                            if (prod.details && prod.details.wpId) prod.details.id = prod.details.wpId;
                            else {
                                const base = prodIDsList["واتربروف"] || (prod.details && prod.details.id) || prod.id || 'waterproof';
                                const wv = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                                const lv = prod.details && prod.details.length ? parseNumber(prod.details.length) : null;
                                prod.details.id = `${base}${wv?`_${wv}`:''}${lv?`_${lv}`:''}`;
                            }
                        } catch (e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
                        renderProducts();
                        updateTotal();
                    };
                    sizesDiv.appendChild(b);
                });
                // If a size was previously selected, mark it
                if (prod.details && prod.details.wpId) {
                    Array.from(sizesDiv.querySelectorAll('button')).forEach(btn => {
                        if (btn.dataset.wpId === prod.details.wpId) {
                            btn.classList.add('size-select-active');
                        }
                    });
                }
                // append sizesDiv right after description block
                // find the last appended child (description) and insert after it
                // Since renderDescriptionSection appended its own elements to wrap,
                // we simply append sizesDiv now so it appears under the description area
                wrap.appendChild(sizesDiv);
            })();
            // For واتربروف: width and length should not be editable fields per request.
            // We still display the values (from quick-select or defaults) but hide the inputs.
            const sizeRow = document.createElement('div');
            sizeRow.className = 'input-row';
            // الطول (display-only)
            const lengthGroup = document.createElement('div');
            lengthGroup.className = 'field-group';
            const lengthLabel = document.createElement('label');
            lengthLabel.textContent = "الطول";
            lengthGroup.appendChild(lengthLabel);
            const lengthValue = document.createElement('div');
            lengthValue.className = 'dim-value';
            lengthValue.textContent = (prod.details.length || 200) + ' سم';
            lengthGroup.appendChild(lengthValue);
            sizeRow.appendChild(lengthGroup);
            // العرض (display-only)
            const widthGroup = document.createElement('div');
            widthGroup.className = 'field-group';
            const widthLabel = document.createElement('label');
            widthLabel.textContent = "العرض";
            widthGroup.appendChild(widthLabel);
            const widthValue = document.createElement('div');
            widthValue.className = 'dim-value';
            widthValue.textContent = (prod.details.width || 180) + ' سم';
            widthGroup.appendChild(widthValue);
            sizeRow.appendChild(widthGroup);
            wrap.appendChild(sizeRow);
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group input-row';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceLabel.style.flex = "1";
            priceGroup.appendChild(priceLabel);
            const priceInputGroup = document.createElement('div');
            priceInputGroup.className = 'input-number-group';
            const priceMinus = document.createElement('button');
            priceMinus.type = 'button';
            priceMinus.className = 'input-number-btn';
            priceMinus.innerHTML = '&#8722;';
            priceMinus.onclick = function() {
                let val = parseNumber(prod.details.price || 45000);
                if (val > 5000) {
                    val = Math.max(5000, val-5000);
                    prod.details.price = val;
                    renderProducts();
                    updateTotal();
                }
            };
            priceInputGroup.appendChild(priceMinus);
            const priceInput = document.createElement('input');
            priceInput.style.width = '120px';
            priceInput.type = 'number';
            priceInput.min = 5000;
            priceInput.step = 5000;
            priceInput.value = prod.details.price || 45000;
            priceInput.oninput = function() {
                let v = parseNumber(this.value);
                if (v < 5000) v = 5000;
                prod.details.price = v;
                updateTotal();
            };
            priceInputGroup.appendChild(priceInput);
            const pricePlus = document.createElement('button');
            pricePlus.type = 'button';
            pricePlus.className = 'input-number-btn';
            pricePlus.innerHTML = '&#43;';
            pricePlus.onclick = function() {
                let val = parseNumber(prod.details.price || 45000);
                val += 5000;
                prod.details.price = val;
                renderProducts();
                updateTotal();
            };
            priceInputGroup.appendChild(pricePlus);
            priceGroup.appendChild(priceInputGroup);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // لحاف
        else if (prod.type === "لحاف") {
    
            // نوع اللحاف (select predefined duvet types)
            const duvetGroup = document.createElement('div');
            duvetGroup.className = 'field-group';
            const duvetLabel = document.createElement('label');
            duvetLabel.textContent = 'نوع اللحاف';
            duvetGroup.appendChild(duvetLabel);
            const duvetSelect = document.createElement('select');
            duvetTypes.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.name;
                opt.textContent = d.name;
                duvetSelect.appendChild(opt);
            });
            duvetSelect.value = prod.details.duvetType || duvetTypes[0].name;
            duvetSelect.onchange = function() {
                const selected = duvetTypes.find(x => x.name === this.value);
                if (selected) {
                    prod.details.duvetType = selected.name;
                    // populate default values but keep editable
                    prod.details.width = selected.width;
                    prod.details.length = selected.length;
                    prod.details.price = selected.price;
                    // update computed id (inline)
                    try {
                        const dName = prod.details && prod.details.duvetType;
                        const d = duvetTypes.find(x => x.name === dName);
                        const base = (d && d.id) ? d.id : (prodIDsList["لحاف"] || (prod.details && prod.details.id) || prod.id);
                        const wv = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                        const lv = prod.details && prod.details.length ? parseNumber(prod.details.length) : null;
                        prod.details.id = `${base}${wv?`_${wv}`:''}${lv?`_${lv}`:''}`;
                    } catch(e) { prod.details.id = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type); }
                    renderProducts();
                    updateTotal();
                }
            };
            duvetGroup.appendChild(duvetSelect);
            wrap.appendChild(duvetGroup);
            // --- وصف ---
            wrap.appendChild(renderDescriptionSection());
            // الطول والعرض displayed as non-editable texts next to the labels
            const sizeRow = document.createElement('div');
            sizeRow.className = 'input-row';
            // الطول (label + value inline)
            const lengthGroup = document.createElement('div');
            lengthGroup.className = 'field-group duvet-dim';
            const lengthLabel = document.createElement('div');
            lengthLabel.className = 'dim-label';
            lengthLabel.textContent = "الطول";
            lengthGroup.appendChild(lengthLabel);
            const lengthValue = document.createElement('div');
            lengthValue.className = 'dim-value';
            lengthValue.textContent = (prod.details.length || '') + (prod.details.length ? ' سم' : '');
            lengthGroup.appendChild(lengthValue);
            sizeRow.appendChild(lengthGroup);
            // العرض
            const widthGroup = document.createElement('div');
            widthGroup.className = 'field-group duvet-dim';
            const widthLabel = document.createElement('div');
            widthLabel.className = 'dim-label';
            widthLabel.textContent = "العرض";
            widthGroup.appendChild(widthLabel);
            const widthValue = document.createElement('div');
            widthValue.className = 'dim-value';
            widthValue.textContent = (prod.details.width || '') + (prod.details.width ? ' سم' : '');
            widthGroup.appendChild(widthValue);
            sizeRow.appendChild(widthGroup);
            wrap.appendChild(sizeRow);
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || '';
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // طقم (sets)
        else if (prod.type === "طقم") {
            // نوع الطقم (select)
            const setGroup = document.createElement('div');
            setGroup.className = 'field-group';
            const setLabel = document.createElement('label');
            setLabel.textContent = 'نوع الطقم';
            setGroup.appendChild(setLabel);
            const setSelect = document.createElement('select');
            setTypes.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.name;
                opt.textContent = s.name;
                setSelect.appendChild(opt);
            });
            setSelect.value = prod.details.setType || setTypes[0].name;
            setSelect.onchange = function() {
                const sel = setTypes.find(x => x.name === this.value);
                if (sel) {
                    prod.details.setType = sel.name;
                    prod.details.price = sel.price;
                    renderProducts();
                    updateTotal();
                }
            };
            setGroup.appendChild(setSelect);
            wrap.appendChild(setGroup);
            // --- وصف ---
            wrap.appendChild(renderDescriptionSection());
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || (setTypes[0] && setTypes[0].price) || '';
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // أخرى (custom product)
        else if (prod.type === "أخرى") {
            // اسم المنتج
            const nameGroup = document.createElement('div');
            nameGroup.className = 'field-group';
            const nameLabel = document.createElement('label');
            nameLabel.textContent = "اسم المنتج";
            nameGroup.appendChild(nameLabel);
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'اسم المنتج';
            nameInput.value = prod.details.customName || '';
            nameInput.oninput = function() {
                prod.details.customName = this.value;
            };
            nameGroup.appendChild(nameInput);
            wrap.appendChild(nameGroup);
            // --- وصف ---
            wrap.appendChild(renderDescriptionSection());
            // السعر
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || '';
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // بقية المنتجات
        else {
            // Always show description option and price for these types
            wrap.appendChild(renderDescriptionSection());
            const priceGroup = document.createElement('div');
            priceGroup.className = 'field-group';
            const priceLabel = document.createElement('label');
            priceLabel.textContent = "السعر";
            priceGroup.appendChild(priceLabel);
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.min = 0;
            priceInput.step = 1000;
            priceInput.value = prod.details.price || '';
            priceInput.oninput = function() {
                prod.details.price = parseNumber(this.value);
                if (typeof updateProductTotal === 'function') updateProductTotal();
                updateTotal();
            };
            priceGroup.appendChild(priceInput);
            wrap.appendChild(priceGroup);
            // العدد
            wrap.appendChild(renderQuantityField(prod));
        }
        // --- Special Offer Section ---
        const specialOfferDiv = document.createElement('div');
        specialOfferDiv.className = 'field-group';
        // Checkbox
        const offerLabel = document.createElement('label');
        offerLabel.style.display = 'inline-flex';
        offerLabel.style.alignItems = 'center';
        offerLabel.style.cursor = 'pointer';
        const offerCheckbox = document.createElement('input');
        offerCheckbox.type = 'checkbox';
        offerCheckbox.checked = !!prod.details.specialOffer;
        offerCheckbox.style.marginLeft = '6px';
        offerLabel.appendChild(offerCheckbox);
        offerLabel.appendChild(document.createTextNode('عرض خاص'));
        specialOfferDiv.appendChild(offerLabel);
        // Offer options (hidden unless checked)
        const offerOptionsDiv = document.createElement('div');
        offerOptionsDiv.style.marginTop = '8px';
        offerOptionsDiv.style.display = offerCheckbox.checked ? '' : 'none';
        // Radio buttons
        const percentRadio = document.createElement('input');
        percentRadio.type = 'radio';
        percentRadio.name = 'offerType' + prod.id;
        percentRadio.value = 'percent';
        percentRadio.checked = prod.details.offerType === 'percent' || !prod.details.offerType;
        const percentLabel = document.createElement('label');
        percentLabel.style.marginLeft = '10px';
        percentLabel.appendChild(percentRadio);
        percentLabel.appendChild(document.createTextNode('خصم مئوي'));
        // Percent input
        const percentInput = document.createElement('input');
        percentInput.type = 'number';
        percentInput.min = 1;
        percentInput.max = 100;
        percentInput.value = prod.details.offerPercent || 6;
        percentInput.style.width = '60px';
        percentInput.style.marginRight = '6px';
        percentInput.style.display = percentRadio.checked ? '' : 'none';
        // Fixed amount radio
        const fixedRadio = document.createElement('input');
        fixedRadio.type = 'radio';
        fixedRadio.name = 'offerType' + prod.id;
        fixedRadio.value = 'fixed';
        fixedRadio.checked = prod.details.offerType === 'fixed';
        const fixedLabel = document.createElement('label');
        fixedLabel.style.marginLeft = '10px';
        fixedLabel.appendChild(fixedRadio);
        fixedLabel.appendChild(document.createTextNode('خصم مبلغ'));
        // Fixed input
        const fixedInput = document.createElement('input');
        fixedInput.type = 'number';
        fixedInput.min = 0;
        fixedInput.step = 1000;
        fixedInput.value = prod.details.offerFixed || 10000;
        fixedInput.style.width = '80px';
        fixedInput.style.marginRight = '6px';
        fixedInput.style.display = fixedRadio.checked ? '' : 'none';
        // Gift radio
        const giftRadio = document.createElement('input');
        giftRadio.type = 'radio';
        giftRadio.name = 'offerType' + prod.id;
        giftRadio.value = 'gift';
        giftRadio.checked = prod.details.offerType === 'gift';
        const giftLabel = document.createElement('label');
        giftLabel.appendChild(giftRadio);
        giftLabel.appendChild(document.createTextNode('هدية'));
        // Add to options div
        offerOptionsDiv.appendChild(percentLabel);
        offerOptionsDiv.appendChild(percentInput);
        offerOptionsDiv.appendChild(fixedLabel);
        offerOptionsDiv.appendChild(fixedInput);
        offerOptionsDiv.appendChild(giftLabel);
        // Total for product
        const productTotalDiv = document.createElement('div');
        productTotalDiv.style.marginTop = '10px';
        productTotalDiv.style.fontWeight = 'bold';
        // --- Logic for offer ---
        function updateOfferFields() {
            percentInput.style.display = percentRadio.checked ? '' : 'none';
            fixedInput.style.display = fixedRadio.checked ? '' : 'none';
            prod.details.specialOffer = offerCheckbox.checked;
            if (!offerCheckbox.checked) {
                prod.details.offerType = undefined;
                prod.details.offerPercent = undefined;
                prod.details.offerFixed = undefined;
            } else {
                if (percentRadio.checked) {
                    prod.details.offerType = 'percent';
                    prod.details.offerPercent = parseFloat(percentInput.value) || 6;
                } else if (fixedRadio.checked) {
                    prod.details.offerType = 'fixed';
                    prod.details.offerFixed = parseNumber(fixedInput.value) || 10000;
                } else if (giftRadio.checked) {
                    prod.details.offerType = 'gift';
                }
            }
            updateProductTotal();
            updateTotal();
        }
        function updateProductTotal() {
            let qty = parseNumber(prod.details.qty || 1);
            let price = parseNumber(prod.details.price || 0);
            let total = price * qty;
            let label = 'المجموع الكلي للمنتج: ';
            if (offerCheckbox.checked) {
                if (percentRadio.checked) {
                    let percent = parseFloat(percentInput.value) || 6;
                    total = Math.round(total * (1 - percent/100));
                    label += formatNumber(total) + ' د.ع';
                } else if (fixedRadio.checked) {
                    let fixed = parseNumber(fixedInput.value) || 10000;
                    total = Math.max(0, total - fixed);
                    label += formatNumber(total) + ' د.ع';
                } else if (giftRadio.checked) {
                    total = 0;
                    label += 'مجاناً';
                }
            } else {
                label += formatNumber(total) + ' د.ع';
            }
            prod.details._productTotal = total;
            productTotalDiv.textContent = label;
        }
        // Listeners
        offerCheckbox.addEventListener('change', function() {
            offerOptionsDiv.style.display = this.checked ? '' : 'none';
            updateOfferFields();
        });
        percentRadio.addEventListener('change', updateOfferFields);
        fixedRadio.addEventListener('change', updateOfferFields);
        giftRadio.addEventListener('change', updateOfferFields);
        percentInput.addEventListener('input', updateOfferFields);
        fixedInput.addEventListener('input', updateOfferFields);
        // Initial
        updateProductTotal();
        // Add to wrap
        wrap.appendChild(specialOfferDiv);
        wrap.appendChild(offerOptionsDiv);
        wrap.appendChild(productTotalDiv);
        return wrap;
    }
    function renderQuantityField(prod) {
        const qtyGroup = document.createElement('div');
        qtyGroup.className = 'field-group input-row';
        const qtyLabel = document.createElement('label');
        qtyLabel.textContent = "العدد";
        qtyLabel.style.flex = "1";
        qtyGroup.appendChild(qtyLabel);
        const qtyInputGroup = document.createElement('div');
        qtyInputGroup.className = 'input-number-group';
        const qtyMinus = document.createElement('button');
        qtyMinus.type = 'button';
        qtyMinus.className = 'input-number-btn';
        qtyMinus.innerHTML = '&#8722;';
        qtyMinus.onclick = function() {
            let val = parseNumber(prod.details.qty || 1);
            if (val > 1) {
                val--;
                prod.details.qty = val;
                renderProducts();
                updateTotal();
            }
        };
        qtyInputGroup.appendChild(qtyMinus);
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = 1;
        qtyInput.value = prod.details.qty || 1;
        qtyInput.oninput = function() {
            let v = parseNumber(this.value);
            if (v < 1) v = 1;
            prod.details.qty = v;
            updateTotal();
        };
        qtyInputGroup.appendChild(qtyInput);
        const qtyPlus = document.createElement('button');
        qtyPlus.type = 'button';
        qtyPlus.className = 'input-number-btn';
        qtyPlus.innerHTML = '&#43;';
        qtyPlus.onclick = function() {
            let val = parseNumber(prod.details.qty || 1);
            val++;
            prod.details.qty = val;
            renderProducts();
            updateTotal();
        };
        qtyInputGroup.appendChild(qtyPlus);
        qtyGroup.appendChild(qtyInputGroup);
        return qtyGroup;
    }
    // --- Add Product ---
    addProductBtn.onclick = function() {
        products.push({id: productIdCounter++, type: null, details: {}});
        renderProducts();
    };
    // --- Discount UI ---
    document.querySelectorAll('input[name="discountType"]').forEach(radio=>{
        radio.onchange = function() {
            document.getElementById('fixedDiscount').style.display = this.value === 'fixed' ? '' : 'none';
            document.getElementById('percentDiscount').style.display = this.value === 'percent' ? '' : 'none';
            updateTotal();
        };
    });
    document.getElementById('fixedDiscount').oninput = updateTotal;
    document.getElementById('percentDiscount').oninput = updateTotal;
    deliveryCostEl.oninput = updateTotal;
    // --- Delivery Days ---
    function changeDeliveryDays(delta) {
        let v = parseNumber(deliveryDaysEl.value);
        v += delta;
        if (v < 1) v = 1;
        deliveryDaysEl.value = v;
    }
    // --- Total Calculation ---
    function updateTotal() {
        let sum = 0;
        products.forEach(prod=>{
            let prodTotal = (prod.details && typeof prod.details._productTotal === 'number')
                ? prod.details._productTotal
                : (parseNumber(prod.details.price) * parseNumber(prod.details.qty || 1));
            sum += prodTotal;
        });
        let delivery = parseNumber(deliveryCostEl.value);
        sum += delivery;
        // discount
        let discountType = document.querySelector('input[name="discountType"]:checked').value;
        if (discountType === 'fixed') {
            let d = parseNumber(document.getElementById('fixedDiscount').value);
            // Only include contents when at least one item has a declared price
            sum -= d;
        } else if (discountType === 'percent') {
            let d = parseFloat(document.getElementById('percentDiscount').value) || 0;
            sum -= delivery;
            sum -= sum * d / 100;
            sum += delivery;
        }
        if (sum < 0) sum = 0;
        totalAmountEl.textContent = formatNumber(Math.round(sum));
        updateRemainingAmount();
    }

                    // --- مبلغ واصل (Received Amount) Logic ---
    const includeReceivedCheckbox = document.getElementById('includeReceived');
    const receivedFieldsDiv = document.getElementById('receivedFieldsDiv');
    const receivedAmountInput = document.getElementById('receivedAmountInput');
    const remainingAmountValue = document.getElementById('remainingAmountValue');

    if (includeReceivedCheckbox) {
        includeReceivedCheckbox.addEventListener('change', function() {
            receivedFieldsDiv.style.display = this.checked ? '' : 'none';
            if (!this.checked) {
                // receivedAmountInput.value = '';
                // remainingAmountValue.textContent = '0';
            } else {
                updateRemainingAmount();
            }
        });
        receivedAmountInput.addEventListener('input', updateRemainingAmount);
    }

    // Patch updateTotal to also update remaining if checkbox is checked
    const origUpdateTotal = updateTotal;
    updateTotal = function() {
        origUpdateTotal();
        if (includeReceivedCheckbox && includeReceivedCheckbox.checked) updateRemainingAmount();
    };

    function updateRemainingAmount() {
        let total = reverseFormatNumber(totalAmountEl.textContent);
        let received = parseNumber(receivedAmountInput.value);
        let remaining = total - received;
        if (remaining <= 0) {
            remainingAmountValue.textContent = "مدفوع بالكامل ✅";
        }
        else{remainingAmountValue.textContent = formatNumber(remaining);}
    }

        // --- Phone Number Validation & Format ---
let customerPhone = document.getElementById('customerPhone');
const phoneCheckBtn = document.getElementById('phoneCheckBtn');
const phoneCheckIcon = document.getElementById('phoneCheckIcon');
const phoneError = document.getElementById('phoneError');
let phoneLocked = false;
let rawPhoneValue = '';

function formatDisplayPhone(num) {
    // Assumes num is like +964xxxxxxxxxx
    if (!/^\+964\d{10}$/.test(num)) return num;
    return `+964 ${num.slice(4,7)} ${num.slice(7,10)} ${num.slice(10)}`;
}

function validateAndFormatPhone() {
    let raw = customerPhone.value.replace(/\s+/g, '');
    let formatted = '';
    let valid = false;
    // Iraqi mobile prefixes
    const iraqiPrefixes = ['77','78','75','79'];
    // 1. 077/078/075/079 + 11 digits
    if (/^0(77|78|75|79)\d{8}$/.test(raw)) {
        formatted = '+964' + raw.slice(1);
        valid = true;
    }
    // 2. 77/78/75/79 + 10 digits
    else if (/^(77|78|75|79)\d{8}$/.test(raw)) {
        formatted = '+964' + raw;
        valid = true;
    }
    // 3. 96477/96478/96475/96479 + 13 digits
    else if (/^964(77|78|75|79)\d{8}$/.test(raw)) {
        formatted = '+' + raw;
        valid = true;
    }
    // 4. 00964 + 77/78/75/79 + 8 digits (15 digits)
    else if (/^00964(77|78|75|79)\d{8}$/.test(raw)) {
        formatted = '+' + raw.slice(2);
        valid = true;
    }
    // 5. +964 + 77/78/75/79 + 8 digits (14 chars with +)
    else if (/^\+964(77|78|75|79)\d{8}$/.test(raw)) {
        formatted = raw;
        valid = true;
    }
    if (valid) {
        rawPhoneValue = formatted.replace(/\D/g, '').replace(/^964/, '+964'); // store as +964xxxxxxxxxx
        if (!/^\+964\d{10}$/.test(formatted)) {
            // fallback: just use formatted
            rawPhoneValue = formatted.replace(/\s+/g, '');
        }
        // Replace input with text
        const display = formatDisplayPhone(formatted);
        const parent = customerPhone.parentNode;
        const phoneText = document.createElement('span');
        phoneText.id = 'customerPhoneText';
        phoneText.textContent = display;
        phoneText.dir = 'ltr';
        phoneText.style.cssText = customerPhone.style.cssText;
        phoneText.style.display = 'block';
        phoneText.style.textAlign = 'center';
        parent.replaceChild(phoneText, customerPhone);
        phoneLocked = true;
        phoneCheckIcon.textContent = '✏️';
        phoneError.style.display = 'none';
        customerPhone = null;
    } else {
        phoneError.textContent = 'رقم هاتف غير صالح';
        phoneError.style.display = 'block';
    }
}

function attachPhoneInputListeners(input) {
    input.addEventListener('input', function() {
        phoneError.style.display = 'none';
        if (phoneLocked) {
            phoneLocked = false;
            phoneCheckIcon.textContent = '✔️';
        }
    });
}

if (phoneCheckBtn) {
    phoneCheckBtn.addEventListener('click', function() {
        let input = document.getElementById('customerPhone');
        let text = document.getElementById('customerPhoneText');
        if (!phoneLocked && input) {
            customerPhone = input;
            validateAndFormatPhone();
        } else if (phoneLocked && text) {
            const parent = text.parentNode;
            const newInput = document.createElement('input');
            newInput.type = 'tel';
            newInput.id = 'customerPhone';
            newInput.required = true;
            newInput.pattern = '[0-9\-\+\s]{8,20}';
            newInput.inputMode = 'tel';
            newInput.maxLength = 40;
            newInput.placeholder = '   مثال: +9647701234567';
            newInput.style.cssText = 'flex:1;';
            newInput.value = rawPhoneValue.replace('+964','');
            if (/^\+964\d{10}$/.test(rawPhoneValue)) {
                newInput.value = '+964' + rawPhoneValue.slice(4);
            }
            parent.replaceChild(newInput, text);
            phoneLocked = false;
            phoneCheckIcon.textContent = '✔️';
            phoneError.style.display = 'none';
            customerPhone = newInput;
            attachPhoneInputListeners(newInput);
            newInput.focus(); // Focus the input after switching
        }
    });
    // Attach to initial input
    attachPhoneInputListeners(customerPhone);
}

    // --- Delivery Mode Logic: three radio options ---
    const deliveryModeRadios = document.getElementsByName('deliveryMode');
    const deliveryCostDiv = document.getElementById('deliveryCostDiv');
    const deliveryDaysDiv = document.getElementById('deliveryDaysDiv');
    const deliveryNoteDiv = document.getElementById('deliveryNoteDiv');
    let originalDeliveryCost = deliveryCostEl.value;
    let originalDeliveryDays = deliveryDaysEl.value;

    function applyDeliveryMode(mode) {
        if (mode === 'days') {
            // Show cost and days (default behavior)
            deliveryCostEl.value = originalDeliveryCost || '10000';
            deliveryDaysEl.value = originalDeliveryDays || '5';
            deliveryCostDiv.style.display = '';
            deliveryDaysDiv.style.display = '';
            deliveryNoteDiv.style.display = 'none';
            updateTotal();
        } else if (mode === 'note') {
            // Show cost and note textarea (cost editable), hide days
            deliveryCostEl.value = originalDeliveryCost || '10000';
            deliveryCostDiv.style.display = '';
            deliveryDaysDiv.style.display = 'none';
            deliveryNoteDiv.style.display = '';
            updateTotal();
        } else if (mode === 'direct') {
            // Direct preparation: free delivery, hide cost/days/note
            // store originals if not zero
            if (deliveryCostEl.value !== '0') originalDeliveryCost = deliveryCostEl.value;
            if (deliveryDaysEl.value !== '0') originalDeliveryDays = deliveryDaysEl.value;
            deliveryCostEl.value = '0';
            deliveryDaysEl.value = '0';
            deliveryCostDiv.style.display = 'none';
            deliveryDaysDiv.style.display = 'none';
            deliveryNoteDiv.style.display = 'none';
            updateTotal();
        }
    }

    if (deliveryModeRadios && deliveryModeRadios.length) {
        deliveryModeRadios.forEach(r => {
            r.addEventListener('change', function() {
                applyDeliveryMode(this.value);
            });
        });
        // set initial mode based on checked radio
        let initial = Array.from(deliveryModeRadios).find(r => r.checked);
        applyDeliveryMode(initial ? initial.value : 'days');
    }

// --- Governorate Popup Logic ---
const governorates = [
  "البصرة", "كربلاء", "بابل", "ذي قار", "أربيل", "واسط", "بغداد", "النجف", "نينوى", "الأنبار", "صلاح الدين", "ديالى", "القادسية", "المثنى", "ميسان", "السليمانية", "دهوك", "كركوك"
];
const governorateOrder = ["البصرة", "كربلاء", "بابل", "ذي قار", "أربيل", "واسط", "بغداد", "النجف", "نينوى", "الأنبار", "صلاح الدين", "ديالى", "القادسية", "المثنى", "ميسان", "السليمانية", "دهوك", "كركوك"];
arGovToEnCTAndSt = {
    "البصرة": {city: "basra", state: "basra"},
    "كربلاء": {city: "karbala", state: "karbala"},
    "بابل": {city: "hillah", state: "babil"},
    "ذي قار": {city: "dhi qar", state: "nasiriya"},
    "أربيل": {city: "erbil", state: "erbil"},
    "واسط": {city: "kut", state: "wasit"},
    "بغداد": {city: "baghdad", state: "baghdad"},
    "النجف": {city: "najaf", state: "najaf"},
    "نينوى": {city: "mosul", state: "nineveh"},
    "الأنبار": {city: "ramadi", state: "anbar"},
    "صلاح الدين": {city: "tikrit", state: "salah al din"},
    "ديالى": {city: "baqubah", state: "diyala"},
    "القادسية": {city: "diwaniya", state: "qadissiya"},
    "المثنى": {city: "samawah", state: "muthanna"},
    "ميسان": {city: "amarah", state: "maysan"},
    "السليمانية": {city: "sulaymaniyah", state: "sulaymaniyah"},
    "دهوك": {city: "dohuk", state: "dohuk"},
    "كركوك": {city: "kirkuk", state: "kirkuk"}
}

function openGovernoratePopup() {
  const popup = document.getElementById('governoratePopup');
  const list = document.getElementById('governorateList');
  list.innerHTML = '';
  // Show main cities first, then the rest
  governorateOrder.forEach(city => {
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.className = 'governorate-btn';
    btn.style.margin = '4px 0';
    btn.style.padding = '8px 18px';
    btn.style.borderRadius = '6px';
    btn.style.border = '1px solid #ddd';
    btn.style.background = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1.1em';
    btn.onclick = function() {
      document.getElementById('governorate').value = city;
      popup.style.display = 'none';
    };
    list.appendChild(btn);
  });
  popup.style.display = 'block';
}
const closeGovBtn = document.getElementById('closeGovernoratePopup');
if (closeGovBtn) closeGovBtn.onclick = function() {
  document.getElementById('governoratePopup').style.display = 'none';
};
window.onclick = function(event) {
  const popup = document.getElementById('governoratePopup');
  if (event.target === popup) popup.style.display = 'none';
};

// End of Governorate Popup logic Ya habibi

    // --- Page Navigation ---
    continueBtn.onclick = function() {
        page1.style.display = 'none';
        page2.style.display = '';
        window.scrollTo(0,0);
    };
    backBtn.onclick = function() {
        page2.style.display = 'none';
        page1.style.display = '';
        window.scrollTo(0,0);
    };
    // --- Snackbar ---
    function showSnackbar(msg) {
        snackbar.textContent = msg;
        snackbar.className = "snackbar show";
        setTimeout(()=>{snackbar.className="snackbar";}, 1800);
    }
    // --- Submit ---
    let submitClickCount = 0;
    if (submitBtn) {
        submitBtn.onclick = async function() {
            submitClickCount++;
            if (submitClickCount === 1) {
                setTimeout(()=>{submitClickCount=0;}, 1200);
                return;
            }
            // Gather data
            let phoneInput = document.getElementById('customerPhone');
            let phoneText = document.getElementById('customerPhoneText');
            let phoneValue = '';
            if (phoneInput) {
                phoneValue = phoneInput.value.trim();
            } else if (phoneText) {
                // Extract raw phone from formatted text (e.g. +964 770 123 4567 -> +9647701234567)
                phoneValue = phoneText.textContent.replace(/\s+/g, '');
            }
            // Ensure phone is in +964xxxxxxxxxx format
            if (/^\+964\d{10}$/.test(phoneValue)) {
                // already correct
            } else if (/^\+964\d{3}\s?\d{3}\s?\d{4}$/.test(phoneValue)) {
                phoneValue = phoneValue.replace(/\s+/g, '');
            }
            const customer = {
                name: document.getElementById('customerName').value.trim(),
                phone: phoneValue,
                address: document.getElementById('customerAddress').value.trim(),
                motivations: Array.from(document.querySelectorAll('input[name="motivation"]:checked')).map(x=>x.value),
                platform: document.getElementById('platform').value,
                customerType: document.getElementById('customerType').value,
                        motivationDetail: document.getElementById('motivationDetail').value.trim(),
                notes: document.getElementById('notes').value.trim(),
                salesPerson: document.getElementById('salesPerson').value.trim()
            };

            
                    // Gender: read selection (default 'm' = male)
                    let selectedGender = 'm';
                    try {
                        const femaleBtn = document.getElementById('genderFemaleBtn');
                        const maleBtn = document.getElementById('genderMaleBtn');
                        if (femaleBtn && maleBtn) {
                            if (femaleBtn.classList.contains('selected')) selectedGender = 'f';
                            else if (maleBtn.classList.contains('selected')) selectedGender = 'm';
                        }
                    } catch (e) {
                        // keep default
                    }
                    customer.gender = selectedGender;
            // Products
            const productsData = products.map(prod=>{
                let d = {...prod.details};
                d.type = prod.type;
                return d;
            });
            // Build contents array: include only items that have a declared price (non-null/zero)
            // Each entry: { id: <arbitrary product id/name>, quantity: <العدد>, item_price: <price> }
            
            const contents = products.map(prod => {
                const price = parseNumber(prod.details.price);
                const qty = parseNumber(prod.details.qty || 1);
                
                if (!price || !qty) return null; // skip items with no price or zero qty
                // choose an id for the item.
                // For specific product types use the exact id exposed in the product lists at top.
                // - Mattress: use mattressDetailsMap[id] and append "{height}_{width}" (e.g. "mattVol23_180").
                // - Pillow: use pillowTypes[].id
                // - Waterproof: prefer prod.details.wpId (set by quick-select), otherwise generic
                // - Duvet: use duvetTypes[].id
                // - Set: use setTypes[].id
                // Otherwise fall back to the generic mapping in prodIDsList or prod.details.id/prod.id
                let itemId = null;
                try {
                    if (prod.type === "فراش") {
                        const mtName = prod.details && prod.details.mattressType;
                        const cfg = mattressDetailsMap[mtName];
                        const baseId = (cfg && cfg.id) ? cfg.id : (prodIDsList["فراش"] || (prod.details && prod.details.id) || prod.id);
                        const h = prod.details && (prod.details.height || prod.details._mattressHeightChoice) ? parseNumber(prod.details.height || prod.details._mattressHeightChoice) : null;
                        const w = prod.details && prod.details.width ? parseNumber(prod.details.width) : null;
                        if (h && w) itemId = `${baseId}${h}_${w}`;
                        else if (h) itemId = `${baseId}${h}`;
                        else itemId = baseId;
                    } else if (prod.type === "وسادة") {
                        const pName = prod.details && prod.details.pillowType;
                        const p = pillowTypes.find(x => x.name === pName);
                        itemId = (p && p.id) ? p.id : (prodIDsList["وسادة"] || (prod.details && prod.details.id) || prod.id);
                    } else if (prod.type === "واتربروف") {
                        // quick-select buttons set prod.details.wpId
                        itemId = (prod.details && prod.details.wpId) ? prod.details.wpId : (prodIDsList["واتربروف"] || (prod.details && prod.details.id) || prod.id);
                    } else if (prod.type === "لحاف") {
                        const dName = prod.details && prod.details.duvetType;
                        const d = duvetTypes.find(x => x.name === dName);
                        itemId = (d && d.id) ? d.id : (prodIDsList["لحاف"] || (prod.details && prod.details.id) || prod.id);
                    } else if (prod.type === "طقم") {
                        const sName = prod.details && prod.details.setType;
                        const s = setTypes.find(x => x.name === sName);
                        itemId = (s && s.id) ? s.id : (prodIDsList["طقم"] || (prod.details && prod.details.id) || prod.id);
                    } else {
                        itemId = (prod.details && prod.details.id != null) ? prod.details.id : (prodIDsList[prod.type] || prod.id || (prod.details && prod.details.type));
                    }
                } catch (e) {
                    // fallback to existing behavior on any unexpected error
                    itemId = (prod.details && prod.details.id != null) ? prod.details.id : (prod.id != null ? prod.id : prod.details && prod.details.type);
                }

                return { id: itemId, quantity: qty, item_price: Math.round(price / 1420) }; // convert to USD equivalent at 1420 IQD/USD
            }).filter(item => item.item_price); // remove entries with falsy price (0/null)

            console.log('Contents for inventory:', contents);
            // Discount
            let discountType = document.querySelector('input[name="discountType"]:checked').value;
            let discountValue = 0;
            if (discountType === 'fixed') discountValue = parseNumber(document.getElementById('fixedDiscount').value);
            if (discountType === 'percent') discountValue = parseFloat(document.getElementById('percentDiscount').value) || 0;
            // Delivery
            let deliveryCost = parseNumber(deliveryCostEl.value);
            let deliveryDays = parseNumber(deliveryDaysEl.value);
            // Total (parse displayed total into a numeric value; handles Arabic digits and separators)
            let total = reverseFormatNumber(totalAmountEl.textContent) || 0;
            // Pre discount price
            let preDiscount = 0;
            products.forEach(prod=>{
                let price = parseNumber(prod.details.price);
                let qty = parseNumber(prod.details.qty || 1);
                if (price && qty) preDiscount += price * qty;
            });
            preDiscount += parseNumber(deliveryCostEl.value);

            // Determine fn/ln: prefer split inputs if filled, else compute from full name
            const firstInput = document.getElementById('firstName');
            const lastInput = document.getElementById('lastName');
            let fn = '';
            let ln = '';
            if (firstInput && firstInput.value.trim() !== '') fn = firstInput.value.trim();
            if (lastInput && lastInput.value.trim() !== '') ln = lastInput.value.trim();
            if (!fn && !ln) {
                // fallback to splitting full name
                ({ fn, ln } = splitFullName(customer.name || ''));
            } else if (fn && !ln) {
                // try derive ln from full name if missing
                const derived = splitFullName(customer.name || '');
                if (derived.ln) ln = derived.ln;
            } else if (!fn && ln) {
                const derived = splitFullName(customer.name || '');
                if (derived.fn) fn = derived.fn;
            }

            console.log('First name:', fn);
            console.log('last name: ', ln);


            // --- String Format ---
            // helper: produce Arabic ordinal words for product numbering (use words up to 10)
            function arabicOrdinalWord(n) {
                const map = {
                    1: 'الأول',2: 'الثاني',3: 'الثالث',4: 'الرابع',5: 'الخامس',
                    6: 'السادس',7: 'السابع',8: 'الثامن',9: 'التاسع',10: 'العاشر'
                };
                return map[n] || null;
            }

            let str = '________ إيصال الطلب ________';
            str += '\n';
            productsData.forEach((prod, i)=>{
                // unify emoji to cloud
                let emoji = '☁';
                // build display name: prefer specific subtype when available
                let subtype = prod.setType || prod.pillowType || prod.mattressType || prod.duvetType || prod.customName || '';
                let displayName = '';
                if (!subtype) {
                    displayName = prod.type;
                } else {
                    if (prod.mattressType) displayName = `فراش ${subtype}`;
                    displayName = `${subtype}`;
                }
                
                // product label using Arabic words up to 10, else numeric
                const ord = arabicOrdinalWord(i+1);
                const productLabel = ord ? ('المنتج ' + ord) : ('المنتج رقم ' + (i+1));
                str += `${emoji} ${productLabel}: ${displayName}\n`;
                // include description when present
                if (prod.description && prod.description.trim()) {
                    str += `${prod.description.trim()}\n`;
                }
                if (prod.type === "فراش") {
                    // str = str.slice(0, -1);
                    // str += ' '
                    // str += `${prod.mattressType}\n`;
                    str += `القياس: ${prod.length||''} × ${prod.width||''} × ${prod.height||''}\n`;
                    str += `السعر: ${formatNumber(prod.price)}\n`;
                    str += `وزن الأشخاص: ${prod.personWeight||''}\n`;
                    str += `الضمان: ${prod.warranty||''}\n`;
                    str += `العدد: ${prod.qty||1}\n\n`;
                } else if (prod.type === "وسادة") {
                    str = str.replace(`${prod.type}\n`, '');
                    // str += `${prod.pillowType}\n`;
                    if (prod.weight) str += `الوزن: ${prod.weight}\n`;
                    str += `السعر: ${formatNumber(prod.price)}\n`;
                    str += `العدد: ${prod.qty||1}\n\n`;
                } else if (prod.type === "واتربروف") {
                    str += `القياس: ${prod.length||''} × ${prod.width||''}\n`;
                    str += `السعر: ${formatNumber(prod.price)}\n`;
                    str += `العدد: ${prod.qty||1}\n\n`;
                } else if (prod.type === "لحاف") {
                    str += `القياس: ${prod.length||''} × ${prod.width||''}\n`;
                    str += `السعر: ${formatNumber(prod.price)}\n`;
                    str += `العدد: ${prod.qty||1}\n\n`;
                } else {
                    str += `السعر: ${formatNumber(prod.price)}\n`;
                    str += `العدد: ${prod.qty||1}\n\n`;
                }
            });
            // خصم
            if (discountType === 'fixed') {
                str += `الخصم: بقيمة ${formatNumber(discountValue)}\n`;
            } else if (discountType === 'percent') {
                str += `الخصم: مئوي بقيمة ${discountValue}%\n`;
            }
            // } else {
            //     str += `الخصم: لا يوجد\n`;
            // حساب المجموع قبل الخصم
            // }
            str += `كلفة التوصيل: ${formatNumber(deliveryCost)}\n`;
            // deliveryMode can be 'days' | 'note' | 'direct'
            const deliveryModeSelected = (document.querySelector('input[name="deliveryMode"]:checked') || {}).value || 'days';
            const deliveryNoteText = (document.getElementById('deliveryNote') && document.getElementById('deliveryNote').value) ? document.getElementById('deliveryNote').value.trim() : '';
            if (deliveryModeSelected === 'direct') {
                // Direct preparation — show as such instead of a numeric duration
                str += `مدة التوصيل: تجهيز مباشر\n\n`;
            } else if (deliveryModeSelected === 'note') {
                // Use the delivery note text provided by user
                const noteLine = deliveryNoteText ? `التوصيل: ${deliveryNoteText}` : `التوصيل: -`;
                str += `${noteLine}\n\n`;
            } else {
                // Normal days mode
                if (deliveryDays === 1) {
                    str += `مدة التوصيل: يوم واحد\n\n`;
                } else if (deliveryDays === 2) {
                    str += `مدة التوصيل: يومين\n\n`;
                } else {
                    str += `مدة التوصيل: ${deliveryDays} أيام\n\n`;
                }
            }
            if (discountType === 'fixed' | discountType === 'percent') {
                str += `💰 المجموع قبل الخصم: ${formatNumber(preDiscount)}\n`;
                str += `✅ المجموع بعد الخصم: ${formatNumber(total)}\n\n`;
            }
            else {str += `🧾 المجموع: ${formatNumber(total)}\n\n`;}
            
            str += `📌 معلومات الزبون:\n`;
            str += `الاسم: ${customer.name}\n`;
            str += `الرقم: ${customer.phone}\n`;
            str += `العنوان: ${customer.address}\n`;
            str += `فئة الزبون: ${customer.customerType}\n\n`;
            str += `الدافع:\n`;
            customer.motivations.forEach(m=>{str+=m+'\n';});
            str += `\n💭 منصة الحجز: ${customer.platform}\n`;
            if (customer.motivationDetail) str += `الدافع بالتفصيل: ${customer.motivationDetail}\n`;
            if (customer.notes) str += `الملاحظات: ${customer.notes}\n`;
            str += `موظف المبيعات: ${customer.salesPerson}\n`;
            // --- JSON Format ---
            async function sha256Hash(value) {
                const encoder = new TextEncoder();
                const data = encoder.encode(value.toLowerCase().trim()); // normalize input
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                return hashHex;
                }

            let hashedGender = await sha256Hash(selectedGender);
            //let json_

            // Unix timestamp (seconds) for current date/time
            let unixTimestamp = Math.floor(Date.now() / 1000);
            let action_source = "";
            if (customer.platform === "انستغرام" || customer.platform === "فيسبوك" || customer.platform === "واتساب") action_source = "chat";
            else if (customer.platform === "مكالمة") action_source = "phone_call";
            else if (customer.platform === "الموقع الإلكتروني") action_source = "website";
            else if (customer.platform.includes("مباشر")) action_source = "physical_store";
            else action_source = "other";

            // Determine event_name from radio selection (Purchase <-> PT-web3)
            const eventModeRadio = document.querySelector('input[name="eventMode"]:checked');
            const eventNameSelected = eventModeRadio ? eventModeRadio.value : 'Purchase';
            let json = {
                event_name: eventNameSelected,
                event_time: unixTimestamp,
                action_source,
                user_data: {
                    ph: await sha256Hash(customer.phone || ''),
                    fn: [await sha256Hash(fn || '')],
                    ln: [await sha256Hash(ln || '')],
                    ge: [hashedGender],
                    country: [await sha256Hash("iq")], // Assuming all customers are from Iraq
                    ct: [await sha256Hash((arGovToEnCTAndSt[customer.address] || {}).city || '')],
                    st: [await sha256Hash((arGovToEnCTAndSt[customer.address] || {}).state || '')],
                    // external_id: findSelected && findSelected.id ? [await sha256Hash(String(findSelected.id))] : [],
                    // external_id_unhashed: findSelected && findSelected.id ? String(findSelected.id) : '',
                }
                ,custom_data: (function(){
                    // compute USD value as string with 2 decimals
                    const rate = 1420; // IQD per 1 USD (example)
                    const usdStr = (Number.isFinite(total) && rate > 0) ? (total / rate).toFixed(2) : "0.00";
                    return {
                        currency: "USD",
                        value: usdStr,
                        contents,
                    };
                })()
            };

                if (findSelected) {
                    console.log("Selected customer:", findSelected);
                    json.user_data.external_id = [await sha256Hash(String(findSelected.id))]
                } else {console.log("No customer selected from list.")}

            //     if (Array.isArray(contents) && contents.length > 0) {
            //     json.contents = contents;
            // }
            console.log('JSON for Facebook:', json);

            // let json = {
            //     products: productsData,
            //     event_time: unixTimestamp,
            //     fn,
            //     ln,
            //     discountType,
            //     discountValue,
            //     deliveryCost,
            //     hashedGender,
            //     deliveryDays,
            //     total: parseNumber(total),
            //     customer: {
            //         name: customer.name,
            //         phone: customer.phone,
            //         address: customer.address,
            //         motivations: customer.motivations,
            //         platform: customer.platform,
            //         customerType: customer.customerType,
            //         gender: customer.gender,
            //         notes: customer.notes,
            //         salesPerson: customer.salesPerson

            //     }
            // };
            // --- Copy to Clipboard ---
            function fallbackCopyTextToClipboard(text) {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showSnackbar("تم النسخ");
                } catch (err) {
                    showSnackbar("تعذر النسخ");
                }
                document.body.removeChild(textArea);
            }
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(str).then(()=>{
                    showSnackbar("تم النسخ");
                }).catch(()=>{
                    fallbackCopyTextToClipboard(str);
                });
                navigator.clipboard.writeText(JSON.stringify(json)).then(()=>{
                    showSnackbar("تم النسخ");
                }).catch(()=>{
                    fallbackCopyTextToClipboard(JSON.stringify(json));
                });
            } else {
                fallbackCopyTextToClipboard(str);
                fallbackCopyTextToClipboard(JSON.stringify(json));
            }
            // --- Send to backend (worker or proxy) ---
            // Show a confirmation modal to the customer (Arabic, RTL). When the
            // customer confirms we capture their public IP and User-Agent and
            // append them to the payload before sending to the worker's
            // /sales_receipt endpoint. For local testing we also attempt to POST
            // a copy to '/save_order_local' if a local server implements it
            // (optional). This flow is Cloudflare-friendly because it simply
            // posts JSON to the existing worker endpoint.

            function showOrderConfirmationModal(textPreview) {
                return new Promise((resolve, reject) => {
                    // overlay
                    const overlay = document.createElement('div');
                    overlay.style.position = 'fixed';
                    overlay.style.left = '0';
                    overlay.style.top = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.background = 'rgba(0,0,0,0.5)';
                    overlay.style.display = 'flex';
                    overlay.style.alignItems = 'center';
                    overlay.style.justifyContent = 'center';
                    overlay.style.zIndex = '9999';

                    // modal
                    const modal = document.createElement('div');
                    modal.dir = 'rtl';
                    modal.style.background = '#fff';
                    modal.style.padding = '18px';
                    modal.style.borderRadius = '8px';
                    modal.style.width = 'min(920px, 95%)';
                    modal.style.maxHeight = '90%';
                    modal.style.overflow = 'auto';
                    modal.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)';

                            const title = document.createElement('h2');
                            title.textContent = 'تأكيد الطلب';
                            title.style.marginTop = '0';
                            modal.appendChild(title);

                            // modal styles (brand colors, larger product headings)
                            const modalStyle = document.createElement('style');
                            modalStyle.textContent = `
                                .wb-brand { color: #0b78d1; font-family: 'Cairo', Arial, sans-serif; }
                                .modal-recipient { font-weight:700; color: #0a9bd6; margin-bottom:8px; }
                                .product-header { font-weight:700; font-size:1.15em; color:#0b78d1; margin-top:10px; padding-bottom:6px; border-bottom:1px solid #eee; }
                            `;
                            document.head && document.head.appendChild(modalStyle);

                            // Logo at top (modal)
                            const logo = document.createElement('img');
                            logo.src = 'https://i.ibb.co/vxdH8xQ2/Landscape-Dark-Cyan.png';
                            logo.alt = 'Logo';
                            logo.style.maxWidth = '220px';
                            logo.style.display = 'block';
                            logo.style.margin = '0 0 10px 0';
                            modal.insertBefore(logo, title);

                            const instructions = document.createElement('p');
                            instructions.textContent = 'الرجاء مراجعة تفاصيل الطلب أدناه، ثم اضغط "تأكيد وإرسال" للموافقة.';
                            modal.appendChild(instructions);

                            // (logo and recipient are shown on the external confirmation page; not on the in-app modal)

                            const pre = document.createElement('pre');
                            pre.style.whiteSpace = 'pre-wrap';
                            pre.style.fontFamily = 'inherit';
                            // Escape HTML then bold product header lines (lines that begin with the cloud emoji and "المنتج")
                            function escapeHtml(str) {
                                return String(str)
                                    .replace(/&/g, '&amp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/"/g, '&quot;')
                                    .replace(/'/g, '&#039;');
                            }
                            let formatted = escapeHtml(textPreview || '');
                            // Bold lines starting with cloud emoji and the word 'المنتج'
                            // Use RegExp constructor to avoid engine-specific literal parsing issues
                            const headerPattern = '(^|\\n)\\s*(\\u2601\\s*المنتج[^:\\n]*:[^\\n]*)';
                            const headerRegex = new RegExp(headerPattern, 'gm');
                            formatted = formatted.replace(headerRegex, '$1<strong class="product-header">$2</strong>');
                            // Convert newlines to <br>
                            formatted = formatted.replace(/\n/g, '<br>');
                            pre.innerHTML = formatted;

                            // Recipient line showing full customer name (if available)
                            try {
                                const custName = (typeof customer !== 'undefined' && customer && customer.name) ? customer.name : ((document.getElementById('customerName') && document.getElementById('customerName').value) || '');
                                if (custName) {
                                    const recipientLine = document.createElement('div');
                                    // include honorific plus full name
                                    const genderLabel = (typeof customer !== 'undefined' && customer && customer.gender === 'f') ? 'السيدة' : 'السيد';
                                    recipientLine.textContent = `إلى ${genderLabel} ${custName}`;
                                    recipientLine.className = 'modal-recipient';
                                    // insert above the preview
                                    modal.insertBefore(recipientLine, pre);
                                }
                            } catch (e) { /* ignore */ }
                            modal.appendChild(pre);

                    const actions = document.createElement('div');
                    actions.style.display = 'flex';
                    actions.style.justifyContent = 'flex-start';
                    actions.style.gap = '10px';
                    actions.style.marginTop = '12px';

                    const confirmBtn = document.createElement('button');
                    confirmBtn.type = 'button';
                    confirmBtn.textContent = 'تأكيد وإرسال';
                    confirmBtn.className = 'submit-btn';
                    // Make the confirm button wide and attractive
                    confirmBtn.style.padding = '12px 20px';
                    confirmBtn.style.background = 'linear-gradient(90deg,#0b78d1,#0a9bd6)';
                    confirmBtn.style.color = '#fff';
                    confirmBtn.style.border = 'none';
                    confirmBtn.style.borderRadius = '8px';
                    confirmBtn.style.fontSize = '1.05em';
                    confirmBtn.style.minWidth = '260px';
                    confirmBtn.style.cursor = 'pointer';

                    const cancelBtn = document.createElement('button');
                    cancelBtn.type = 'button';
                    cancelBtn.textContent = 'إلغاء';
                    cancelBtn.style.padding = '10px 16px';
                    cancelBtn.style.background = '#f4f4f4';
                    cancelBtn.style.border = '1px solid #ddd';
                    cancelBtn.style.borderRadius = '8px';

                    actions.appendChild(confirmBtn);
                    actions.appendChild(cancelBtn);
                    modal.appendChild(actions);

                    overlay.appendChild(modal);
                    document.body.appendChild(overlay);

                    cancelBtn.onclick = function() {
                        document.body.removeChild(overlay);
                        reject(new Error('cancelled'));
                    };

                    confirmBtn.onclick = function() {
                        confirmBtn.disabled = true;
                        confirmBtn.textContent = 'جاري الإرسال...';
                        // Open a blank popup synchronously so the browser does not
                        // block the tab later when we navigate to the confirmation URL.
                        let popup = null;
                        try {
                            popup = window.open('about:blank', '_blank');
                            // If popup opened, write a small interim page (spinner + message)
                            // so the user doesn't see a completely blank tab while the
                            // server (create_order) is being contacted.
                            try {
                                if (popup && popup.document) {
                                    const interimHtml = `<!doctype html><html lang="ar"><head><meta charset="utf-8"><title>جاري إنشاء الطلب...</title><meta name="viewport" content="width=device-width,initial-scale=1" /><style>html,body{height:100%;}body{font-family: Arial, Helvetica, sans-serif;display:flex;align-items:center;justify-content:center;margin:0;background:#fafafa} .msg{direction:rtl;text-align:center;padding:18px;} .spinner{width:52px;height:52px;border:6px solid #eee;border-top-color:#0b78d1;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 12px}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="msg"><div class="spinner" aria-hidden="true"></div><div style="font-size:1.05em;color:#333">...جاري إنشاء صفحة التأكيد</div></div></body></html>`;
                                    popup.document.open();
                                    popup.document.write(interimHtml);
                                    popup.document.close();
                                    try { popup.focus(); } catch(e){}
                                }
                            } catch (e) {
                                // ignore write failures (e.g., popup blocked or closed)
                            }
                        } catch (e) {
                            popup = null;
                        }
                        resolve({ overlay, confirmBtn, popup });
                    };
                });
            }

            try {
                // Show modal and wait for customer confirmation
                const modalResult = await showOrderConfirmationModal(str);
                // After confirmation: capture public IP (with short timeout) and User-Agent
                // Fetch IP in parallel but with a safety timeout so slow network won't block the UI
                const userAgent = navigator.userAgent || '';
                let clientIP = '';
                const ipPromise = (async () => {
                    try {
                        console.time('ipify-fetch-duration');
                        const ac = new AbortController();
                        const tid = setTimeout(() => ac.abort(), 2000); // 2s timeout
                        const ipRes = await fetch('https://api.ipify.org?format=json', { signal: ac.signal });
                        clearTimeout(tid);
                        if (ipRes && ipRes.ok) {
                            const ipJson = await ipRes.json().catch(()=>null);
                            console.timeEnd('ipify-fetch-duration');
                            console.log('ipify result', ipJson);
                            return (ipJson && ipJson.ip) ? ipJson.ip : '';
                        }
                        console.timeEnd('ipify-fetch-duration');
                    } catch (e) {
                        console.timeEnd('ipify-fetch-duration');
                        console.warn('ipify fetch error or timeout', e && e.name ? e.name : e);
                    }
                    return '';
                })();

                // Append metadata to payload (unhashed) and hashed versions to user_data
                // json.metadata = json.metadata || {};
                // json.metadata.client_ip = clientIP;
                // json.metadata.user_agent = userAgent;

                // Optionally include hashed IP in user_data for dataset matching
                try {
                    if (!json.user_data) json.user_data = {};
                    if (clientIP) json.user_data.client_ip_address = clientIP;
                    if (userAgent) json.user_data.client_user_agent = userAgent;
                } catch (e) {
                    console.warn('Failed to hash client data', e);
                }

                // Create an order confirmation URL so the customer can confirm
                // on orders.whitebedding.net. If create_order fails we fall back
                // to immediately posting to /sales_receipt (legacy behavior).
                let createdConfirmURL = null;
                try {
                    // Use AbortController to bound create_order latency so UI isn't stuck forever
                    const ac = new AbortController();
                    const timeoutMs = 8000; // 8 seconds
                    const tid = setTimeout(() => ac.abort(), timeoutMs);
                    console.time('create_order-duration');
                    const createResp = await fetch(API_BASE_URL + '/create_order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ json, preview: str, ts: Date.now() }),
                        signal: ac.signal
                    });
                    clearTimeout(tid);
                    console.timeEnd('create_order-duration');
                    const createJ = await createResp.json().catch(()=>null);
                    if (createResp.ok && createJ && createJ.confirmURL) {
                        createdConfirmURL = createJ.confirmURL;
                        // Log the URL for operator debugging
                        console.log('Confirmation URL:', createdConfirmURL);
                        // If we opened a popup from the click handler, navigate it now
                        if (modalResult && modalResult.popup) {
                            try {
                                modalResult.popup.location = createdConfirmURL;
                                modalResult.popup.focus();
                            } catch (e) {
                                // Failed to set popup location (rare) - fallback to open
                                try { window.open(createdConfirmURL, '_blank'); } catch (e2) { /* ignore */ }
                            }
                        } else {
                            // No popup reference (browser blocked or unavailable) - try opening normally
                            try { window.open(createdConfirmURL, '_blank'); } catch(e) { /* ignore */ }
                        }

                        // Attempt to copy confirmation link to clipboard and notify operator
                        let copied = false;
                        if (navigator.clipboard && window.isSecureContext) {
                            try {
                                await navigator.clipboard.writeText(createdConfirmURL);
                                copied = true;
                                showSnackbar('تم إنشاء رابط التأكيد ونسخه');
                            } catch (e) {
                                // clipboard write failed
                                console.warn('clipboard write failed', e);
                            }
                        }
                        if (!copied) {
                            // Fallback copy (may also be blocked, but try)
                            try { fallbackCopyTextToClipboard(createdConfirmURL); showSnackbar('تم إنشاء رابط التأكيد'); } catch(e) { /* ignore */ }
                        }
                    } else {
                        console.warn('create_order did not return confirmURL, falling back', createJ);
                    }
                } catch (e) {
                    if (e && e.name === 'AbortError') console.warn('create_order aborted due to timeout');
                    else console.error('create_order error, falling back to sales_receipt', e);
                }
                // Ensure we don't wait indefinitely for IP; pick the ipPromise result if available
                try { clientIP = await Promise.race([ipPromise, Promise.resolve('')]); } catch(e) { clientIP = ''; }

                // If create_order failed to produce a confirm URL, fall back to
                // sending the sales_receipt immediately so data isn't lost.
                if (!createdConfirmURL) {
                    try {
                        console.log('No confirmURL - falling back to /sales_receipt');
                        console.time('sales_receipt-duration');
                        const resp = await fetch(API_BASE_URL + '/sales_receipt', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(json)
                        });
                        console.timeEnd('sales_receipt-duration');
                        try { const j = await resp.json().catch(()=>null); console.log('sales_receipt response', j); } catch (e) {}
                    } catch (e) {
                        console.error('sales_receipt fetch error', e);
                        showSnackbar('فشل إرسال الطلب (يرجى المحاولة لاحقاً)');
                    }
                }

                // Also attempt to save a local copy by POSTing to /save_order_local
                // This endpoint is optional and only useful if you run a local server
                // that writes to disk (e.g., a Flask dev proxy). Include confirmURL
                // if we received one.
                try {
                    await fetch(API_BASE_URL + '/save_order_local', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ json, preview: str, confirmURL: createdConfirmURL, ts: Date.now() })
                    }).catch(()=>{});
                } catch (e) {}

                // Close modal and show confirmation to operator
                try { document.body.removeChild(modalResult.overlay); } catch(e){}
                showSnackbar('تم تأكيد الطلب وإرساله');
            } catch (e) {
                // user cancelled or an error occurred
                if (e && e.message !== 'cancelled') console.error('Order confirmation error', e);
            }
            submitClickCount = 0;
        };
    }
    // --- Initial Render ---
    renderProducts();
    updateTotal();

    // --- Name split utility and wiring ---
    // Keeps track if user manually edited the split fields so we don't overwrite their edits
    let manualFirst = false;
    let manualLast = false;

    function splitFullName(fullName) {
        if (typeof fullName !== 'string') return { fn: '', ln: '' };
        const normalized = fullName.trim().replace(/\s+/g, ' ');
        if (normalized === '') return { fn: '', ln: '' };
        const parts = normalized.split(' ');
        if (parts.length === 1) return { fn: parts[0], ln: '' };
        // Heuristic: everything except last token is first name, last token is family name
        const fn = parts.slice(0, parts.length - 1).join(' ');
        const ln = parts[parts.length - 1];
        return { fn, ln };
    }

    function updateSplitFromFullName() {
        const nameInput = document.getElementById('customerName');
        const firstInput = document.getElementById('firstName');
        const lastInput = document.getElementById('lastName');
        if (!nameInput) return;
        const { fn, ln } = splitFullName(nameInput.value || '');
        if (firstInput && !manualFirst) firstInput.value = fn;
        if (lastInput && !manualLast) lastInput.value = ln;
    }

    // Wire inputs if present
    const nameInputRef = document.getElementById('customerName');
    const firstNameRef = document.getElementById('firstName');
    const lastNameRef = document.getElementById('lastName');
    if (nameInputRef) {
        nameInputRef.addEventListener('input', updateSplitFromFullName);
    }
    if (firstNameRef) {
        firstNameRef.addEventListener('input', function() { manualFirst = true; });
    }
    if (lastNameRef) {
        lastNameRef.addEventListener('input', function() { manualLast = true; });
    }

// --- Find Customer UI Logic ---
// Test data (replace with API calls later)
// API base URL: in production we'll point the client at the Cloudflare Worker
// that hosts the invoice form and API. Change this to your worker's domain.
// For local development (wrangler dev) the code will still hit 127.0.0.1:8787
// when the page is served from localhost.
const API_BASE_URL = (function(){
    try {
        const host = location.hostname;
        if (host === '127.0.0.1' || host === 'localhost') return 'http://127.0.0.1:8787';
    } catch(e) {}
    // Production: point to the invoice form worker domain
    // return 'https://invoice-form3425.whitebedding.net';
    return "https://invoice-form-worker.alfirashulabyadh-af4.workers.dev";
})();
const customersData = {
    messenger: [
        {name: 'أحمد علي', id: 'm1'}, {name: 'سارة محمد', id: 'm2'},
        {name: 'خالد يوسف', id: 'm3'}, {name: 'منى حسن', id: 'm4'}
    ],
    instagram: [
        {name: 'reem_ig', id: 'i1'}, {name: 'osama_ig', id: 'i2'},
        {name: 'dina_ig', id: 'i3'}, {name: 'fadi_ig', id: 'i4'}
    ]
};

let findCurrentPlatform = null;
let findRange = 0; // 0 => items 0-1, 1 => items 2-3
let findSelected = null;

const btnMessenger = document.getElementById('btn-messenger');
const btnInstagram = document.getElementById('btn-instagram');
const btnOther = document.getElementById('btn-other');
const customerListBox = document.getElementById('customer-list-box');
const customerNamesDiv = document.getElementById('customer-names');
const btnNext = document.getElementById('btn-next');
const selectedCustomerBox = document.getElementById('selected-customer-box');

function showLoading() {
    customerNamesDiv.innerHTML = '<span style="opacity:0.7">جاري التحميل...</span>';
}

function fetchAndRenderCustomers() {
    if (!findCurrentPlatform) return;
    showLoading();
    // real fetch via local proxy endpoints
    const rangeParam = findRange === 1 ? 'next' : 'first';
    if (findCurrentPlatform === 'instagram') {
        fetch(API_BASE_URL + `/api/ig?range=${rangeParam}`)
            .then(r => r.json())
            .then(j => {
                if (j && j.success && Array.isArray(j.data)) {
                    const slice = j.data.map(x=>({ name: x.texter_name || x.texterName || '—', id: x.texter_id||x.texterId||null }));
                    renderCustomerSlice(slice);
                } else {
                    // fallback to test data
                    const list = customersData.instagram || [];
                    renderCustomerSlice(list.slice(findRange*2, findRange*2+2));
                }
            }).catch(e=>{
                const list = customersData.instagram || [];
                renderCustomerSlice(list.slice(findRange*2, findRange*2+2));
            });
    } else if (findCurrentPlatform === 'messenger') {
        fetch(API_BASE_URL + `/api/fb?range=${rangeParam}`)
            .then(r => r.json())
            .then(j => {
                if (j && j.success && Array.isArray(j.data)) {
                    const slice = j.data.map(x=>({ name: x.texter_name || x.texterName || x.name || '—', id: x.texter_id||x.texterId||x.texterId||null }));
                    renderCustomerSlice(slice);
                } else {
                    const list = customersData.messenger || [];
                    renderCustomerSlice(list.slice(findRange*2, findRange*2+2));
                }
            }).catch(e=>{
                const list = customersData.messenger || [];
                renderCustomerSlice(list.slice(findRange*2, findRange*2+2));
            });
    } else {
        // fallback to local test data
        setTimeout(() => {
            const list = customersData[findCurrentPlatform] || [];
            const start = findRange * 2;
            const slice = list.slice(start, start + 2);
            renderCustomerSlice(slice);
        }, 200);
    }
}

function renderCustomerSlice(slice) {
    customerNamesDiv.innerHTML = '';
    if (!slice.length) {
        customerNamesDiv.innerHTML = '<span style="color:#666">لا يوجد زبائن</span>';
    }
    slice.forEach(c => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'customer-name-btn' + (findSelected && findSelected.id === c.id ? ' selected' : '');
        b.textContent = c.name;
        b.onclick = () => selectCustomer(c);
        customerNamesDiv.appendChild(b);
    });
    // Update single nav button: show ➡️ when can go forward, ⬅️ when on second page
    const total = (customersData[findCurrentPlatform] || []).length;
    if (findRange === 0 && total > 2) {
        btnNext.style.display = '';
        btnNext.textContent = '⬅️';
    } else if (findRange === 1) {
        btnNext.style.display = '';
        btnNext.textContent = '➡️';
    } else {
        btnNext.style.display = 'none';
    }
}

function showCustomerBox(platform) {
    findCurrentPlatform = platform;
    findRange = 0;
    findSelected = null;
    selectedCustomerBox.style.display = 'none';
    customerListBox.style.display = '';
    fetchAndRenderCustomers();
}

function hideCustomerBoxAndClearSelection() {
    findCurrentPlatform = null;
    findRange = 0;
    findSelected = null;
    customerListBox.style.display = 'none';
    selectedCustomerBox.style.display = 'none';
}

function selectCustomer(c) {
    findSelected = c;
    // highlight buttons
    Array.from(customerNamesDiv.children).forEach(btn => {
        btn.classList.toggle('selected', btn.textContent === c.name);
    });
    // show small id box
    selectedCustomerBox.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'small-id-box';
    box.innerHTML = `<span>${c.name} (ID: ${c.id})</span>`;
    const rem = document.createElement('button');
    rem.className = 'remove-customer';
    rem.title = 'إلغاء الاختيار';
    rem.innerHTML = '&times;';
    rem.onclick = () => {
        findSelected = null;
        selectedCustomerBox.style.display = 'none';
        // remove highlight
        Array.from(customerNamesDiv.children).forEach(btn => btn.classList.remove('selected'));
    };
    box.appendChild(rem);
    selectedCustomerBox.appendChild(box);
    selectedCustomerBox.style.display = '';
    // optionally populate customer fields
    // const nameInput = document.getElementById('customerName');
    // if (nameInput) nameInput.value = c.name;
}

// wire buttons
if (btnMessenger) btnMessenger.addEventListener('click', () => showCustomerBox('messenger'));
if (btnInstagram) btnInstagram.addEventListener('click', () => showCustomerBox('instagram'));
if (btnOther) btnOther.addEventListener('click', hideCustomerBoxAndClearSelection);
if (btnNext) btnNext.addEventListener('click', () => {
    // toggle range
    if (findRange === 0) findRange = 1;
    else findRange = 0;
    fetchAndRenderCustomers();
});

// Gender selector wiring
const genderFemaleBtn = document.getElementById('genderFemaleBtn');
const genderMaleBtn = document.getElementById('genderMaleBtn');
if (genderFemaleBtn && genderMaleBtn) {
    // Ensure default: male selected
    genderMaleBtn.classList.add('selected');
    genderFemaleBtn.addEventListener('click', () => {
        genderFemaleBtn.classList.add('selected');
        genderMaleBtn.classList.remove('selected');
    });
    genderMaleBtn.addEventListener('click', () => {
        genderMaleBtn.classList.add('selected');
        genderFemaleBtn.classList.remove('selected');
    });
}

// end find-customer logic

    // --- Order ID Generation Logic ---
            // This function fetches the current counter from the backend, updates it, and returns the orderID string
            async function generateOrderID() {
                // Get today's date in YYYYMMDD
                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const dateStr = `${yyyy}${mm}${dd}`;
                // Call backend to get and update the counter
                // The backend should handle reading, incrementing, and resetting the counter as needed
                try {
                    const resp = await fetch(API_BASE_URL + '/get_order_id', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ date: dateStr })
                    });
                    if (!resp.ok) throw new Error('Failed to get order ID');
                    const data = await resp.json();
                    // data.orderID should be the string like '2025041803'
                    return data.orderID;
                } catch (e) {
                    console.error('OrderID generation failed:', e);
                    return dateStr + '00'; // fallback
                }
            }
            // Usage: (inside async function)
            // let orderID = await generateOrderID();
            // Save orderID in your JSON or string as needed
            // Example:
            // let orderID = await generateOrderID();
            // json.orderID = orderID;
            // str += `رقم الطلب: ${orderID}\n`;

            (async function() {
                let orderID = await generateOrderID();
                console.log('Test orderID:', orderID);
            })();


