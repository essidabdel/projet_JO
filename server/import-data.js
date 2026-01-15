import "dotenv/config";
import fs from "fs";
import { pool } from "./db.js";

async function importData() {
  console.log("🚀 Démarrage de l'import des données...");

  try {
    // 1. Créer la table si elle n'existe pas
    console.log("📋 Création de la table si nécessaire...");
    
    // D'abord supprimer la table si elle existe pour repartir de zéro
    await pool.query(`DROP TABLE IF EXISTS country_sport_podium_pred`);
    
    await pool.query(`
      CREATE TABLE country_sport_podium_pred (
        id SERIAL PRIMARY KEY,
        country VARCHAR(255) NOT NULL UNIQUE,
        sport_1 VARCHAR(255),
        points_1 FLOAT8,
        sport_2 VARCHAR(255),
        points_2 FLOAT8,
        sport_3 VARCHAR(255),
        points_3 FLOAT8
      );
    `);
    console.log("✅ Table créée");

    // 2. Supprimer les données existantes (pas nécessaire car table recréée)
    console.log("🗑️  Table prête pour l'insertion");

    // 3. Lire le fichier CSV
    console.log("📖 Lecture du fichier CSV...");
    const csvPath = "./data/jo_final_predi_duncan.csv";
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const lines = csvContent.split("\n").filter((line) => line.trim());

    // Ignorer la première ligne (header)
    const dataLines = lines.slice(1);
    console.log(`📊 ${dataLines.length} lignes de données trouvées`);

    // 4. Insérer les données
    console.log("💾 Insertion des données...");
    let inserted = 0;
    let errors = 0;

    for (const line of dataLines) {
      try {
        // Parser la ligne CSV (en tenant compte des virgules dans les valeurs)
        const parts = line.split(",");
        
        if (parts.length < 8) {
          console.warn(`⚠️  Ligne ignorée (format invalide): ${line}`);
          continue;
        }

        // Index 0: ID (ignoré), Index 1: Country, etc.
        const country = parts[1].trim();
        const sport_1 = parts[2].trim();
        const points_1 = parseFloat(parts[3]);
        const sport_2 = parts[4].trim();
        const points_2 = parseFloat(parts[5]);
        const sport_3 = parts[6].trim();
        const points_3 = parseFloat(parts[7]);

        if (!country) {
          continue;
        }

        await pool.query(
          `INSERT INTO country_sport_podium_pred 
           (country, sport_1, points_1, sport_2, points_2, sport_3, points_3)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [country, sport_1, points_1, sport_2, points_2, sport_3, points_3]
        );

        inserted++;
        if (inserted % 10 === 0) {
          console.log(`   ✓ ${inserted} pays insérés...`);
        }
      } catch (err) {
        errors++;
        console.error(`❌ Erreur sur la ligne: ${line.substring(0, 50)}...`);
        console.error(`   ${err.message}`);
      }
    }

    // 5. Vérifier le résultat
    const countResult = await pool.query(
      "SELECT COUNT(*) as total FROM country_sport_podium_pred"
    );
    const total = countResult.rows[0].total;

    console.log("\n✨ Import terminé !");
    console.log(`📊 Résumé:`);
    console.log(`   - ${inserted} pays insérés avec succès`);
    console.log(`   - ${errors} erreurs rencontrées`);
    console.log(`   - ${total} pays total dans la base`);

    // Afficher quelques exemples
    const samples = await pool.query(
      "SELECT country, sport_1, points_1 FROM country_sport_podium_pred LIMIT 3"
    );
    console.log("\n📋 Exemples de données importées:");
    samples.rows.forEach((row) => {
      console.log(`   - ${row.country}: ${row.sport_1} (${row.points_1} pts)`);
    });
  } catch (error) {
    console.error("💥 Erreur fatale:", error.message);
    throw error;
  } finally {
    await pool.end();
    console.log("\n🔌 Connexion à la base fermée");
  }
}

// Exécuter l'import
importData()
  .then(() => {
    console.log("\n🎉 Script terminé avec succès !");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n💀 Échec du script:", err);
    process.exit(1);
  });
