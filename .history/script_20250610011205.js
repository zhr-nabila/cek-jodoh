      function hitungKecocokan(nama1, nama2) {
        let skor = 0;
        const gabungan = (nama1 + nama2).toLowerCase();

        // Hitung berdasarkan huruf
        for (let char of gabungan) {
          skor += char.charCodeAt(0);
        }

        // Tambah random 
        const random = Math.floor(Math.random() * 11); // 0-10

        // Skor dasar antara 40-100 ditambah random
        return Math.min(40 + (skor % 61) + random, 100);
      }

      function dapatkanPesan(skor) {
        if (skor >= 95)
          return "Nikah gih, ini mah cocok banget 💍🔥";
        if (skor >= 90) return "Kalian tuh kayak teh manis anget pas hujan. Pas banget, susah dicari duanya 🍵";
        if (skor >= 80) return "Serasi sih… tapi jangan sampe cuma jadi pajangan story doang ya 😏";
        if (skor >= 70) return "Udah cocok, tapi jangan mentang-mentang cocok terus males usaha!";
        if (skor >= 60) return "Masih bisa lah, asal dia gak balik lagi ke mantannya 🤡";
        if (skor >= 50) return "Ya cocok-cocokan. Tapi takutnya cocok doang, ga jadian. Capek gak sih? 😭";
        if (skor >= 40) return "Santai dulu bro, ini mah kayak wifi tetangga, kadang nyambung kadang gak, sabar aja 😴";
        return "Realistis aja";
      }

      function buatHati(jumlah = 5) {
        const container = document.getElementById("floating-hearts");
        const simbolHati = ["❤️", "💖", "💗", "💓", "💘", "💝"];

        for (let i = 0; i < jumlah; i++) {
          const hati = document.createElement("div");
          hati.classList.add("floating-heart");
          hati.innerHTML =
            simbolHati[Math.floor(Math.random() * simbolHati.length)];
          hati.style.left = Math.random() * 100 + "vw";
          hati.style.animationDuration = Math.random() * 3 + 3 + "s";
          hati.style.fontSize = Math.random() * 20 + 15 + "px";
          hati.style.animationDelay = Math.random() * 2 + "s";
          container.appendChild(hati);

          setTimeout(() => {
            hati.remove();
          }, 5000);
        }
      }

      function buatKilatan(x, y) {
        for (let i = 0; i < 10; i++) {
          const kilat = document.createElement("div");
          kilat.classList.add("sparkle");
          kilat.style.left = x + "px";
          kilat.style.top = y + "px";
          kilat.style.animationDelay = i * 0.1 + "s";
          document.body.appendChild(kilat);

          setTimeout(() => {
            kilat.remove();
          }, 1000);
        }
      }

      function buatRipple(x, y) {
        const ripple = document.createElement("div");
        ripple.classList.add("ripple");
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        document.body.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }

      function buatKonfeti() {
        const warna = ["#ff6b9d", "#ff8fab", "#ffc2d1", "#e75480", "#ffb6c1"];
        const container = document.getElementById("floating-hearts");

        for (let i = 0; i < 50; i++) {
          const konfeti = document.createElement("div");
          konfeti.classList.add("confetti");
          konfeti.style.left = Math.random() * 100 + "vw";
          konfeti.style.backgroundColor =
            warna[Math.floor(Math.random() * warna.length)];
          konfeti.style.width = Math.random() * 10 + 5 + "px";
          konfeti.style.height = Math.random() * 10 + 5 + "px";
          konfeti.style.animationDuration = Math.random() * 2 + 2 + "s";
          container.appendChild(konfeti);

          setTimeout(() => {
            konfeti.remove();
          }, 3000);
        }
      }

      function animasiDetakHati() {
        const iconHati = document.querySelector(".heart-icon");
        iconHati.style.animation = "none";
        void iconHati.offsetWidth; // Trigger reflow
        iconHati.style.animation = "heartbeat 0.6s ease 3";
      }

      function hitung() {
        const nama1 = document.getElementById("name1").value.trim();
        const nama2 = document.getElementById("name2").value.trim();
        const isiHati = document.querySelector(".love-fill");
        const persentase = document.querySelector(".percentage");
        const pesan = document.getElementById("message");
        const nama1Output = document.getElementById("name1-output");
        const nama2Output = document.getElementById("name2-output");
        const pasangan = document.getElementById("couple-names");
        const container = document.querySelector(".container");

        if (!nama1 || !nama2) {
          alert("Isi dulu nama kalian berdua dong!");
          return;
        }

        // Animasi klik
        container.classList.add("animate__animated", "animate__pulse");
        setTimeout(() => {
          container.classList.remove("animate__animated", "animate__pulse");
        }, 1000);

        // Update nama
        nama1Output.textContent = nama1 || "Kamu";
        nama2Output.textContent = nama2 || "Dia";

        // Reset tampilan
        isiHati.setAttribute("y", 180);
        isiHati.setAttribute("height", 0);
        persentase.textContent = "0%";
        pesan.textContent = "";
        pesan.classList.remove("show");
        pasangan.classList.remove("show");

        // Hitung
        const persen = hitungKecocokan(nama1, nama2);
        const tinggiMaks = 180;
        const tinggiIsi = (persen / 100) * tinggiMaks;

        // Animasi setelah jeda
        setTimeout(() => {
          isiHati.setAttribute("y", tinggiMaks - tinggiIsi);
          isiHati.setAttribute("height", tinggiIsi);

          let sekarang = 0;
          const timer = setInterval(() => {
            sekarang++;
            persentase.textContent = sekarang + "%";

            // Animasi detak jantung
            if (sekarang === 50 || sekarang === 75 || sekarang === persen) {
              animasiDetakHati();
            }

            if (sekarang >= persen) {
              clearInterval(timer);
              pesan.textContent = dapatkanPesan(persen);
              pesan.classList.add("show");
              pasangan.classList.add("show");

              // Efek skor
              if (persen >= 80) {
                buatKonfeti();
                for (let i = 0; i < 20; i++) {
                  setTimeout(() => {
                    buatHati(5);
                  }, i * 100);
                }
              } else if (persen >= 60) {
                for (let i = 0; i < 15; i++) {
                  setTimeout(() => {
                    buatHati(3);
                  }, i * 150);
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  setTimeout(() => {
                    buatHati(2);
                  }, i * 200);
                }
              }
            }
          }, 20);
        }, 100);
      }

      // Efek kilat saat input diklik
      document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("focus", (e) => {
          const rect = e.target.getBoundingClientRect();
          buatKilatan(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
        });
      });

      // Efek ripple saat tombol diklik
      document.querySelector("button").addEventListener("click", (e) => {
        const rect = e.target.getBoundingClientRect();
        buatRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
      });

      // Enter
      document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          hitung();
        }
      });

      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          buatHati(1);
        }, i * 800);
      }