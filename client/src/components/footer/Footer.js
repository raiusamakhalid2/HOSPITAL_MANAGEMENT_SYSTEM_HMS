import React from 'react'
import './footer.css'

export default function Footer() {
  return (
      	<section className="footer">
		<div className="container">
			<div className="row pt-5 pb-5">
				<div className="col-md-6"> 
					<h5 className="footer-h">Designed by :<a href="#">Rai Usama</a></h5>
				</div>
				<div className="col-md-6 justify-content-end">
					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-google-plus"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-pinterest"></i></a>
				</div>
			</div>
		</div>
	</section>
  )
}
