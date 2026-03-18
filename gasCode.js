// Google Apps Script - Webアプリとしてデプロイしてください
// デプロイ → 新しいデプロイ → 種類: ウェブアプリ → アクセス: 全員（匿名を含む）

const SPREADSHEET_ID = '18Gw7OkEHVQ2YFFAv-5pc8cWWiFeBrZZ3Onk-dbXQ1WM';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // リクエストの内容をログに記録
    Logger.log('受信したリクエスト: ' + JSON.stringify(e));
    
    const data = JSON.parse(e.postData.contents);
    
    // 受信したデータをログに記録
    Logger.log('パースしたデータ: ' + JSON.stringify(data));
    Logger.log('卒業予定年: ' + data.graduation);
    
    // ヘッダーが存在しない場合は作成
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '送信日時',
        'LINE UserID',
        'LINE表示名',
        '氏名',
        'メールアドレス',
        '電話番号',
        '大学名',
        '卒業予定年',
        '希望勤務地',
        'MBTIタイプ',
        '診断結果タイプ',
        'Q1回答',
        'Q2回答',
        'Q3回答',
        'Q4回答',
        'Q5回答',
        'Q6回答',
        'Q7回答',
        'Q8回答',
        'Q9回答',
        'タイムスタンプ'
      ]);
    }
    
    // データ行を追加
    const rowData = [
      new Date(),
      data.lineUserId || '',
      data.lineDisplayName || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.university || '',
      data.graduation || '',
      data.location || '',
      data.mbtiType || '',
      data.resultType || '',
      data.q1 || '',
      data.q2 || '',
      data.q3 || '',
      data.q4 || '',
      data.q5 || '',
      data.q6 || '',
      data.q7 || '',
      data.q8 || '',
      data.q9 || '',
      data.timestamp || new Date().toISOString()
    ];
    
    Logger.log('保存する行データ: ' + JSON.stringify(rowData));
    
    sheet.appendRow(rowData);
    
    Logger.log('データ保存成功');
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'データが保存されました'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('エラー発生: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用関数（Apps Scriptエディタから実行可能）
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        lineUserId: 'test-user-id',
        lineDisplayName: 'テストユーザー',
        name: '山田太郎',
        email: 'test@example.com',
        phone: '090-1234-5678',
        university: 'テスト大学',
        graduation: '2025年3月',
        location: '東京都',
        mbtiType: 'INTJ',
        resultType: 'strategist',
        q1: 'leader',
        q2: 'leader',
        q3: 'leader',
        q4: 'creator',
        q5: 'analyst',
        q6: 'supporter',
        q7: 'leader',
        q8: 'analyst',
        q9: 'leader',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
