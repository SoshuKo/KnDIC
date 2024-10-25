let wordList = [];

// JSONデータを読み込む
fetch('クニューン語_造語機_02.json')
    .then(response => response.json())  // JSONに変換
    .then(data => {
        wordList = data["語彙リスト のコピー"];  // 必要な配列部分を抽出
    })
    .catch(error => console.error('Error loading JSON:', error));

// 検索機能
function search() {
    const searchField = document.getElementById("search-field").value;
    const searchType = document.getElementById("search-type").value;
    const order = document.getElementById("order").value;
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    
    let results = wordList.filter(item => {
        const fieldValue = item[searchField] ? item[searchField].toLowerCase() : "";

        switch (searchType) {
            case "前方":
                return fieldValue.startsWith(searchInput);
            case "後方":
                return fieldValue.endsWith(searchInput);
            case "部分":
                return fieldValue.includes(searchInput);
            case "完全":
                return fieldValue === searchInput;
            case "正規":
                try {
                    const regex = new RegExp(searchInput, "i");
                    return regex.test(fieldValue);
                } catch (e) {
                    return false;
                }
            default:
                return false;
        }
    });

    // ソート
    results.sort((a, b) => {
        const aValue = a["番号"];
        const bValue = b["番号"];
        return order === "asc" ? aValue - bValue : bValue - aValue;
    });

    displayResults(results);
}

// 結果表示
function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    results.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.textContent = `${item["単語"]}: ${item["訳語"]}`;
        resultsDiv.appendChild(resultItem);
    });
}
