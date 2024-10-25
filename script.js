let wordList = [];

// JSONデータを、読み込む
fetch('word_list.json')
    .then(response => response.json())  // JSONに変換
    .then(data => {
        wordList = data["語彙リスト"];
    })
    .catch(error => console.error('Error loading JSON:', error));

function search() {
    const searchField = document.getElementById("search-field").value;
    const searchType = document.getElementById("search-type").value;
    const order = document.getElementById("order").value;
    const searchInput = document.getElementById("search-input").value.toLowerCase();

    let results = wordList.filter(item => {
        // `fieldValue`が未定義またはnullの場合は空文字に
        const fieldValue = item[searchField] ? item[searchField] : "";

        // `fieldValue`が文字列型の場合のみ小文字に変換
        const normalizedFieldValue = typeof fieldValue === "string" ? fieldValue.toLowerCase() : "";

        switch (searchType) {
            case "前方":
                return normalizedFieldValue.startsWith(searchInput);
            case "後方":
                return normalizedFieldValue.endsWith(searchInput);
            case "部分":
                return normalizedFieldValue.includes(searchInput);
            case "完全":
                return normalizedFieldValue === searchInput;
            case "正規":
                try {
                    const regex = new RegExp(searchInput, "i");
                    return regex.test(normalizedFieldValue);
                } catch (e) {
                    console.error("正規表現エラー:", e);
                    return false;
                }
            default:
                return false;
        }
    });

    // 結果の表示
    displayResults(results);
}


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
        resultItem.classList.add("result-item");

        resultItem.innerHTML = `
            <strong>番号:</strong> ${item["番号"]} <br>
            <strong>語根:</strong> ${item["語根"]} <br>
            <strong>品詞:</strong> ${item["品詞"]} <br>
            <strong>クラス:</strong> ${item["クラス"]} <br>
            <strong>単語:</strong> ${item["単語"]} <br>
            <strong>文字:</strong> <span class="character">${item["文字"]}</span> <br>
            <strong>発音:</strong> ${item["発音"]} <br>
            <strong>訳語:</strong> ${item["訳語"] || "-"} <br>
            <strong>注釈:</strong> ${item["注釈"] || "-"} <br>
        `;
        resultsDiv.appendChild(resultItem);
    });
}
