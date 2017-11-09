PHONY: github live

github:
	rm -rf docs
	cp -r dist/ docs
	git add -A
	git commit -m "update dev version"
	git push

copy-data:
	cp -rf ~/Documents/nba-top-plays/output/video/resize src/assets
	cp -rf ~/Documents/nba-top-plays/output/img src/assets
	cp -f ~/Documents/nba-top-plays/output/query--all-popularity.csv src/assets/data/popular.csv

# live:
#	 aws s3 sync dist s3://pudding.cool/year/month/name --delete --cache-control 'max-age=31536000' --exclude 'index.html'
#	 aws s3 cp dist/index.html s3://pudding.cool/year/month/name/index.html
#  aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/year/month/name*'