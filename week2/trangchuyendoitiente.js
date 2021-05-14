function changemoney() {
    let $nhapvao = document.getElementById("nhapvao").value;
    let $tiente = document.getElementById("tiente").value;
    let $tiente1 = document.getElementById("tiente1").value;
    let result = ($nhapvao * $tiente1) / $tiente;
    document.getElementById("show").innerHTML=result
}


