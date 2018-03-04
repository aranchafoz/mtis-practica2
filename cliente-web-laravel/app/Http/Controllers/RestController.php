<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class RestController extends Controller
{
  /**
   * @var wsdl
   */
  protected $base_uri = 'http://localhost:3000/';


  public function validarNIF(Request $request)
  {
    $error = false;
    $nifValid = false;

    $nif = $request->input('nif');
    $restKey = $request->input('restKey');

    $client = new Client(['base_uri' => $this->base_uri]);

    try {
      $response = $client->request('POST', 'validarNIF', [
          'json' => [
              'RestKey' => $restKey,
              'nif' => $nif
          ]
      ]);

      $body = $response->getBody();
      $json = json_decode($body);

      $nifValid = $json->isValid;
      if(!$nifValid) {
       $error = "NIF is not valid";
      }
    } catch (RequestException $e) {
        if ($e->hasResponse()) {
          if($e->getResponse()->getStatusCode() == 400
          || $e->getResponse()->getStatusCode() == 401) {
              $error = json_decode( $e->getResponse()->getBody() )->msg;
          } else {
              $error = $e->getResponse()->getReasonPhrase();
          }
        }
    }

    return redirect()->back()->with('errorNif', $error)->with('nifValid', $nifValid)->withInput($request->input());
  }



  public function validarIBAN(Request $request)
  {
    $error = false;
    $ibanValid = false;

    $iban = $request->input('iban');
    $restKey = $request->input('restKey');

    $client = new Client(['base_uri' => $this->base_uri]);

    try {
      $response = $client->request('POST', 'validarIBAN', [
          'json' => [
              'RestKey' => $restKey,
              'iban' => $iban
          ]
      ]);

      $body = $response->getBody();
      $json = json_decode($body);

      $ibanValid = $json->isValid;
      if(!$ibanValid) {
       $error = $json->error;
      }
    } catch (RequestException $e) {
        if ($e->hasResponse()) {
          if($e->getResponse()->getStatusCode() == 400
          || $e->getResponse()->getStatusCode() == 401) {
              $error = json_decode( $e->getResponse()->getBody() )->msg;
          } else {
              $error = $e->getResponse()->getReasonPhrase();
          }
        }
    }

    return redirect()->back()->with('errorIban', $error)->with('ibanValid', $ibanValid)->withInput($request->input());
  }

  public function consultarCP(Request $request)
  {
    $error = false;
    $cpPoblacion = false;
    $cpProvincia = false;

    $cp = $request->input('cp');
    $restKey = $request->input('restKey');

    $client = new Client(['base_uri' => $this->base_uri]);

    try {
      $response = $client->request('POST', 'consultaCodigoPostal', [
          'json' => [
              'RestKey' => $restKey,
              'codigoPostal' => $cp
          ]
      ]);

      $body = $response->getBody();
      $json = json_decode($body);

      if(!$json->existe) {
       $error = "Código Postal no encontrado";
     } else {
       $cpPoblacion = $json->poblacion;
       $cpProvincia = $json->provincia;
     }
    } catch (RequestException $e) {
        if ($e->hasResponse()) {
          if($e->getResponse()->getStatusCode() == 400
          || $e->getResponse()->getStatusCode() == 401) {
              $error = json_decode( $e->getResponse()->getBody() )->msg;
          } else {
              $error = $e->getResponse()->getReasonPhrase();
          }
        }
    }

    return redirect()->back()->with('errorCp', $error)->with('cp', $cp)->with('cpPoblacion', $cpPoblacion)->with('cpProvincia', $cpProvincia)->withInput($request->input());
  }
  //
  // public function generarPresupuesto(Request $request)
  // {
  //   $error = false;
  //   $cpPoblacion = false;
  //   $cpProvincia = false;
  //
  //   $fechaPre = $request->input('fechaPre');
  //   var_dump($fechaPre);
  //
  //   $idCliente = $request->input('idCliente');
  //   $referenciaProd = $request->input('referenciaProd');
  //   $cantidadProd = $request->input('cantidadProd');
  //   $restKey = $request->input('restKey');
  //
  //   $client = new RestClient($this->wsdl, array('exceptions' => 0));
  //
  //   $response = $client->generarPresupuesto(array(
  //     'fechaPresupuesto' => $fechaPre,
  //     'idCliente' => $idCliente,
  //     'referenciaProducto' => $referenciaProd,
  //     'cantidadProducto' => $cantidadProd,
  //     'RestKey' => $restKey
  //   ));
  //
  //   if (is_soap_fault($response)) {
  //     $error = $response->faultstring;
  //   } else {
  //     if(!$response->presupuestoGeneradoCorrectamente) {
  //       $error = "Error al generar el presupuesto";
  //     } else {
  //       $idPresu = $response->idPresupuesto;
  //       $presuOK = $response->presupuestoGeneradoCorrectamente;
  //     }
  //   }
  //
  //   return redirect()->back()->with('errorPresu', $error)->with('idPresu', $idPresu)->with('presuOK', $presuOK)->withInput($request->input());
  // }
}
