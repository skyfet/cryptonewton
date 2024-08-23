import 'package:cryptonewton/components/color_picker_dialog.dart';

import 'package:cryptonewton/screens/util/string_snackbar_extension.dart';
import 'package:cryptonewton/widgets/list_button.dart';
import 'package:flutter/material.dart';
import 'package:telegram_web_app/telegram_web_app.dart';

// ignore_for_file: use_build_context_synchronously
class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final TelegramWebApp telegram = TelegramWebApp.instance;

  bool? isDefinedVersion;
  String? clipboardText;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: telegram.backgroundColor,
      body: ListView(
        padding: const EdgeInsets.all(8),
        children: [
          // ListButton('Expand', onPress: telegram.expand),
          // InfoExpandableTile(
          //   'Init Data',
          //   telegram.initData.toString(),
          // ),
          // InfoExpandableTile(
          //   'Init Data Unsafe',
          //   telegram.initDataUnsafe?.toReadableString() ?? 'null',
          // ),
          // InfoExpandableTile(
          //   'isVerticalSwipesEnabled',
          //   telegram.isVerticalSwipesEnabled.toString(),
          // ),
          // ListButton('enableVerticalSwipes', onPress: telegram.enableVerticalSwipes),
          // ListButton('disableVerticalSwipes', onPress: telegram.disableVerticalSwipes),
          // InfoExpandableTile('Version', telegram.version),
          // InfoExpandableTile('Platform', telegram.platform),
          // InfoExpandableTile('Color Scheme', telegram.colorScheme.name),
          // InfoExpandableTile('isExpanded', telegram.isExpanded.toString()),
          // InfoExpandableTile('viewportHeight', telegram.viewportHeight.toString()),
          // InfoExpandableTile('viewportStableHeight', telegram.viewportStableHeight.toString()),
          // OneColorExpandableTile('headerColor', telegram.headerColor),
          // OneColorExpandableTile('backgroundColor', telegram.backgroundColor),
          // InfoExpandableTile('isVersionAtLeast(6.1)', isDefinedVersion.toString()),
          ListButton(
            'setHeaderColor(color)',
            onPress: () async {
              Color? color = await selectColor(context);
              if (color != null) {
                await telegram.setHeaderColor(color);
                'Setting color: ${color.hexString}'.showSnackbar(context);
                await Future.delayed(const Duration(seconds: 2));
                setState(() {});
              } else {
                'Selected color is null'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'setBackgroundColor(color)',
            onPress: () async {
              Color? color = await selectColor(context);
              if (color != null) {
                await telegram.setBackgroundColor(color);
                'Setting color: ${color.hexString}'.showSnackbar(context);
                await Future.delayed(const Duration(seconds: 2));
                setState(() {});
              } else {
                'Selected color is null'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'Open link',
            onPress: () async {
              telegram.openLink(
                'https://telegram.org/blog/new-saved-messages-and-9-more',
                tryInstantView: true,
              );
            },
          ),
          ListButton(
            'Open telegram link',
            onPress: () async {
              telegram.openTelegramLink('https://t.me/flutter_telegram');
            },
          ),
          ListButton(
            'Show pop',
            onPress: () async {
              try {
                telegram.showPopup(
                  title: 'Title',
                  message: "Message",
                  buttons: [
                    PopupButton.defaultType('default', 'Yes'),
                    PopupButton.cancel('cancel'),
                  ],
                  callback: (String id) {
                    'Button pressed. Id: $id'.showSnackbar(context);
                  },
                );
              } catch (ex) {
                'error happened showing popup: $ex'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'Show alert',
            onPress: () async {
              try {
                telegram.showAlert(
                  'Sample Alert',
                  () => 'Alert closed'.showSnackbar(context),
                );
              } catch (ex) {
                'error happened showing alert: $ex'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'Show confirm',
            onPress: () async {
              try {
                telegram.showConfirm(
                  'Sample Confirm',
                  (okPressed) => 'Confirm closed. Ok pressed: $okPressed'.showSnackbar(context),
                );
              } catch (ex) {
                'error happened showing alert: $ex'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'Show scan QR ',
            onPress: () async {
              try {
                telegram.showScanQrPopup(
                  'Sample Confirm',
                  (result) {
                    'Got QR: $result'.showSnackbar(context);
                    return false;
                  },
                );
              } catch (ex) {
                'error happened showing alert: $ex'.showSnackbar(context);
              }
            },
          ),
          ListButton(
            'Read clipboard',
            onPress: () async {
              telegram.readTextFromClipboard(
                (result) {
                  'Clipboard text: $result, You can call this method only by MainButton'
                      .showSnackbar(context);
                },
              );
            },
          ),
          ListButton(
            'Request write access',
            onPress: () async {
              telegram.requestWriteAccess(
                onResult: (result) => 'Write access granted: $result'.showSnackbar(context),
              );
            },
          ),
          ListButton(
            'Request Contact',
            onPress: () async {
              telegram.requestContact(
                (result) => 'Contact granted: $result'.showSnackbar(context),
              );
            },
          ),
          ListButton('Switch inline query',
              onPress: () => telegram.switchInlineQuery("Hello Telegram")),
          ListButton('sendData', onPress: () {
            telegram.sendData('Hello this message is from mini app');
          }),
          ListButton('Ready', onPress: telegram.ready),
          ListButton('Close', onPress: telegram.close),
        ],
      ),
    );
  }

  void showSnackbar(String value) {
    var snackBar = SnackBar(content: Text(value));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
