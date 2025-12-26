package com.movie.movietheater.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendBookingSuccessMail(
            String to,
            String customerName,
            String bookingCode,
            String movieName,
            Date showTime,
            String totalPrice
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("🎬 Xác nhận đặt vé phim thành công");

            String html = buildHtmlTemplate(
                    customerName,
                    bookingCode,
                    movieName,
                    showTime,
                    totalPrice
            );

            helper.setText(html, true);

            mailSender.send(message);
        } catch (Exception e) {
            // log lại để debug
            e.printStackTrace();
        }
    }

    private String buildHtmlTemplate(
            String customerName,
            String bookingCode,
            String movieName,
            Date showTime,
            String totalPrice
    ) {
        return """
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Xác nhận đặt vé</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial">
        <table width="100%%">
            <tr>
                <td align="center" style="padding:30px 0">
                    <table width="600" style="background:#fff;border-radius:8px;overflow:hidden">

                        <tr>
                            <td style="background:#111827;color:#fff;padding:20px;text-align:center">
                                <h1 style="margin:0">🎬 MOVIE THEATER</h1>
                                <p style="margin:5px 0 0">Xác nhận đặt vé thành công</p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:25px;color:#333">
                                <h2>Xin chào %s,</h2>
                                <p>Đơn đặt vé của bạn đã được
                                   <b style="color:green">xác nhận thành công</b> 🎉</p>

                                <table width="100%%" cellpadding="8" cellspacing="0">
                                    <tr style="background:#f3f4f6">
                                        <td><b>Mã đặt vé</b></td>
                                        <td>%s</td>
                                    </tr>
                                    <tr>
                                        <td><b>Tên phim</b></td>
                                        <td>%s</td>
                                    </tr>
                                    <tr style="background:#f3f4f6">
                                        <td><b>Suất chiếu</b></td>
                                        <td>%s</td>
                                    </tr>
                                    <tr>
                                        <td><b>Tổng tiền</b></td>
                                        <td style="color:#dc2626"><b>%s</b></td>
                                    </tr>
                                </table>

                                <p style="margin-top:20px">
                                    ⏰ Vui lòng đến trước giờ chiếu <b>15 phút</b>.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="background:#f9fafb;padding:15px;
                            text-align:center;font-size:12px;color:#6b7280">
                                <p>Movie Theater System</p>
                                <p>Email tự động – vui lòng không trả lời</p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
        </body>
        </html>
        """.formatted(
                customerName,
                bookingCode,
                movieName,
                showTime,
                totalPrice
        );
    }
}
