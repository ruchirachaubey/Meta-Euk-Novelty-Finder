Meta-Euk-Novelty-Finder

🔬 An AI-Driven Pipeline for De Novo Discovery of Eukaryotic Species in Metagenomes

Overview

Meta-Euk-Novelty-Finder is a bioinformatics tool designed to leverage the power of deep learning for unsupervised identification of potentially novel eukaryotic species. By moving beyond traditional homology searches, this pipeline converts raw genetic material into high-dimensional, species-aware embeddings using a fine-tuned DNA language model (DNA-BERT) and then applies density-based clustering to automatically detect sequence groups that are genetically distinct from known organisms.

This approach is highly effective in characterizing the "dark matter" of the Tree of Life found in large-scale metagenomic sequencing projects (e.g., soil, ocean, or gut microbiome data).

🚀 Key Features

BLAST Integration: Seamlessly processes uncharacterized sequences derived from initial BLAST/similarity filtering, focusing on sequences that lack high identity hits to known references.

Species-Aware Embeddings: Utilizes a fine-tuned DNA-BERT model to generate rich, contextual, and species-discriminative vector embeddings from DNA sequences.

Unsupervised Novelty Detection: Employs Density-Based Clustering (DBSCAN/HDBSCAN) to identify tightly grouped clusters (known species) and isolated clusters or outliers (potential novel species).

Real-time Visualization: Outputs interactive plots (e.g., UMAP/t-SNE projections) for visual inspection of cluster separation and novelty status.

⚙️ Methodology Pipeline

The novelty-finding process is divided into three critical stages:

Stage 1: Data Preparation and Pre-filtering (BLAST)

The pipeline initiates with raw DNA sequences (e.g., contigs or assemblies from a metagenome) which are first queried against a comprehensive sequence database (e.g., NCBI's nt or a dedicated reference set for Eukaryota) using BLASTn or BLASTx.

Input: Raw metagenomic sequences (FASTA format).

Filtering: Sequences showing high homology (e.g., >90% identity over >80% query length) to known species are categorized as "Known" and filtered out.

Novelty Candidate Set: Sequences that return low-homology hits or no hits (the "dark sequences") are pooled into the Novelty Candidate Set for deep-learning analysis.

Stage 2: Deep Learning Embedding Generation (DNA-BERT)

The Novelty Candidate Set is processed by a specialized genomic language model.

Model: A pre-trained DNA-BERT model (e.g., for k-mer based or BPE tokenization) is fine-tuned on a diverse set of labeled eukaryotic genomes to enhance its ability to differentiate sequences based on species.

Tokenization: Input DNA sequences are tokenized into k-mers or sub-words.

Embedding: The fine-tuned model generates a fixed-length vector embedding (e.g., 768 dimensions) for each input sequence. These vectors are designed to place genetically similar sequences close together in the high-dimensional space.

Stage 3: Unsupervised Novelty Discovery (Clustering)

The high-dimensional sequence embeddings are clustered to differentiate established sequence groups from novel entities.

Dimensionality Reduction: Embeddings are reduced to 2D/3D using techniques like UMAP or t-SNE for efficient clustering and visualization.

Clustering: A density-based algorithm (e.g., HDBSCAN) is applied:

Core Clusters: Dense groups of similar embeddings represent known taxonomic groups or families.

Novelty: Isolated points, small, sparse clusters, or new clusters situated far away from known reference clusters are flagged as Potential Novel Species.

Output: A list of sequences assigned a "Novelty Score" and a "Closest Known Cluster" designation.

💻 Installation

Meta-Euk-Novelty-Finder requires Python 3.8+ and relies heavily on deep learning and bioinformatics libraries.

Prerequisites

A functional BLAST installation (for Stage 1).

PyTorch or TensorFlow (for the BERT model).

CUDA (recommended for GPU acceleration of the embedding stage).

Setup

Clone the repository:

git clone [https://github.com/YourOrg/Meta-Euk-Novelty-Finder.git](https://github.com/YourOrg/Meta-Euk-Novelty-Finder.git)
cd Meta-Euk-Novelty-Finder


Create and activate a virtual environment (Recommended):

conda create -n menf-env python=3.9
conda activate menf-env


Install dependencies:

pip install -r requirements.txt


(The requirements.txt file should include transformers (for DNA-BERT), scikit-learn, hdbscan, umap-learn, biopython)

▶️ Usage

The pipeline is executed via a single main script.

python run_novelty_finder.py \
    --input_fasta /path/to/your/metagenomic_contigs.fasta \
    --output_dir /path/to/results \
    --blast_db /path/to/eukaryotic_blast_database


Configuration Options

Flag

Description

Default

--similarity_threshold

Max acceptable BLAST identity (%) before a sequence is considered "novelty candidate."

80

--kmer_size

K-mer length used by the DNA-BERT model (e.g., 6 for 6-mer tokenization).

6

--min_cluster_size

Minimum size for a group of embeddings to be considered a stable cluster (HDBSCAN parameter).

10

📊 Outputs

The results directory will contain the following files:

novelty_candidates_summary.tsv: A tab-separated file listing every analyzed sequence, its novelty score, cluster ID, and the sequence ID of the closest known centroid.

novel_sequences.fasta: FASTA file containing only the sequences identified as highly novel (outliers or isolated small clusters).

umap_plot.html: An interactive HTML visualization of the UMAP dimensionality reduction, color-coded by cluster ID, allowing manual exploration of the novelty space.

known_clusters_centroids.json: JSON file containing the mean DNA-BERT embedding for each large, stable cluster, representing the "known" sequence space.

Contributing

We welcome contributions! Please see CONTRIBUTING.md for guidelines on submitting pull requests.
