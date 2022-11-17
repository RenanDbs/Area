FROM cirrusci/flutter

WORKDIR /app

COPY . .
RUN flutter pub get
RUN flutter build apk --no-sound-null-safety
WORKDIR /app/build/app/outputs/flutter-apk
RUN mv app-release.apk client.apk