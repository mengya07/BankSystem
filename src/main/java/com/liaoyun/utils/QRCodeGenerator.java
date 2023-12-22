package com.liaoyun.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.util.HashMap;
import java.util.Map;

public class QRCodeGenerator {

    public static String generateQRCode(String data, int width, int height) {
        try {
            // 设置二维码的参数
            Map<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.Q);
            hints.put(EncodeHintType.MARGIN, 0);

            // 使用ZXing生成二维码
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix bitMatrix = writer.encode(data, BarcodeFormat.QR_CODE, width, height, hints);

            // 将BitMatrix转换为文本数据
            StringBuilder qrCodeText = new StringBuilder();
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    qrCodeText.append(bitMatrix.get(x, y) ? "1" : "0");
                }
            }

            return qrCodeText.toString();
        } catch (WriterException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        // 示例：生成包含文本数据 "Hello, QR Code!" 的二维码
        String qrCodeText = generateQRCode("Hello, QR Code!", 200, 200);
        System.out.println(qrCodeText);
    }
}
