// Calculadora interactiva (vanilla JS)
(function(){
  const $ = sel => document.querySelector(sel);
  const nf = new Intl.NumberFormat('es-DO', { style:'currency', currency:'DOP', maximumFractionDigits:2 });

  const montoRange = $('#montoRange');
  const montoInput = $('#montoInput');
  const plazoRange = $('#plazoRange');
  const plazoInput = $('#plazoInput');
  const tasaInput = $('#tasaInput');

  const cuotaVal = $('#kpiCuota');
  const totalVal = $('#kpiTotal');
  const interesVal = $('#kpiInteres');
  const tbody = $('#amortBody');
  const toggleBtn = $('#toggleAmort');
  const amortWrap = $('#amortWrap');

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const getValues = () => {
    const monto = Number(montoInput.value)||0;
    const n = Number(plazoInput.value)||1;
    const tasaAnual = Number(tasaInput.value)||0; // % anual
    const r = (tasaAnual/100)/12; // mensual
    return {monto, n, r};
  };

  const PMT = (P,r,n) => {
    if (r<=0) return P/Math.max(n,1);
    return P * r / (1 - Math.pow(1+r, -n));
  };

  const calc = () => {
    const {monto,n,r} = getValues();
    const pmt = PMT(monto,r,n);
    const total = pmt*n;
    const interes = total - monto;
    cuotaVal.textContent = nf.format(pmt);
    totalVal.textContent = nf.format(total);
    interesVal.textContent = nf.format(interes);

    // Tabla de amortización (primeras 3 y últimas 3 filas)
    tbody.innerHTML = '';
    let saldo = monto;
    for(let k=1;k<=n;k++){
      const interesK = saldo*r;
      const capitalK = pmt - interesK;
      const nuevoSaldo = Math.max(saldo - capitalK, 0);
      if (k<=3 || k>n-3) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>#${k}</td>
          <td>${nf.format(pmt)}</td>
          <td>${nf.format(capitalK)}</td>
          <td>${nf.format(interesK)}</td>
          <td>${nf.format(nuevoSaldo)}</td>`;
        tbody.appendChild(tr);
      } else if (k===4) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" style="text-align:center;color:#5b6b73">…</td>`;
        tbody.appendChild(tr);
      }
      saldo = nuevoSaldo;
    }
  };

  const sync = (range,input,min,max,step=1) => {
    range.addEventListener('input',()=>{ input.value = range.value; calc();});
    input.addEventListener('input',()=>{
      let v = Number(input.value||0);
      v = clamp(v, min, max);
      v = Math.round(v/step)*step;
      input.value = v;
      range.value = v;
      calc();
    });
  };

  // URL params support
  const params = new URLSearchParams(location.search);
  if (params.has('monto')) montoInput.value = params.get('monto');
  if (params.has('plazo')) plazoInput.value = params.get('plazo');
  if (params.has('tasa'))  tasaInput.value  = params.get('tasa');

  if (!montoInput.value) montoInput.value = 100000;
  if (!plazoInput.value) plazoInput.value = 24;
  if (!tasaInput.value)  tasaInput.value  = 12;

  // Ranges
  montoRange.min = 50000; montoRange.max = 1000000; montoRange.step = 5000; montoRange.value = montoInput.value;
  plazoRange.min = 6; plazoRange.max = 84; plazoRange.step = 6; plazoRange.value = plazoInput.value;

  // Wire
  sync(montoRange, montoInput, 50000, 1000000, 1000);
  sync(plazoRange, plazoInput, 6, 84, 1);
  tasaInput.addEventListener('input', calc);

  // Toggle tabla
  toggleBtn.addEventListener('click', ()=>{
    const hidden = amortWrap.getAttribute('data-open') !== '1';
    amortWrap.setAttribute('data-open', hidden ? '1' : '0');
    document.getElementById('amortTable').style.display = hidden ? 'table' : 'none';
    toggleBtn.textContent = hidden ? 'Ocultar tabla' : 'Ver tabla';
  });

  calc();
})();
